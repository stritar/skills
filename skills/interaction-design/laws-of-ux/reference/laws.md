# The Laws of UX — Full Reference

Thirty principles for designing interfaces that fit how people actually think
and perceive. Each entry follows the same shape:

- **In one line** — the principle, plainly.
- **Why it works** — the perceptual or cognitive mechanism underneath it.
- **How to apply it** — concrete moves you can make in a real UI.
- **Where it bites** — the pitfalls and the cases where it backfires.
- **Seen in the wild** — a familiar example.

Read the mechanism and the pitfalls, not just the one-liner. The nuance is
what keeps you from applying a principle where it doesn't belong.

---

## Perception & visual grouping

### Law of Proximity
**In one line:** Things placed close together are read as belonging together.
**Why it works:** The visual system groups by distance before you consciously
read anything. Spacing is interpreted as relationship — gaps mean boundaries.
**How to apply it:**
- Tighten spacing inside a group and widen it between groups; let whitespace do
  the work that borders and lines would otherwise do.
- Keep a label next to the field it describes, not floating between two.
- Put related actions together and separate destructive ones.
**Where it bites:** Inconsistent spacing sends false signals — even spacing
across unrelated items makes everything look like one undifferentiated block.
**Seen in the wild:** A contact card where name, title, and company sit tight
together, clearly one unit, set apart from the next person's card.

### Law of Common Region
**In one line:** Elements inside a shared boundary are perceived as a group.
**Why it works:** A visible container (border, background, card) is an even
stronger grouping cue than proximity — it draws an explicit edge around
"these belong together."
**How to apply it:**
- Wrap related content in a card or panel to make the grouping unmistakable.
- Use a tinted background to bind a section without heavy borders.
- Break a long form into boxed sections so each step reads as its own region.
**Where it bites:** Too many nested containers create visual noise and false
hierarchy; every box competes for attention. Boxes inside boxes inside boxes.
**Seen in the wild:** Settings grouped into bordered cards — "Account,"
"Notifications," "Billing" — each visually sealed off from the rest.

### Law of Similarity
**In one line:** Elements that look alike are assumed to behave alike.
**Why it works:** The eye groups by shared visual traits — color, shape, size,
orientation, motion — and infers shared meaning or function from shared form.
**How to apply it:**
- Give all links one consistent treatment so they're recognizable as links.
- Make every primary button look the same across the product.
- Use a repeated shape or color to signal "these are the same kind of thing."
**Where it bites:** Accidental similarity misleads — styling plain text like a
link, or a non-clickable badge like a button, invites wrong clicks.
**Seen in the wild:** Underlined, colored links that stay visually distinct
from body text everywhere on a site.

### Law of Uniform Connectedness
**In one line:** Elements that are visually connected feel more related than
elements that are merely close or merely similar.
**Why it works:** An explicit connector — a line, a frame, a shared container,
an arrow — is the strongest grouping cue of all, overriding proximity and
similarity.
**How to apply it:**
- Connect steps in a flow with a line so the sequence reads as one process.
- Enclose a label and its control in a single bordered field.
- Use connecting lines in diagrams and org charts to show relationships.
**Where it bites:** Over-connecting clutters; not every relationship needs a
drawn line when spacing would say it quietly.
**Seen in the wild:** A multi-step checkout progress bar with segments joined
by a connecting track.

### Law of Prägnanz (Simplicity)
**In one line:** People read ambiguous or complex forms in the simplest way
they can.
**Why it works:** Simple shapes cost less to process and remember, so the brain
resolves complexity toward order and regularity to avoid overload.
**How to apply it:**
- Prefer clean, recognizable shapes and layouts over ornate ones.
- Reduce the number of distinct visual elements competing for interpretation.
- Design logos and icons that resolve to a simple silhouette.
**Where it bites:** "Simple to look at" isn't "simple to use" — an over-reduced
interface can hide function and force guessing.
**Seen in the wild:** Iconography that reads instantly at small sizes because
each glyph reduces to a clean, single shape.

### Von Restorff Effect (Isolation Effect)
**In one line:** When items are similar, the one that's different is the one
people remember.
**Why it works:** Novelty and contrast grab attention; a break in a pattern is
salient and gets encoded more strongly into memory.
**How to apply it:**
- Make the single most important action visually distinct — the only filled
  button among outlines, for instance.
- Highlight the recommended plan, the new feature, the unread item.
- Use contrast sparingly so the emphasized thing actually stands alone.
**Where it bites:** Emphasize everything and you emphasize nothing. Don't lean
only on color (color-blind and low-vision users miss it), and don't make
highlights look like ads (people tune those out — see Selective Attention).
**Seen in the wild:** A pricing table where one tier gets a colored border and
a "Most popular" ribbon while the others stay plain.

### Selective Attention
**In one line:** People focus on what's relevant to their goal and filter out
the rest — including things you want them to see.
**Why it works:** Attention is a limited spotlight; the brain suppresses
stimuli it judges irrelevant so it can concentrate on the task at hand.
**How to apply it:**
- Put important content in the path of the task, not off to the side.
- Avoid *banner blindness*: don't style real content to look like ads, and
  don't park it in the ad zones (top banner, right rail).
- Avoid *change blindness*: when something updates, make the change obvious —
  motion, a flash, a clear message — since silent changes go unseen.
**Where it bites:** Competing animations and callouts cancel each other out;
too many "look here" signals and the user looks nowhere.
**Seen in the wild:** Users skipping right past a promotional banner because it
sits and looks exactly where ads usually do.

### Aesthetic-Usability Effect
**In one line:** People perceive attractive interfaces as easier to use — and
forgive their flaws.
**Why it works:** Attractive design produces positive affect, and a good mood
makes people more patient, more trusting, and more inclined to believe the
thing works well.
**How to apply it:**
- Invest in visual craft early — type, spacing, color, imagery — because first
  impressions set expectations of quality and competence.
- Use that goodwill to buy patience through unavoidable friction (loading,
  onboarding, edge cases).
**Where it bites:** Polish masks real usability problems. Attractive prototypes
score well in tests even when users fail the actual task, so beauty can hide
defects. Never let "looks finished" stand in for "works." Test tasks, not looks.
**Seen in the wild:** Two apps do the same job at the same speed; the better-
styled one is consistently rated faster and simpler.

---

## Memory & attention

### Miller's Law
**In one line:** The average person holds only about 7 (±2) items in working
memory at once.
**Why it works:** Short-term memory has a hard, small capacity. Group items
into meaningful chunks and each chunk occupies just one of those slots.
**How to apply it:**
- Chunk long strings — phone numbers, card numbers, codes — into groups.
- Keep menus, option sets, and steps within a graspable range.
- Don't force people to remember across screens; show what they need in place.
**Where it bites:** "7" is a rough capacity of *chunks*, not a design rule.
Don't cap navigation at seven items or split content arbitrarily to hit a
magic number — capacity varies by person, familiarity, and context.
**Seen in the wild:** `4155551234` shown as `(415) 555-1234` so it's read and
recalled as three chunks, not ten digits.

### Working Memory
**In one line:** The mental scratchpad that briefly holds and manipulates
information is tiny and fades fast — roughly a handful of chunks, gone in
20–30 seconds if not used.
**Why it works:** Working memory is for active processing, not storage. Brains
are far better at *recognizing* something seen before than *recalling* it cold.
**How to apply it:**
- Favor recognition over recall — show options rather than asking people to
  remember commands, codes, or exact terms.
- Carry context across screens so users don't have to memorize it (order
  summaries, confirmation echoes, comparison tables).
- Mark what's already been seen or done (visited links, completed steps).
**Where it bites:** Wizards that hide earlier answers, or errors that clear the
form, force people to reconstruct state from memory — and they can't.
**Seen in the wild:** A checkout that keeps your cart contents visible beside
the payment form so you never have to hold them in your head.

### Chunking
**In one line:** Break information into meaningful groups and it becomes far
easier to scan, understand, and remember.
**Why it works:** A chunk lets one unit stand in for many items, sidestepping
working memory's item limit and matching how people skim rather than read.
**How to apply it:**
- Structure content into clearly separated blocks with headings and hierarchy.
- Split long forms into labeled sections or steps.
- Group navigation and settings by theme instead of one flat list.
**Where it bites:** Chunks must be *meaningful*. Arbitrary grouping — splitting
by count rather than by relationship — adds structure without adding sense.
**Seen in the wild:** An article broken into headed sections and short
paragraphs so readers can jump to the part they need.

### Serial Position Effect
**In one line:** People best remember the first and last items in a series; the
middle blurs.
**Why it works:** Two effects combine — *primacy* (early items get rehearsed
into longer-term memory) and *recency* (the last items are still fresh in
working memory).
**How to apply it:**
- Put the most important navigation and actions at the start and end of a row
  or list.
- Bury lower-priority items in the middle, where their exact position matters
  least.
- In onboarding, lead with the strongest point and close on a memorable one.
**Where it bites:** Don't overload the ends — cramming too much into "prime"
positions dilutes them.
**Seen in the wild:** App navigation bars that place "Home" first and the
primary action or profile last, with secondary items between.

### Cognitive Load
**In one line:** The total mental effort an interface demands; exceed the user's
budget and they struggle, miss things, and give up.
**Why it works:** Working memory has finite capacity. *Intrinsic* load is the
effort the task itself requires; *extraneous* load is effort wasted on confusing
design that adds nothing to the task.
**How to apply it:**
- Cut extraneous load: remove clutter, redundant choices, jargon, and
  decorative distractions.
- Reduce intrinsic load: break hard tasks into steps, supply defaults, and
  offload memory onto the interface.
- Show only what's needed at each moment; reveal the rest progressively.
**Where it bites:** Not all load is bad — stripping too much can remove the
context and cues people need to build understanding.
**Seen in the wild:** A signup that asks only for email and password up front,
deferring profile details until after the account exists.

### Zeigarnik Effect
**In one line:** People remember and feel pulled toward tasks they've started
but not finished.
**Why it works:** An open task creates a small cognitive tension that keeps it
active in mind until it's resolved — closure relieves the tension.
**How to apply it:**
- Show progress toward completion (profile 60% done, 2 of 5 steps).
- Use clear signifiers of "more" — a peeking next item, a partial reveal — to
  invite continuation.
- Reflect started-but-unfinished states (drafts, incomplete setups) so people
  come back to close them.
**Where it bites:** Manufactured "incomplete" states that never truly finish
feel manipulative and erode trust.
**Seen in the wild:** A profile-completion meter that nudges you to add the
last few details because the unfinished bar keeps bugging you.

### Peak-End Rule
**In one line:** People judge an experience mostly by its most intense moment
and its ending — not the average of every moment.
**Why it works:** Memory compresses experiences into a few salient snapshots.
The emotional peak and the final moment dominate the story people retell.
**How to apply it:**
- Find the moment your product is most delightful or valuable and invest there.
- Design endings deliberately — a clean success state, a warm confirmation, a
  satisfying finish beats trailing off.
- Repair low points, since negative peaks are remembered even more sharply than
  positive ones.
**Where it bites:** A great middle can't save a frustrating finish; a broken
final step colors the whole memory.
**Seen in the wild:** An order flow that ends on a cheerful, well-crafted
confirmation screen rather than a bare "success" message.

---

## Decision-making

### Hick's Law
**In one line:** The more options — and the more complex they are — the longer a
decision takes.
**Why it works:** People mentally sort through choices; time to decide grows
with the number and intricacy of the alternatives.
**How to apply it:**
- Minimize choices where speed matters (checkout, primary actions).
- Break a complex decision into a sequence of smaller ones.
- Surface a recommended default so most people don't have to weigh everything.
- Onboard progressively — reveal complexity only as people are ready for it.
**Where it bites:** Don't simplify into vagueness. Hiding needed options or
over-abstracting a choice trades decision speed for confusion.
**Seen in the wild:** A remote with a handful of clear buttons feels faster to
use than one with fifty, even for the same task.

### Choice Overload
**In one line:** Too many options overwhelm people, worsen their decisions, and
make them more likely to choose nothing.
**Why it works:** Every added option raises comparison effort and the fear of
picking wrong. Past a point, the cost of choosing outweighs a marginally better
match — so people stall or bail.
**How to apply it:**
- Curate to fewer, stronger options; add "recommended" or "most popular."
- Provide defaults so the easy path requires no comparison.
- Enable side-by-side comparison for genuinely competing options (pricing).
- Offer filtering and sorting before dumping the full list on screen.
**Where it bites:** Curate, don't amputate — removing options people genuinely
need is its own failure. Fewer isn't automatically better.
**Seen in the wild:** A tasting table with 24 jams draws a crowd but sells less
than the same table with 6 — more lookers, fewer buyers.

### Cognitive Bias
**In one line:** Systematic errors in judgment that skew how people perceive
and decide, often without their awareness.
**Why it works:** The mind uses shortcuts (heuristics) to decide quickly and
save energy; those shortcuts are usually good enough but predictably wrong in
certain situations.
**How to apply it:**
- Use *anchoring* honestly — the first number sets the reference (show list
  price beside the sale price).
- Respect *defaults* — most people keep them, so defaults are a design decision
  with real consequences (opt-in vs. opt-out).
- Counter *confirmation bias* by surfacing balanced information, not just what
  reinforces a choice.
**Where it bites:** These same levers can slide into manipulation (dark
patterns). Nudging toward the user's interest builds trust; nudging against it
destroys it.
**Seen in the wild:** A struck-through original price beside a lower one — the
anchor makes the new price feel like a deal.

### Occam's Razor
**In one line:** Among designs that work equally well, the simplest — the one
with the fewest elements and assumptions — is best.
**Why it works:** Every element adds cognitive and visual cost. The cheapest
complexity to manage is the complexity you never introduce.
**How to apply it:**
- Question every element: does the design still function without it? If yes,
  cut it.
- Reduce steps, fields, and options to the minimum the task truly requires.
- Consider a design finished only when nothing more can be removed without
  breaking it.
**Where it bites:** Simplicity has a floor (see Tesler's Law). Removing
essential complexity just shifts the burden onto the user in a worse form.
**Seen in the wild:** A search page that's a single field on an empty canvas —
everything non-essential stripped away.

### Pareto Principle (80/20)
**In one line:** Roughly 80% of the effects come from about 20% of the causes.
**Why it works:** Inputs and outputs are rarely evenly distributed; a small
share of features, users, or actions usually drives most of the value.
**How to apply it:**
- Identify the few features and flows people actually use most, and pour effort
  there.
- Don't spend equal polish on rarely used corners of the product.
- Prioritize fixing the small set of issues causing most of the pain.
**Where it bites:** The "vital 20%" still needs the supporting 80% to exist;
the ratio is a guide to *focus*, not a license to abandon everything else.
**Seen in the wild:** A product team shipping deep improvements to the two
screens 90% of users touch daily, before touching rarely visited settings.

---

## Interaction & performance

### Fitts's Law
**In one line:** The time to hit a target depends on how far away it is and how
big it is — closer and bigger is faster.
**Why it works:** Pointing is a motor task; small, distant targets demand more
precision and therefore more time and more misses.
**How to apply it:**
- Make important controls large enough to hit accurately — mind minimum touch
  sizes on mobile (~44px).
- Space targets apart so adjacent ones aren't hit by mistake.
- Exploit screen edges and corners — they're effectively infinite in size
  because the pointer stops there.
- Put frequent actions where the hand or cursor already is.
**Where it bites:** Cramming tiny tap targets together (icon rows, close
buttons beside actions) guarantees mis-taps and frustration.
**Seen in the wild:** A big, thumb-reachable floating action button versus a
tiny link buried in a dense menu.

### Doherty Threshold
**In one line:** Keep system response under ~400ms and people stay engaged and
productive; cross it and attention and satisfaction drop.
**Why it works:** Below roughly 400ms, the interaction feels immediate and the
user keeps momentum; above it, they notice the wait, lose focus, and disengage.
**How to apply it:**
- Respond to input within 400ms wherever you can.
- When real work takes longer, manage *perceived* performance: optimistic UI,
  skeleton screens, instant feedback on tap.
- Use progress indicators for longer waits so the delay feels bounded.
- Occasionally, a deliberate brief delay can signal effort and add perceived
  value (a "searching…" beat before results).
**Where it bites:** Fake progress that stalls, or spinners with no sense of
duration, feel worse than an honest, well-labeled wait.
**Seen in the wild:** A "like" that fills in instantly on tap while the network
request quietly resolves in the background.

### Flow
**In one line:** The state of energized, focused immersion where a person is
fully absorbed in an activity and loses track of friction.
**Why it works:** Flow happens when challenge and skill are balanced — hard
enough to engage, not so hard it frustrates, not so easy it bores — with clear
goals and immediate feedback.
**How to apply it:**
- Give continuous, clear feedback so people always know what happened and
  what's next.
- Remove unnecessary friction and interruptions that break concentration.
- Scale difficulty to the user — gentle for novices, deeper for experts.
- Keep goals and progress visible so momentum has direction.
**Where it bites:** Interruptions (modals, forced tours, surprise dialogs)
shatter flow; too-easy tasks lose people to boredom as surely as too-hard ones.
**Seen in the wild:** A well-paced game or a fast, keyboard-driven tool where
you work for a long stretch without noticing the interface at all.

### Goal-Gradient Effect
**In one line:** Motivation to reach a goal increases the closer you get to it —
people accelerate toward the finish.
**Why it works:** Perceived proximity to a reward raises effort; the remaining
distance feels more worth closing as it shrinks.
**How to apply it:**
- Show progress toward completion and update it visibly as people advance.
- Give a head start — a loyalty card pre-stamped with two of ten feels closer
  to done than a blank one with eight required.
- Break big goals into stages so each finish line stays in sight.
**Where it bites:** Progress that never seems to move, or resets, kills the
momentum it was meant to create.
**Seen in the wild:** A rewards program that grants "bonus" starting progress
so members push harder toward the reward.

### Parkinson's Law
**In one line:** A task expands to fill the time allowed for it.
**Why it works:** Without a tight boundary, effort and duration drift to consume
whatever time is available — so long, open-ended tasks feel even longer.
**How to apply it:**
- Cut the time and steps a task actually requires; shorter flows feel better.
- Use autofill, smart defaults, and saved information to collapse effort
  (address lookup, one-tap payment).
- Set clear expectations so a task feels bounded rather than open-ended.
**Where it bites:** Speeding a task by hiding necessary steps or skipping
confirmation can trade a few saved seconds for a costly mistake.
**Seen in the wild:** Checkout with saved payment and address that finishes in
one tap instead of a multi-minute form.

---

## Expectations & mental models

### Jakob's Law
**In one line:** People spend most of their time on *other* products, so they
expect yours to work the same way those do.
**Why it works:** Users carry expectations built elsewhere and apply them to
you. Meeting convention lets them spend attention on their task instead of
relearning basics.
**How to apply it:**
- Follow established patterns for common things — carts, search, navigation,
  forms — unless you have a strong reason not to.
- Put familiar elements where people expect them (logo top-left links home,
  cart top-right).
- When you must change something, ease the transition and, when possible, let
  people fall back to the familiar version for a while.
**Where it bites:** Novelty for its own sake taxes users. Innovate on your
actual value, not on where the login button lives.
**Seen in the wild:** E-commerce sites that all share cart, product-card, and
checkout conventions, so any of them feels instantly usable.

### Mental Model
**In one line:** People build an internal model of how a system works and expect
it to behave accordingly.
**Why it works:** We compress experience into a working model and apply it to
new but similar situations. When the design matches that model, everything
feels intuitive; when it clashes, everything feels wrong.
**How to apply it:**
- Learn the users' existing model through research — interviews, journey maps,
  observing real use — and design to it.
- Use language, structure, and metaphors that match how users already think
  about the domain.
- Reuse conventions so knowledge transfers in from other products.
**Where it bites:** Your model as the maker rarely matches the user's. Closing
that gap is a core design challenge, not an assumption you can skip.
**Seen in the wild:** A "trash/recycle bin" for deleted files — a metaphor that
maps onto how people already think about throwing things away and recovering
them.

### Paradox of the Active User
**In one line:** People jump straight into using software and never read the
manual — even when reading first would save them time.
**Why it works:** Users are motivated to accomplish their immediate goal, not to
study the tool. They'll accept a slower, trial-and-error path over stopping to
read documentation.
**How to apply it:**
- Teach in context, just in time — tooltips, inline hints, empty states that
  explain themselves — rather than upfront manuals.
- Make the product usable by exploration; the common path should be discoverable
  without instruction.
- Put help where the confusion happens, not buried in a separate docs site.
**Where it bites:** Relying on documentation to fix a confusing UI won't work —
most people never open it. Fix the interface instead.
**Seen in the wild:** A first-run empty state that shows a sample and a single
next action, teaching by doing instead of by a wall of onboarding text.

### Postel's Law (Robustness Principle)
**In one line:** Be liberal in what you accept, and conservative in what you
send.
**Why it works:** People and systems produce messy, varied input. Tolerating
that variation while emitting clean, predictable output makes an interface far
more resilient and forgiving.
**How to apply it:**
- Accept input in whatever reasonable form users offer it — phone numbers with
  or without spaces, dates in common formats, extra whitespace — and normalize
  it for them.
- Anticipate a wide range of actions, devices, and abilities; design for
  flexibility and accessibility.
- Set clear input boundaries and give immediate, helpful feedback when
  something truly can't be accepted.
**Where it bites:** "Liberal" has limits — accepting genuinely invalid data
silently causes downstream errors; validate and guide, don't just swallow.
**Seen in the wild:** A payment field that accepts a card number typed with or
without spaces and formats it as you go.

### Tesler's Law (Conservation of Complexity)
**In one line:** Every system has an irreducible amount of complexity that can't
be designed away — the only question is who absorbs it.
**Why it works:** Some complexity is inherent to the task. If the design doesn't
handle it, the burden lands on the user; it doesn't vanish.
**How to apply it:**
- Take on inherent complexity in the design and engineering so users don't have
  to — smart defaults, automation, sensible assumptions.
- When complexity must surface, expose it gradually and in context rather than
  all at once.
- Decide deliberately which unavoidable complexity the system carries and which
  the user must.
**Where it bites:** Over-simplifying the interface can just push hidden
complexity onto the user in a worse, less visible form. And don't design only
for an idealized rational user — real people behave messily.
**Seen in the wild:** Email "reply-all" logic and address handling that the app
manages quietly, sparing users the underlying routing rules.
