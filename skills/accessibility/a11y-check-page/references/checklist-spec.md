# Check point list: Issues that can be judged from the specification

Check points evaluated from the target's specification (the design
document, the implementation, or confirmation with the creator). These are
mainly issues that are hard to find through black-box operation and cannot
be judged without knowing the specification.

When receiving an explanation of the specification from the creator, **do
not trust an optimistic answer**. It is often the case that the creator
themselves has not grasped something, or that the answer lacks
credibility. Verify the behavior yourself wherever possible.

---

### SPEC-01: Time limits

- WCAG: SC 2.2.1 (A)
- Verification method: `both`
- Judgement: when there is a time limit on operating content, one of the
  following is satisfied.
  - The user can turn off the time limit before reaching it
  - The time limit is longer than 20 hours
  - There is an essential reason, such as being tied to a real-time event
  - The user is notified at least 20 seconds before time expires and can
    extend it with a simple action
  - Before reaching the time limit, the user can adjust it to more than
    10 times the default limit
- Determination from `code`: look for session timeouts, automatic
  navigation or automatic logout via `setTimeout` / `setInterval`, a
  countdown display, and form expiration tokens. Check whether there is
  UI for extending or turning off the limit, and whether advance notice
  is implemented.
- Determination from `page`: actually waiting is not realistic, so rely
  on checking the specification and implementation. For a short limit,
  actually leave it idle and check the behavior.
- Common issues: input content is lost when the session expires. The
  user is logged out without warning.
- Severity guideline: Major if input content is lost. Major if an
  operation is interrupted without warning.

### SPEC-02: Activation by motion

- WCAG: SC 2.5.4 (A)
- Verification method: `both`
- Judgement: a function that can be operated by device motion (shaking,
  tilting) or user motion (gestures, camera input) can also be operated
  through an ordinary UI component, and response to motion can be
  disabled to prevent accidental activation.
- Determination from `code`: look for the use of `devicemotion` /
  `deviceorientation` events, `DeviceMotionEvent`, accelerometer APIs,
  and camera-based gesture detection.
- Note: it is rare for a website to have this kind of function. Where it
  exists as part of the specification, check it carefully.
- Severity guideline: Major if there is a function that can only be
  executed by motion.

### SPEC-03: Authentication by cognitive function test

- WCAG: SC 3.3.8 (AA)
- Verification method: `both`
- Judgement: each step of the authentication process does not rely on a
  cognitive function test (recalling a password, solving a puzzle,
  performing a calculation, etc.). Where it does rely on one, one of the
  following exceptions is satisfied.
  - Alternative: another authentication method that does not rely on a
    cognitive function test is available
  - Mechanism: a mechanism to assist in completing the cognitive
    function test is available
  - Object recognition: the cognitive function test requires identifying
    an object
  - Personal content: the cognitive function test requires identifying
    non-text content provided by the user themselves
- Determination from `code`: check whether the password input field
  specifies `autocomplete="current-password"` / `"new-password"`, and
  whether copy-and-paste or autofill by a password manager is obstructed
  (suppression of `onpaste`, splitting the input field into multiple
  fields, etc.). Look for CAPTCHA, forcing manual entry of a one-time
  password, and implementations of security questions.
- Determination from `page`: actually try whether pasting via a password
  manager is possible.
- Common issues: pasting is disabled in the password field. A
  character-recognition CAPTCHA is the only authentication method. A
  one-time password must be typed manually into split input fields and
  cannot be pasted.
- Severity guideline: Critical or Major in principle, because some users
  will be unable to complete authentication.

### SPEC-04: Coverage of expected usage environments and operation flows

- WCAG: (there is no directly corresponding success criterion; this
  check point ensures the completeness of the check)
- Verification method: `both`
- Judgement: the scope of the check covers the expected usage
  environments and operation flows.
  - If the mobile display differs from the PC display, were both checked?
  - If the operation flow has branches, was each branch checked?
  - If the display changes depending on permissions or login state, was
    each state checked?
  - If the screen changes depending on state (menu open/closed, modal,
    error display), was each state checked?
- This check point is written in the report not as an issue, but as a
  **record of the completeness of the check itself**. Any range that
  could not be covered is noted explicitly under "needs further
  verification".
