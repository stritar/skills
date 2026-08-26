import test from 'node:test';
import assert from 'node:assert/strict';
import { validateAgainstSchema } from '../scripts/lib/schema-validate.mjs';
import { loadSchema, loadIndex } from '../scripts/lib/index-io.mjs';

test('the committed index conforms to the committed schema', () => {
  const errors = validateAgainstSchema(loadIndex(), loadSchema());
  assert.deepEqual(errors, []);
});

test('rejects wrong types and missing required fields', () => {
  const schema = {
    type: 'object',
    required: ['id'],
    additionalProperties: false,
    properties: { id: { type: 'string', pattern: '^[a-z-]+$' }, n: { type: 'integer' } },
  };
  assert.equal(validateAgainstSchema({ id: 'ok', n: 1 }, schema).length, 0);
  assert.ok(validateAgainstSchema({}, schema).some((e) => /required/.test(e.message)));
  assert.ok(validateAgainstSchema({ id: 'Bad!' }, schema).some((e) => /pattern/.test(e.message)));
  assert.ok(validateAgainstSchema({ id: 'ok', extra: 1 }, schema).some((e) => /unexpected/.test(e.message)));
  assert.ok(validateAgainstSchema({ id: 'ok', n: 1.5 }, schema).some((e) => /integer/.test(e.message)));
});

test('resolves $ref into $defs and validates nullable type arrays', () => {
  const schema = {
    type: 'object',
    properties: { s: { $ref: '#/$defs/thing' } },
    $defs: { thing: { type: ['string', 'null'], maxLength: 3 } },
  };
  assert.equal(validateAgainstSchema({ s: null }, schema).length, 0);
  assert.equal(validateAgainstSchema({ s: 'ab' }, schema).length, 0);
  assert.ok(validateAgainstSchema({ s: 'toolong' }, schema).length > 0);
});

test('validates enums and array items', () => {
  const schema = { type: 'array', items: { enum: ['a', 'b'] } };
  assert.equal(validateAgainstSchema(['a', 'b'], schema).length, 0);
  assert.ok(validateAgainstSchema(['a', 'x'], schema).some((e) => /enum/.test(e.message)));
});
