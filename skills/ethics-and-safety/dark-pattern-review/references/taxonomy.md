# Deceptive pattern taxonomy and sources

Compiled 2026-08 from public sources. Each pattern lists a detection question
the reviewer answers from the interface itself.

## Sources

- Harry Brignull, deceptive.design (formerly darkpatterns.org): the original
  pattern catalogue, updated with the 2023 taxonomy revision.
  https://www.deceptive.design/types
- Mathur, Acar, Friedman, Lucherini, Mayer, Chetty, Narayanan (2019), "Dark
  Patterns at Scale: Findings from a Crawl of 11K Shopping Websites", CSCW.
  Defines the sneaking / urgency / misdirection / social proof / scarcity /
  obstruction / forced action families.
- US Federal Trade Commission (2022), staff report "Bringing Dark Patterns to
  Light". https://www.ftc.gov/reports/bringing-dark-patterns-light
- European Data Protection Board (2023), Guidelines 03/2022 on deceptive
  design patterns in social media platform interfaces, version 2.0.
- OECD (2022), "Dark commercial patterns", OECD Digital Economy Papers 336.
- EU Digital Services Act, Regulation (EU) 2022/2065, Article 25 (online
  interface design and organisation).
- California Privacy Rights Act regulations (2023), §7004 on consent obtained
  through dark patterns; similar language in Colorado and Connecticut
  privacy laws.

## Patterns and detection questions

| Family | Pattern | Detection question |
| --- | --- | --- |
| Sneaking | Drip pricing | Is the total price with fees shown where the user first chooses, or only at the last step? |
| Sneaking | Sneak into basket | Can an item, add-on or donation appear in the order without an explicit user action? |
| Sneaking | Hidden subscription / forced continuity | Does a trial convert to a paid plan without a clear, dated notice at sign-up and before charging? |
| Sneaking | Bait and switch | Does the action taken differ from what the control's label promised? |
| Obstruction | Roach motel | Is leaving (cancel, unsubscribe, delete account) more steps, a different channel or slower than joining? |
| Obstruction | Hard to cancel | Are cancellation controls hidden, gated behind retention offers, or absent from the surface where the subscription was bought? |
| Obstruction | Price comparison prevention | Is information needed to compare plans or vendors withheld or obscured? |
| Interface interference | Pre-selection | Is the costly, data-sharing or marketing option pre-ticked or pre-selected? |
| Interface interference | Visual interference | Is the option the business prefers styled as primary while the alternative is low-contrast, small, delayed or styled as disabled? |
| Interface interference | Trick wording | Do double negatives, mixed checkbox semantics or ambiguous labels make the safe choice unclear? |
| Interface interference | Confirmshaming | Is the decline option worded to shame ("No thanks, I like paying full price")? |
| Interface interference | Disguised ads | Is promotional content styled as navigation, content or a system message? |
| Urgency | False countdown | Does a timer reset, repeat, or have no stated consequence? |
| Urgency | Limited-time message without a deadline | Is "offer ends soon" backed by a date? |
| Scarcity | Low-stock or high-demand message | Can the claim be substantiated in the interface or terms? |
| Social proof | Activity notifications | Are "N people bought this" messages sourced from real events? |
| Social proof | Testimonials of uncertain origin | Are reviews attributed and dated? |
| Forced action | Forced registration | Is an account required where the task does not need one? |
| Forced action | Nagging | Is a declined request re-asked on a schedule, or does declining lack a "don't ask again"? |
| Forced action | Forced disclosure | Is more personal data required than the task needs (GDPR Art. 5(1)(c) data minimisation)? |
| Consent | Asymmetric consent | Is "reject all" as prominent and as few clicks as "accept all"? |
| Consent | Bundled purposes | Are unrelated purposes granted with one control? |
| Consent | Withdrawal harder than grant | Can consent be withdrawn where it was given, in the same number of steps? |
| Consent | Consent fatigue | Is the request repeated after refusal without a change in circumstances? |

## Severity guidance

- `HIGH`: money or personal data leaves the user without informed intent;
  cancellation or withdrawal is obstructed; a pattern named in an applicable
  regulation is present in a consent, subscription or checkout flow.
- `MEDIUM`: a real steer with a cheap, visible reversal; urgency or social
  proof that is unverifiable but does not gate a purchase.
- `LOW`: presentation asymmetry with symmetric options and full information.
