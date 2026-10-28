# Limitations

Convity explains code by **reading** it (static analysis). That is what makes it safe to use on any project, and it is also its main limit.

## What static analysis cannot know

- **Which path a real run takes.** Choosing a branch in the graph is exploration; Convity does not evaluate conditions with real data.
- **Values at runtime**, user input, configuration, the network or the database.
- **Dynamic code**: `eval`, reflection, code generated at runtime, monkey-patching, decorators and metaprogramming that change behavior.
- **Types.** TypeScript is parsed for structure only; it is not type-checked.
- **Implicit exceptions** (for example, a `None` attribute access or an index out of range) unless they are written explicitly.
- **Code outside the analyzed files**: libraries, other services, files beyond the limits.
- **Why** something changed or **who** changed it. Changes mode shows what differs between two versions.

## Product limits in the alpha

- Languages: JavaScript, TypeScript and Python (Python requires Python 3.9+ installed by you).
- By default it analyzes up to **160 files** and **90,000 bytes per file**. When the limit is reached, coverage is shown as partial and no overall percentage is claimed.
- Generated folders, symbolic links and well-known secret files are excluded.
- Explanations come from patterns. If Convity cannot summarize an operation, it says so instead of inventing a purpose from a name. Explanations can still be incomplete or wrong; check them against the code, which is always shown.
- Changes mode needs Git commits or an earlier analysis to compare. The demo includes a before/after pair.
- Windows 11 x64 only. The package is not code-signed. Updates are manual.
- Interface in English and Spanish.

## Not a replacement for

Code review, tests, security audits or reading the code yourself when it matters. Convity helps you understand faster; it does not certify that code is correct.
