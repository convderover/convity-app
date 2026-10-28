# Security

Convity is in a private alpha. It has not had an independent security audit.

## Reporting a vulnerability

**Do not open a public issue for security problems**, and never post secrets, private code or personal data in an issue.

- Alpha testers: use the private support channel included with your invitation and mark the report as *security*.
- Everyone else: use [GitHub private vulnerability reporting](https://github.com/convderover/convity-app/security/advisories/new). Reports are visible to the maintainers, not public issues.

Please include the Convity version, your operating system and steps to reproduce with synthetic code. We aim to acknowledge reports within 7 days. As a one-person project, we cannot promise fix times yet; we will tell you what we know.

## What the alpha is designed to do

- Analyze code locally without executing it.
- Serve its interface only on `127.0.0.1`, with a one-time activation link and a session cookie.
- Keep external AI blocked and send no telemetry.
- Install agent skills only after showing what will be written and asking for confirmation; keep a backup of files it would replace.
- Uninstall only its own unmodified files.

These are design goals checked by automated tests, not guarantees. If you find a case where Convity does not meet them, please report it.
