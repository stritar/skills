// Minimal JSON Schema (2020-12 subset) validator — enough to validate
// catalog/index.json against catalog/schema.json with zero dependencies.
//
// Supported keywords: type (string or array), enum, required, properties,
// additionalProperties (boolean), items, pattern, maxLength, minLength,
// $ref (into #/$defs/... of the root schema). Unsupported keywords are
// ignored, matching JSON Schema's open-world semantics; schema.json remains
// a real JSON Schema usable with full external validators.

export function validateAgainstSchema(instance, schema, rootSchema, path = '$') {
  const errors = [];
  validate(instance, schema, rootSchema ?? schema, path, errors);
  return errors;
}

function validate(value, schema, root, path, errors) {
  if (schema === true || schema == null) return;
  if (schema === false) { errors.push({ path, message: 'schema "false" forbids any value' }); return; }

  if (schema.$ref) {
    const resolved = resolveRef(schema.$ref, root);
    if (!resolved) { errors.push({ path, message: `unresolvable $ref ${schema.$ref}` }); return; }
    validate(value, resolved, root, path, errors);
    return;
  }

  if (schema.type !== undefined) {
    const types = Array.isArray(schema.type) ? schema.type : [schema.type];
    if (!types.some((t) => typeMatches(value, t))) {
      errors.push({ path, message: `expected type ${types.join('|')}, got ${describeType(value)}` });
      return; // Further keyword checks would only cascade noise.
    }
  }

  if (schema.enum !== undefined && !schema.enum.some((e) => deepEqual(e, value))) {
    errors.push({ path, message: `value ${JSON.stringify(value)} not in enum [${schema.enum.map((e) => JSON.stringify(e)).join(', ')}]` });
  }

  if (typeof value === 'string') {
    if (schema.pattern !== undefined && !new RegExp(schema.pattern).test(value)) {
      errors.push({ path, message: `string ${JSON.stringify(truncate(value))} does not match pattern ${schema.pattern}` });
    }
    if (schema.maxLength !== undefined && value.length > schema.maxLength) {
      errors.push({ path, message: `string length ${value.length} exceeds maxLength ${schema.maxLength}` });
    }
    if (schema.minLength !== undefined && value.length < schema.minLength) {
      errors.push({ path, message: `string length ${value.length} below minLength ${schema.minLength}` });
    }
  }

  if (Array.isArray(value) && schema.items !== undefined) {
    value.forEach((item, i) => validate(item, schema.items, root, `${path}[${i}]`, errors));
  }

  if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
    for (const req of schema.required ?? []) {
      if (!(req in value)) errors.push({ path, message: `missing required property "${req}"` });
    }
    const props = schema.properties ?? {};
    for (const [key, sub] of Object.entries(props)) {
      if (key in value) validate(value[key], sub, root, `${path}.${key}`, errors);
    }
    if (schema.additionalProperties === false) {
      for (const key of Object.keys(value)) {
        if (!(key in props)) errors.push({ path, message: `unexpected property "${key}"` });
      }
    }
  }
}

function resolveRef(ref, root) {
  if (!ref.startsWith('#/')) return null;
  let node = root;
  for (const part of ref.slice(2).split('/')) {
    node = node?.[part.replace(/~1/g, '/').replace(/~0/g, '~')];
    if (node === undefined) return null;
  }
  return node;
}

function typeMatches(value, type) {
  switch (type) {
    case 'object': return value !== null && typeof value === 'object' && !Array.isArray(value);
    case 'array': return Array.isArray(value);
    case 'string': return typeof value === 'string';
    case 'integer': return Number.isInteger(value);
    case 'number': return typeof value === 'number' && Number.isFinite(value);
    case 'boolean': return typeof value === 'boolean';
    case 'null': return value === null;
    default: return false;
  }
}

function describeType(value) {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  return typeof value;
}

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function truncate(s) {
  return s.length > 60 ? s.slice(0, 57) + '...' : s;
}
