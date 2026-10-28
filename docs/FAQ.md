# Frequently asked questions

**What is Convity?**
A desktop tool that helps you understand code, especially code written by AI coding agents: what a function does, how it flows, and what changed between two versions.

**Is it an AI model?**
No. Convity analyzes code structure locally with deterministic rules. In the alpha, external AI is blocked. If you want an AI explanation, Convity can prepare a question for you to paste into your own agent.

**Does it run my code?**
No. It only reads files.

**Does my code leave my computer?**
Not through Convity. See [Privacy](PRIVACY.md).

**Which languages?**
JavaScript, TypeScript and Python (Python requires Python 3.9+ on your machine).

**Which operating systems?**
The alpha package is for Windows 11 x64. The test suite also runs on macOS and Linux in CI, but there is no package for them yet.

**Do I need Claude Code or Codex?**
No. Convity works on its own. The optional skills let you open it from Claude Code (`/convity`) or Codex (`$convity`).

**Do I need Git, Python, Node.js or an account?**
No for the demo. Git is needed to compare commits of your own repository; Python only for `.py` files. Node.js is included. There are no accounts.

**How much does it cost?**
The private alpha is free for invited testers. There is no paid plan today.

**Is it open source?**
No. Convity is proprietary. This repository contains presentation material only.

**How accurate are the explanations?**
They describe what the code says, labeled as observed, declared, hypothesis or limit. They can be incomplete, and static analysis cannot know runtime values. See [Limitations](LIMITATIONS.md).

**How do I get it?**
[Request access](ACCESS.md). There is no public download yet.

**How do I uninstall it?**
Remove the skills from the assistant, then run `Desinstalar-Convity.cmd`. See [Installing](INSTALL.md#uninstalling).
