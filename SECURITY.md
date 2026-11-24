# Security Policy

## Supported versions

The `main` branch and the latest tagged release receive security fixes. Older tags do not.

## Reporting a vulnerability

Do not open a public issue. Use GitHub's private vulnerability reporting:

https://github.com/Chilfish/starter-mygo-react-router/security/advisories/new

Include:

- The affected version or commit.
- The operating system and target: desktop, iOS, or Android.
- Steps to reproduce and the impact.
- A proof of concept, if you have one.

The maintainer will acknowledge the report, investigate, and coordinate the fix and the disclosure in the repository's security advisories.

## Scope

This repository is a starter: `main.go`, `internal/`, `app/`, `mygo.config.ts`, and the workflows in `.github/`.

MyGo is a separate project. Report vulnerabilities in the framework, its native modules, or the `mygo` CLI to https://github.com/egoist/mygo/security. Third-party packages are covered by their own maintainers.

## Hardening notes

- Keep MyGo and the npm dependencies current. Dependabot opens weekly updates.
- Sign installers and configure auto-updates before distributing an app broadly. See [distribution](https://mygo.egoist.dev/docs/distribution.md) and [auto-updates](https://mygo.egoist.dev/docs/updates.md).
- List only origins the app controls in `PageOptions.TrustedOrigins`: a trusted page may call bound Go methods. Pages of the app's own frontend and development builds on localhost are trusted by default.
