# BUILD.OS — The Builder Universe

BUILD.OS is an interactive personal portfolio foundation for presenting verified work across cloud, Web3, emerging technologies and community leadership.

> Build beyond the expected.
>
> BUILD. EXPLORE. SHARE.

## Status

Sprint 0 is complete: repository governance, documentation, strict TypeScript, design tokens, responsive section navigation, reduced-motion support, an application error boundary, linting, tests and production build tooling.

The current interface deliberately uses labelled placeholders. Portfolio claims and personal content will be added only after verification.

## Local development

Requirements: Node.js 22 or later and pnpm 10 or later.

```bash
pnpm install
pnpm dev
```

Quality checks:

```bash
pnpm lint
pnpm test
pnpm build
```

## Documentation

- [Project overview](docs/PROJECT_OVERVIEW.md)
- [Development roadmap](docs/DEVELOPMENT_ROADMAP.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Decisions](docs/DECISIONS.md)
- [Project constitution](AGENTS.md)

## Deployment

AWS Amplify Hosting is planned for Sprint 5. This repository does not create AWS resources or contain credentials.
