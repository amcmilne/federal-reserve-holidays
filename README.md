# Federal Reserve Holidays Workspace

A small monorepo containing:

- a React app that demonstrates Federal Reserve holiday calculations
- a publishable npm package for Federal Reserve bank holidays

## Packages

- `@bank/federal-reserve-holidays`: holiday utility package
- `web`: React demo app in `apps/web`

## Quick Start

```bash
npm install
npm run dev
```

## Build and Test

```bash
npm run build
npm run test
npm run lint
```

## Package Usage

```ts
import {
  getFederalReserveHolidays,
  getObservedFederalReserveHoliday,
  isFederalReserveHoliday,
} from '@bank/federal-reserve-holidays'

const holidays = getFederalReserveHolidays(2026)
const observed = getObservedFederalReserveHoliday(new Date('2026-07-04'))
const isClosed = isFederalReserveHoliday(new Date())
```

## Notes

This package is focused on Federal Reserve holidays used by U.S. banks. It is similar in spirit to `@18f/us-federal-holidays`, but scoped to Federal Reserve bank holiday behavior, including observed-day handling for fixed-date holidays.

## Publish Publicly With Security

1. Create an npm organization or user scope you control and ensure the package name is available.
2. In npm account settings, enable 2FA for both authentication and publish.
3. In npm, configure Trusted Publisher for this GitHub repository and workflow file:
  - `.github/workflows/publish-federal-reserve-holidays.yml`
4. Do not store `NPM_TOKEN` in repository secrets when using Trusted Publishing.
5. Create a changeset for each package change:

  ```bash
  npm run changeset
  ```

6. Merge changes into `main`.
7. GitHub Actions will automatically open a Release PR with version updates.
8. Merge the Release PR to publish securely to npm with provenance.

Useful commands:

  ```bash
  npm run changeset
  npm run version-packages
  npm run release
  ```

You can also run the workflow manually from GitHub Actions using `workflow_dispatch`.

## Changeset Requirement Policy

Changesets are required for code-impacting changes to `packages/federal-reserve-holidays`.

Changesets are not required when a PR only changes:

- `packages/federal-reserve-holidays/README.md`
- files under `packages/federal-reserve-holidays/docs/`
- files under `packages/federal-reserve-holidays/test/`
- package test files matching `*.test.ts` or `*.spec.ts`

If your PR includes any runtime/source/config changes for the package, run:

```bash
npm run changeset
```
