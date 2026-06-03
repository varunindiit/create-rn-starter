# create-rn-starter

> Scaffold a **production-ready React Native CLI** app — fully renamed for Android & iOS — in seconds.

```bash
npx @varunindiit/create-rn-starter
```

The CLI asks for a **project name** and a **bundle/package identifier**, then
generates a working project: it copies the template, renames every reference
across JS / Android / iOS, sets up the environment files, installs
dependencies (and CocoaPods on macOS) and initialises git.

```bash
# interactive
npx @varunindiit/create-rn-starter

# non-interactive
npx @varunindiit/create-rn-starter awesome-app --bundle-id com.acme.awesome -y
```

## What you get

A real, runnable RN **0.85** project (New Architecture) with:

- **Navigation** — React Navigation native-stack + bottom tabs, with a
  declarative auth guard (`StackNavigation`) that swaps the Auth and App trees
  off a single redux flag.
- **State** — Redux Toolkit store with `auth` / `app` / `userProfile` slices.
- **Dummy auth flow** — Login → Bottom Tabs (**Home** · **Profile**) → Logout,
  persisted with **MMKV** so the session survives restarts.
- **Theming** — centralised `theme` (colours, spacing, fonts) + `react-native-size-matters`.
- **i18n** — `i18next` / `react-i18next` with `en` / `fr` resources and language storage.
- **SVG** — `react-native-svg` + `react-native-svg-transformer` wired in Metro.
- **API/services** — `axios` client, `Config` service, storage and places helpers.
- **Components** — a sizeable reusable library (buttons, inputs, sheets, headers,
  pickers, common UI…).
- **Native setup** — splash screen, fonts/assets linking, permissions, and a
  fully configured Android + iOS project.

## CLI options

| Flag                | Description                                          |
| ------------------- | ---------------------------------------------------- |
| `[project-name]`    | Positional. Skips the name prompt.                   |
| `--bundle-id <id>`  | Reverse-DNS identifier, e.g. `com.acme.myapp`.       |
| `--no-install`      | Skip JS dependency installation.                     |
| `--no-pods`         | Skip iOS CocoaPods (macOS only).                     |
| `--no-git`          | Skip git initialisation.                             |
| `-y, --yes`         | Accept all defaults, no prompts.                     |
| `-h, --help`        | Show help.                                           |
| `-v, --version`     | Show version.                                        |

## How the rename works

The bundled `template/` is a genuine working app, so every name appears as a
concrete literal. On scaffold the CLI:

1. **Token pass** — rewrites file contents, swapping the source identifiers
   (`AwesomeProject`, `com.awesomeproject`, the default Xcode bundle id …) for
   your values across all text files (TS/JS, gradle, Kotlin, Swift, plist,
   pbxproj, schemes, Podfile…).
2. **Native folder moves** — renames `ios/<App>`, `ios/<App>.xcodeproj`,
   `ios/<App>.xcworkspace` and the shared scheme, and moves the Android
   `java/com/awesomeproject` package directory to your bundle's path.
3. **Targeted edits** — sets `package.json` name (npm slug), `app.json`,
   Android `strings.xml` `app_name` and iOS `CFBundleDisplayName` to the
   human display name.

## Architecture

```
bin/index.js      CLI entry: arg parsing, prompts, orchestration
lib/utils.js      logging + name normalisation (pascal/slug/lower/display/bundle)
lib/prompt.js     zero-dependency readline prompts
lib/rename.js     RN rename engine: token pass + native folder moves + targeted edits
lib/scaffold.js   copy tree, env files, dependency/pod install, git init
template/         a full, working RN CLI app (the thing that gets cloned)
scripts/smoke.js  end-to-end test: scaffold to a temp dir and assert the rename
```

The package has **zero runtime dependencies** — only Node's standard library.

## Development

```bash
npm run lint   # node --check every script
npm test       # scaffold into a temp dir and assert JS/Android/iOS rename
```

## License

MIT
