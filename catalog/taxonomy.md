# Taxonomy

This file defines the two controlled vocabularies used by `catalog/index.json`:
the **categories** (one per skill, equal to its parent directory under `skills/`)
and the **tags** (any number per skill, drawn only from the tag block below).
`npm run validate` enforces both. To use a new tag, add it to the tag block in
the same change.

## Categories

| Category | Scope |
| --- | --- |
| `discovery` | Product discovery, problem framing, opportunity and assumption mapping, requirements clarification |
| `research` | User research: planning, interviews, surveys, synthesis, personas, journey mapping, insight management |
| `strategy` | Product strategy, competitive analysis, JTBD, value propositions, prioritization, roadmaps, metrics/KPI definition |
| `information-architecture` | Taxonomy, navigation, content hierarchy, card sorting, tree testing, sitemaps, user/task flows, search UX |
| `interaction-design` | Wireframing, UI and interaction design, responsive/adaptive design, states, forms, tables, dashboards, onboarding, empty states, errors, notifications, micro-interactions, motion |
| `visual-design` | Typography, color, layout, spacing, grids, visual hierarchy, iconography, themes, dark mode, data visualization, brand application |
| `design-systems` | Design-system architecture, tokens, component APIs and documentation, pattern libraries, governance, versioning, audits, Figma-to-code, multi-brand |
| `accessibility` | WCAG audits, semantics/ARIA, keyboard and focus, screen readers, contrast, motion sensitivity, inclusive design, remediation |
| `content-design` | UX writing, voice and tone, labels, error messages, onboarding and help content, localization, plain language, terminology |
| `prototyping` | Low/high-fidelity and interactive prototypes, prototype testing |
| `testing` | Usability testing, heuristic evaluation, cognitive walkthroughs, design critique, expert review, severity scoring |
| `design-qa` | Design QA, interface/PR design review, visual regression, cross-browser and responsive checks, handoff quality |
| `analytics` | Product analytics, instrumentation, event taxonomy, funnels, activation/retention, experiments, success metrics |
| `agentic-ui` | Conversational and agentic interfaces, generative UI, human-in-the-loop patterns, trust, transparency, AI-product evaluation |
| `ethics-and-safety` | Privacy-aware design, consent, dark-pattern detection, trust and safety, sensitive-domain and responsible design |
| `design-engineering` | Design-to-engineering handoff, frontend implementation quality, performance as UX, design-decision records |
| `orchestration` | Higher-level skills that coordinate specialist skills into one workflow and one coherent output |

## Tags

Tags are lowercase kebab-case. The block below is the complete allowed set;
`validate` reads it verbatim (one tag per line inside the fence).

```tags
a11y
wcag
aria
screen-reader
keyboard
focus-management
contrast
inclusive-design
remediation
semantic-html
forms
tables
dashboards
navigation
search
onboarding
empty-states
error-states
notifications
loading
settings
micro-interactions
motion
animation
responsive
adaptive
mobile
desktop
web-app
saas
wireframing
ui-design
interaction-design
state-design
typography
color
layout
spacing
grids
visual-hierarchy
iconography
illustration
themes
dark-mode
data-visualization
charts
visual-polish
brand
design-tokens
token-naming
semantic-tokens
component-api
component-docs
pattern-library
design-system
governance
versioning
migration
audit
figma
figma-to-code
multi-brand
ux-writing
microcopy
voice-and-tone
labels
error-messages
help-content
localization
internationalization
plain-language
terminology
user-research
interviews
surveys
desk-research
qualitative
quantitative
synthesis
affinity-mapping
thematic-analysis
personas
segmentation
journey-mapping
service-blueprint
research-repository
insights
product-discovery
problem-framing
opportunity-mapping
assumption-mapping
jtbd
value-proposition
requirements
prioritization
roadmapping
stakeholders
competitive-analysis
market-research
metrics
kpis
information-architecture
taxonomy
content-hierarchy
mental-models
card-sorting
tree-testing
sitemap
user-flows
task-flows
prototyping
low-fidelity
high-fidelity
interactive-prototype
usability-testing
heuristic-evaluation
cognitive-walkthrough
design-critique
expert-review
severity
design-qa
design-review
pr-review
visual-regression
cross-browser
handoff
design-engineering
frontend
implementation-quality
performance
documentation
decision-records
analytics
instrumentation
event-taxonomy
funnel
activation
retention
experimentation
ab-testing
hypothesis
conversational-ui
agentic-ui
generative-ui
human-in-the-loop
approval-patterns
agent-state
transparency
uncertainty
explainability
trust
error-recovery
interruptibility
reversibility
ai-safety
ai-accessibility
ai-evaluation
privacy
consent
data-minimization
ethics
dark-patterns
manipulation
trust-and-safety
youth-safety
sensitive-domains
personalization
orchestration
workflow
review
generation
critique
stress-testing
explanation
variants
```
