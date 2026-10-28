# Privacy

## This website and interest requests

The static website at https://convity.es/ is hosted on GitHub Pages. It adds no analytics, cookies, advertising pixels, sign-in or embedded services. Assets and the video load from this domain. The synthetic simulation does not inspect files on your device. Like other web hosting, GitHub receives requests from your browser; GitHub states that Pages logs visitor IP addresses for security. See [GitHub Pages data collection](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection) and [GitHub's privacy statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).

Access requests and general questions open GitHub, where a GitHub account is required and your issue and username are public. Do not include your email, real name, employer, private code or personal data. We use the request to assess interest and reply in that issue; it does not grant software access. You can close your request or ask to withdraw there. GitHub controls its own account data and retention. Invited testers receive a separate private support channel; security vulnerabilities use GitHub's private reporting, not public issues.

## The private alpha application

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
