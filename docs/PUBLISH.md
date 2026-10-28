# Updating convity.es

This repository publishes the static presentation and public documentation at **https://convity.es/** with GitHub Pages. It contains no application engine, binaries or private repository history. Interest requests are open; application distribution is a separate decision.

1. Edit `site/`, `assets/` or public documentation. Review all text, images and the complete video. Keep the synthetic demonstration label and actual alpha limitations.
2. Review the diff and file list. Never add application source, credentials, user projects or private contact details. Run the private development repository's `check-public` and `verify-public` checks against this folder when available. Those tools do not need to be published here.
3. Open a pull request: Website checks the allowed public files and relative links and assembles the static output. It has no credentials or access to the private engine. After review, merge to `main` (or push an approved correction).
4. Website deploys the validated artifact using the repository's GitHub Pages environment and short-lived identity. No hosting token or build dependency is needed. Confirm the run succeeded, then check https://convity.es/ in a browser, including demo, access form and documentation. DNS does not change for ordinary updates.
5. To roll back content, revert the faulty public commit on `main`. The same workflow validates and deploys the previous content. Keep the custom domain in Settings → Pages as `convity.es` and Enforce HTTPS enabled.

The public project showcase and documentation are hosted on GitHub Pages Free, within its published limits. It has no checkout, paid activation or commercial SaaS backend. Reassess hosting terms before adding those features. The domain registration remains the owner's existing expense; no new paid service is configured.

Alpha interest: public GitHub issues, no email or private code. General questions: public issues. Invited testers: private support channel supplied with their invitation. Security: private vulnerability reports, never public issues.

No posts, invitations, application releases or directory submissions happen automatically.
