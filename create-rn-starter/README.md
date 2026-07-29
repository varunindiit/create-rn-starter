# create-rn-starter

> Scaffold a **production-ready React Native CLI** app — fully renamed for Android & iOS — in seconds.

```bash
npx @varunindiit/create-rn-starter
```

The CLI asks for a **project name**, a **bundle identifier** and a **preset**, then
generates a working project: it copies the template, prunes the features you did
not ask for, renames every reference across JS / Android / iOS, sets up the
environment files, installs dependencies (and CocoaPods on macOS) and
initialises git.

```bash
# interactive
npx @varunindiit/create-rn-starter

# non-interactive
npx @varunindiit/create-rn-starter awesome-app --bundle-id com.acme.awesome -y

# lean prototype, pnpm, no prompts
npx @varunindiit/create-rn-starter proto --preset minimal --pm pnpm -y

# see what would happen without writing anything
npx @varunindiit/create-rn-starter my-app --dry-run

# check your toolchain before you start
npx @varunindiit/create-rn-starter doctor
```

## What you get

A real, runnable RN **0.85** project (New Architecture) with:

- **Navigation** — React Navigation native-stack + bottom tabs, fully typed
  (`RootParamList` is registered globally, so even `useNavigation()` in a shared
  component is checked), with a declarative auth guard that swaps the Auth and
  App trees off a single Redux flag.
- **State** — Redux Toolkit with `auth` / `app` / `userProfile` slices and
  pre-typed `useAppDispatch` / `useAppSelector` hooks.
- **Data layer** — RTK Query on top of the same axios instance as the imperative
  helpers, so auth headers, timeouts, logging and the 401 handler behave
  identically whichever you use. Costs no extra dependency.
- **Error handling** — every network failure is normalised into one `ApiError`
  shape with a closed `kind` set and a renderable message, so screens never
  re-parse an `AxiosError`. Plus a render-level `ErrorBoundary`.
- **Theming & dark mode** — light/dark palettes behind `useTheme()`, following
  the OS by default and persisted when the user overrides it.
- **i18n** — `i18next` / `react-i18next` with `en` / `fr` resources; the French
  file is type-checked against the English one, so a missing key is a compile
  error.
- **Forms** — `react-hook-form` + `zod`, with schema messages as translation
  keys so validation errors are localised like everything else.
- **Accessibility** — every interactive component ships roles, labels, and
  state (`disabled`, `busy`, `checked`, `selected`), with tests that assert it.
- **Offline awareness** — connectivity mirrored into Redux via one listener.
- **Env config** — `.env` is the real source of truth via `react-native-dotenv`
  (Babel-only; nothing to configure in Xcode or Gradle), and is git-ignored.
- **Testing** — Jest + React Native Testing Library, with native modules mocked
  and meaningful tests to copy rather than a bare smoke render.
- **Tooling** — path aliases (`@/…`), husky + lint-staged + commitlint,
  `npm run verify` (lint + typecheck + test).
- **Release-ready Android** — signing read from `keystore.properties`/env
  (never the public debug key), R8 + resource shrinking, edge-to-edge enabled.

## Presets

| Preset     | What it includes                                                |
| ---------- | --------------------------------------------------------------- |
| `minimal`  | No native image picker, no RTK Query layer, no showcase screen.  |
| `standard` | Everything except the component gallery.                        |
| `full`     | Everything, including the live component gallery. **(default)**  |

Localisation, forms, theming and accessibility are in **every** preset — they
are pure-JS and referenced from nearly every screen, so making them removable
would mean shipping two variants of every screen. A preset drops weight that is
genuinely optional instead: a heavy native dependency, a data layer, a demo.

## CLI options

| Flag               | Description                                       |
| ------------------ | ------------------------------------------------- |
| `[project-name]`   | Positional. Skips the name prompt.                |
| `--bundle-id <id>` | Reverse-DNS identifier, e.g. `com.acme.myapp`.    |
| `--preset <name>`  | `minimal` \| `standard` \| `full`.                |
| `--pm <manager>`   | `npm` \| `yarn` \| `pnpm` \| `bun`.               |
| `--dir <path>`     | Target directory (default `./<slug>`).            |
| `--dry-run`        | Print the plan, write nothing.                    |
| `--no-install`     | Skip JS dependency installation.                  |
| `--no-pods`        | Skip iOS CocoaPods (macOS only).                  |
| `--no-git`         | Skip git initialisation.                          |
| `-y, --yes`        | Accept all defaults, no prompts.                  |
| `-h, --help`       | Show help.                                        |
| `-v, --version`    | Show version.                                     |

`create-rn-starter doctor` checks Node, Java, the Android SDK, Xcode, CocoaPods,
Ruby/bundler, Watchman and git, and exits non-zero if something required is
missing — usable as a CI gate.

Bundle identifiers are validated against Java/Kotlin reserved words, because
`com.new.app` maps to `package com.new.app`, which does not compile.

## How the rename works

The bundled `template/` is a genuine working app, so every name appears as a
concrete literal. On scaffold the CLI:

1. **Preset pass** — deletes the feature directories you did not ask for, strips
   the corresponding `crns:if` regions from the remaining source, and prunes the
   now-unused dependencies from `package.json`.
2. **Token pass** — rewrites file contents in a **single non-cascading pass**,
   swapping the source identifiers for yours across all text files. One combined
   regex is used so a later pattern can never rewrite text an earlier one just
   inserted (which is how `--bundle-id com.awesomeproject.mobile` used to come
   out as `com.mobile.mobile`).
3. **Native folder moves** — renames `ios/<App>`, `.xcodeproj`, `.xcworkspace`
   and the shared scheme, and moves the Android `java/…` package directory.
4. **Targeted edits** — sets `package.json` name, `app.json`, Android
   `strings.xml` `app_name` and iOS `CFBundleDisplayName`.

If any step throws, a project directory this run created is removed, so a retry
is not blocked by a half-written tree.

## Architecture

```
bin/index.js          CLI entry: arg parsing, prompts, orchestration, rollback
lib/utils.js          logging + name normalisation + identifier validation
lib/prompt.js         zero-dependency prompts (auto-default when stdin is not a TTY)
lib/rename.js         rename engine: single-pass token replacement + native moves
lib/scaffold.js       copy tree, env files, dependency/pod install, git init
lib/preset.js         feature pruning: file removal, marker stripping, dep pruning
lib/doctor.js         toolchain checks
lib/notify.js         best-effort update notifier (cached, 1.5s timeout, fail-silent)
template/             a full, working RN CLI app (the thing that gets cloned)
scripts/smoke.js      end-to-end: scaffold to a temp dir and assert the rename
scripts/sync-template.js  keeps template/ byte-identical to the root app
test/                 unit tests (node:test)
```

The package has **zero runtime dependencies** — only Node's standard library.

## Repository layout

The repo root **is** the app: it is where `node_modules`, CocoaPods and Gradle
caches live, so it is where the template is actually run, linted, typechecked
and tested. `create-rn-starter/template/` is the copy that ships in the tarball.

Edit the app at the root, then:

```bash
npm run sync         # copy root → template
npm run sync:check   # exit 1 if they differ (CI enforces this)
```

## Development

```bash
npm run lint         # ESLint over bin/ lib/ scripts/
npm run test:unit    # unit tests for the rename, preset and naming logic
npm run test:smoke   # scaffold into a temp dir and assert JS/Android/iOS rename
npm test             # both
```

## Compatibility

Node ≥ 18, on macOS, Linux and Windows. CI runs the CLI suite across all three
OSes and Node 18/20/22 — Windows specifically, because the package-manager
shims there are `.cmd` files that `spawnSync` cannot execute without a shell.

## License

MIT
