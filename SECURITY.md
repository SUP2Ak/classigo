# Security Policy

## Supported versions

Only the latest published version of classigo receives security fixes.

| Version | Supported |
| ------- | --------- |
| latest  | ✅        |
| older   | ❌        |

## Reporting a vulnerability

**Do not open a public issue for security reports.**

Use GitHub's private vulnerability reporting instead:
**[Report a vulnerability](https://github.com/SUP2Ak/classigo/security/advisories/new)**

Include:

- A description of the vulnerability and its potential impact.
- Steps to reproduce or a minimal proof of concept.
- The classigo version and runtime (Node/Bun/Deno).

I will acknowledge your report within **72 hours** and aim to release a fix within **14 days** depending on severity.

## Scope

classigo is a zero-dependency string utility with no network access, no file system access, and no external calls. The attack surface is limited to string concatenation and object key iteration.
