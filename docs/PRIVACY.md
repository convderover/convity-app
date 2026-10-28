# Privacy

Convity is designed to keep your code on your computer. This page describes what the **private alpha** does. It is a description of the software's behavior, not a legal privacy policy; one will be published before any public beta.

## What stays on your computer

- **Your code.** Convity reads the files of the folder you choose. It does not upload them anywhere.
- **The analysis.** Indexes are stored in `~/.convity` on your machine. You can delete them with `convity forget`.
- **Your choices** in the interface (language, tour progress) are stored locally.

## What Convity does not do in the alpha

- No telemetry, analytics or crash reporting.
- No account and no sign-in.
- **External AI is blocked** in the alpha, even if AI keys exist in your environment.
- It does not execute your project, its scripts or its tests.
- It does not contact Convity servers. There are none.

## When something can leave your computer

Only when **you** do it:

- **"Ask your agent"** copies a question to your clipboard. If you paste it into Claude Code, Codex or another service, that service's terms apply.
- **Diagnostics** produces a text with versions and counts, without code, file paths or credentials. You review it and decide whether to share it.
- **Bug reports** you write. Please use made-up code and remove paths, keys and personal data.

## Honest limits

- Convity's interface runs in your browser on `127.0.0.1`. Browser extensions or security software that inspect local pages can read what is shown; Convity warns you when it detects injected third-party resources, but it cannot block them.
- Secret detection in Convity is pattern-based and incomplete. Do not rely on it to make sensitive code safe to share.
- "Local" does not mean "audited". The alpha has not had an independent security review.
