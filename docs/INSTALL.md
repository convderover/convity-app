# Installing the alpha (Windows 11 x64)

The alpha is a **portable package**: a ZIP file you extract into a folder. Nothing is installed system-wide, nothing is added to `PATH`, and you do not need administrator rights, Node.js or npm.

## What is in the package

- Convity and a copy of **Node.js 24** and **TypeScript** (for reading TypeScript; it does not compile your code).
- A synthetic **demo project**, so you can try everything without Git, Python or your own code.
- An **assistant** (`Convity.cmd`) with these options: demo, open a project, set up or remove agent skills, diagnostics, verify the package.
- The user guide, the evaluation terms, third-party licenses and a list of components (SBOM).
- An **uninstaller** (`Desinstalar-Convity.cmd`) that removes only Convity's own unmodified files.

The package is **not code-signed**. Windows SmartScreen or your organization's policies may warn you. Do not disable antivirus, SmartScreen or company policies to run it; if something blocks it, stop and tell us.

## Steps

1. **Check the file.** In a terminal, run `certutil -hashfile <zip file> SHA256` and compare the result with the value we send you through a different channel. A match means the file did not change on the way. It is not a signature and does not prove who made it.
2. **Extract** the whole ZIP into a new folder in your user directory, for example `Documents\Convity\0.3.0-alpha.3`. Do not extract over an older version.
3. **Open** `Convity.cmd` and choose **1 · Guided demo**. The first time, it asks how you want to start: a 3-step **Quick intro** (recommended), the **Full tour** (20 steps), or **Explore on my own**.
4. **Your own project:** choose **2 · Open a project** and type the folder you allow Convity to read. Python 3.9+ is optional (for `.py` files); Git is optional (to compare commits). Neither is installed for you.
5. **Agent skills (optional):** choose **3 · Set up skills**. Convity shows the files it will write for Claude Code and Codex in your user folder and asks you to type `INSTALAR` to confirm. Existing files are kept unless you explicitly choose to replace them, and replaced files are backed up. Then type `/convity` in Claude Code or `$convity` in Codex from your project.
6. **Diagnostics:** the **Diagnostics** button (or option 5) shows versions and counts only, with no code, paths or credentials. Review it before sharing; it is never sent automatically.

## Updating

Updates are manual. Check the new ZIP's SHA-256, extract it into **another** folder, verify it (option 6), and set up the skills again from the new folder. Your local data in `~/.convity` is kept. If a version finds an index created by a newer one, it leaves it untouched and works in memory.

## Uninstalling

1. Remove the skills with option **4** (only Convity's own unmodified files are removed).
2. Close all Convity windows and the assistant.
3. Run `Desinstalar-Convity.cmd` and type `QUITAR`. Modified or extra files are kept and listed.
4. Optional: delete your local indexes with `runtime\node.exe bin\convity.mjs forget --all --yes` **before** uninstalling.

Nothing in this process deletes your repositories.
