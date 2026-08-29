# Agentic interface patterns: sources and tests

Compiled 2026-08. Each pattern names the guideline it derives from and the
test a reviewer applies to the interface.

## Sources

- Amershi, Weld, Vorvoreanu, Fourney, Nushi, Collisson, Suh, Iqbal, Bennett,
  Inkpen, Teevan, Kikin-Gil, Horvitz (2019), "Guidelines for Human-AI
  Interaction", CHI. The 18 HAX guidelines (G1-G18); toolkit at
  https://www.microsoft.com/en-us/haxtoolkit/
- Google PAIR, People + AI Guidebook, chapters on mental models,
  explainability and trust, feedback and control, errors and graceful
  failure. https://pair.withgoogle.com/guidebook/
- Apple Human Interface Guidelines, "Machine Learning" and "Generative AI"
  sections. https://developer.apple.com/design/human-interface-guidelines/
- Nielsen Norman Group, research articles on AI chat UX, "AI agents" and the
  "articulation barrier" (2023-2025). https://www.nngroup.com/
- W3C WCAG 2.2, SC 4.1.3 Status Messages; WAI-ARIA 1.2 live regions.
  https://www.w3.org/TR/WCAG22/

## Pattern tests

| Pattern | Derived from | Test |
| --- | --- | --- |
| Intent echo | HAX G1 (make clear what the system can do), G2 (how well) | On an ambiguous request, does the agent restate the goal and scope before acting? Can the user correct it in one step? |
| Plan preview | PAIR "set expectations"; HAX G1 | For multi-step work, are steps listed before execution? Are steps with side effects marked? |
| Approval scaled to risk | HAX G7 (support efficient invocation), G8 (efficient dismissal); Apple HIG "ask permission for consequential actions" | Classify each tool as read / reversible write / irreversible or external. Does each class have the right gate? Can a phrasing in the user's prompt skip the gate for the irreversible class? Does one approval cover exactly one scope? |
| Live state | HAX G4 (show contextually relevant information); PAIR "feedback + control" | Is there a persistent mode indicator (idle, thinking, acting, waiting)? Is the current step named? Is "waiting for you" visually and programmatically distinct? |
| Tool-use transparency | HAX G11 (make clear why the system did what it did) | For a completed action, can the user open the call, its inputs and its result? Is the record kept after the turn? |
| Honest uncertainty | HAX G10 (scope services when in doubt); PAIR "explainability + trust" | Where confidence is shown, does it change what the user is advised to do? Is low confidence paired with a fallback (ask, verify, show sources)? |
| Interruptibility | HAX G8; Apple HIG "let people stop" | Is stop always visible and one action? After stop, does the interface state what completed and what did not? |
| Reversibility | HAX G9 (support efficient correction); Apple HIG "let people undo" | After a write, is there a change summary with undo or a documented reversal path? For irreversible actions, was irreversibility stated at approval time? |
| Error recovery | HAX G9; PAIR "errors + graceful failure" | On failure, does the message state what the agent knows, what it tried, and the user's options? Are automatic retries of writes prevented or disclosed? |
| Scope and memory disclosure | HAX G17 (global controls), G18 (notify about changes) | Can the user see and edit what the agent can access and what it remembers? Are changes to capabilities announced? |
| Accessible streaming | WCAG 2.2 SC 4.1.3; ARIA live regions | Are status changes announced via `aria-live` / `role="status"` without stealing focus? Does streamed content avoid re-announcing every token? Do generated controls meet the same accessibility rules as authored ones? |
| Generated UI governance | Apple HIG Generative AI; product design system | Do agent-rendered controls use design-system components, keep the approval rules, and never render a destructive action as the primary button? |

## Severity anchors

- `HIGH`: irreversible / external / costly action without a scoped explicit
  approval; no stop; failure state invisible; status invisible to assistive
  technology.
- `MEDIUM`: pattern present but inconsistent across tools or surfaces.
- `LOW`: clarity, wording or placement of an existing mechanism.
