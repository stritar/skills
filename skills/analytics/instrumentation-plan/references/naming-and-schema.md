# Event naming and tracking-plan schema

Compiled 2026-08 from vendor documentation; the rules below are the common
ground between vendors so a plan ports between them.

## Sources

- Segment, "What is a tracking plan?" and the object-action naming framework
  (Segment Spec). https://segment.com/docs/protocols/tracking-plan/create/
- Amplitude, Data Taxonomy Playbook (event and property naming, taxonomy
  governance). https://amplitude.com/blog/data-taxonomy-playbook
- Google Analytics 4, event naming rules (snake_case, reserved prefixes,
  40-character limit, recommended events).
  https://support.google.com/analytics/answer/13316687
- PostHog, product analytics documentation (event capture, properties,
  person properties). https://posthog.com/docs/product-analytics
- GDPR, Regulation (EU) 2016/679, Article 5(1)(c) data minimisation.

## Naming rules

1. `object_action`, lowercase snake_case, ASCII: `signup_completed`,
   `filter_applied`, `invoice_downloaded`.
2. Past tense for completed outcomes (`order_placed`), present tense for
   intents that may not complete (`checkout_start`), and never both for the
   same moment.
3. No screen, product, platform or variant names in the event name; carry
   them as properties.
4. Max 40 characters; no reserved prefixes (`ga_`, `google_`, `firebase_`,
   vendor internals).
5. One event per user-meaningful moment. Do not encode outcomes in the name
   (`payment_failed` and `payment_succeeded` become `payment_completed`
   with `status`) unless the two are analysed as different funnels.
6. Properties: snake_case, one type each, enumerations listed in the plan,
   booleans prefixed `is_` / `has_`, durations in milliseconds with `_ms`,
   money in minor units with `_cents` or an explicit `currency`.
7. Context properties on every event: `screen`, `entry_point`, `platform`,
   `app_version`, `variant` (when experiments run), `session_id` if the
   vendor does not supply one.
8. Person properties (stable attributes such as plan, role, signup date) are
   set once, not repeated on every event.
9. Versioning: when semantics change, add a new event and deprecate the old
   one in the plan; never silently repurpose a name.

## Tracking-plan table

| Column | Content |
| --- | --- |
| event | The name per the rules above |
| trigger | Exact moment and component ("Save button in report editor, on successful server response") |
| properties | `name: type [enum values]`, one per line |
| source | client / server / both (server for money and persisted outcomes) |
| owner | Team or person accountable for the event firing correctly |
| metric served | The metric or funnel this event exists for |
| status | planned / implemented / verified / deprecated |

## Identity and consent block

- Anonymous identifier: how it is generated and stored.
- User identifier: when it is known and how anonymous history merges.
- Consent: which categories exist, what fires before consent, how withdrawal
  is honoured.
- Personal data inventory: which properties are personal data, the purpose,
  the retention period.

## QA checklist template

| Step | Action | Expected event | Expected properties | Where to verify |
| --- | --- | --- | --- | --- |
| 1 | ... | ... | ... | vendor live view / debug console |

Add: duplicate-fire check, client/server reconciliation for outcomes,
consent-off session check, experiment assignment fires once per user.
