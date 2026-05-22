# Contributing

Thanks for your interest in contributing to Allem SDK.

## Setup

```bash
git clone https://github.com/kingofmit/allem-sdk.git
cd allem-sdk
pnpm install
pnpm build
pnpm test
```

Requires Node.js >= 20 and [pnpm](https://pnpm.io/) >= 9.

## Project Structure

```
packages/
  hooks/       @allem-sdk/hooks       Essential React hooks
  ai/          @allem-sdk/ai          AI hooks (Vercel AI SDK v6)
  forms/       @allem-sdk/forms       Form management & validation
  analytics/   @allem-sdk/analytics   Provider-agnostic analytics
  auth/        @allem-sdk/auth        Authentication helpers
apps/
  docs/        Documentation site
  examples/
    nextjs/    Next.js 16 demo app
```

## Commands

| Command | Description |
|---------|-------------|
| `pnpm build` | Build all packages |
| `pnpm test` | Run all tests (44 tests) |
| `pnpm dev` | Watch mode |
| `pnpm example:dev` | Start the example app |

## Pull Requests

1. Fork and clone the repo
2. Create a branch from `main`: `git checkout -b feat/my-feature`
3. Make your changes and add tests
4. Run `pnpm build && pnpm test`
5. Create a changeset: `pnpm changeset`
6. Open a PR against `main`

## Conventions

- TypeScript strict mode
- One hook per file
- SSR-safe: check `typeof window` before browser APIs
- `"use client"` directive added automatically via tsup
- Export types alongside implementations

## Changesets

We use [Changesets](https://github.com/changesets/changesets) for versioning. Run `pnpm changeset` when making user-facing changes.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).
