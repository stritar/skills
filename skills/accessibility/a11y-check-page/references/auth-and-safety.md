# Authentication and browser-operation safety

Rules for when checking pages that involve login or pages that can change data.
**For a check involving login, always read this file before starting to operate the
browser.**

## Handling credentials

For IDs, passwords, tokens, one-time passwords, and the like given by the user, observe the
following.

- **Do not write them in the report file.** Limit the description to something like
  "logged in with a test account and verified"; do not write the values themselves
- **Do not output them again in the conversation.** Do not even repeat them back for
  confirmation
- **Do not show them in screenshots.** Do not photograph the state where values have been
  entered into a login form. If the login screen itself needs to be checked, photograph the
  state before entry
- **Do not embed them in `browser_evaluate` code.** Perform input using a dedicated tool
  such as `browser_type`
- After the check ends, log out if logout is possible

## Confirming the environment

Before starting the check, confirm with the user whether the target is a production
environment.

- **If it is a production environment**: real data is displayed, and operations may occur
  that affect other users. As a rule, do not perform destructive operations. If personal
  information is displayed on screen, either do not take a screenshot of it, or do not
  include it in the report
- **If it is a test/staging environment**: relatively free operation is fine, but still
  confirm whether destructive operations are permitted

Using an account prepared for checking, rather than a production account, is recommended.

## Destructive operations

For the following, **always ask the user for permission before executing them**. Never
execute them without asking for permission.

- Creating, changing, or deleting data
- Submitting a form (inquiry, application, order, post)
- Sending email, notifications, or messages
- Payment, billing, or consuming points
- Changing settings (especially ones that affect other users)
- Uploading or downloading files
- Operations that change account state (withdrawal, password change, permission change)

When asking for permission, communicate specifically what you are about to do and why it is
needed.

```
To verify VIS-31 (SC 3.3.4 Error Prevention), I would like to actually submit this
application form and see whether a confirmation screen appears before submission, and
whether it can be undone after submission.
One piece of test data will be created. May I proceed?
```

**If permission is not granted, record that check point as "cannot be determined" and note the
reason in the report's "needs further verification".** Never mark it "no issue" based on
guesswork.

### What can be verified without submitting

Even when permission for a destructive operation is not granted, the following can still be
verified.

- Validation display at the stage before pressing the submit button (enter an invalid value
  and move focus away)
- Whether there is a path leading to a confirmation screen (whether the button label is
  "Confirm" or "Submit")
- The implementation of input field labels, descriptions, `autocomplete`, and error display

State clearly the extent that could be judged from these, and move the rest to "needs
further verification".

## Scope of operation

- **Do not operate beyond the specified target's scope.** Do not follow links to external
  sites. If navigation to a different domain occurs, go back
- When checking a page that requires authentication, be careful of operations that
  unintentionally log you out (such as pressing a "Log out" link). To avoid accidentally
  pressing `Enter` while verifying the focus walk, do not press `Enter` on links or buttons —
  limit yourself to recording the focus position (elements that need their operation
  verified should be selected and run individually)
- If an unintended navigation occurs, return to the original screen before continuing. Keep
  a record of progress per state so as not to lose track of how far verification had
  reached

## Multi-factor authentication

When multi-factor authentication is present, entering the code cannot be automated. Consult
the user about one of the following.

- Use a browser in a state where the user has already logged in manually (Playwright MCP's
  persistent profile)
- Use a test account with multi-factor authentication disabled
- Have the user tell you the code each time (in this case too, do not write the code in the
  report)

Note that **the multi-factor authentication input field itself can also be a check target**
(SPEC-03, SEM-05, VIS-29). An implementation where the code input field is split into one
character per box and does not allow pasting is a SPEC-03 issue.

## Personal information

If a real user's personal information is displayed during the check, observe the following.

- Do not include it in screenshots. If it cannot be avoided, photograph around that part
- Do not transcribe it into the report. If an element needs to be identified, show it by
  selector or structure
- Do not output it in the conversation
