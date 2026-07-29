#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const {
  c,
  log,
  step,
  ok,
  warn,
  err,
  toPascalName,
  toSlug,
  toLowerName,
  toDisplayName,
  defaultBundleId,
  isValidBundleId,
  bundleIdError,
  isValidSlug,
} = require("../lib/utils");
const { createPrompter } = require("../lib/prompt");
const {
  SUPPORTED_PACKAGE_MANAGERS,
  copyDir,
  restoreDotfiles,
  prepareEnv,
  detectPackageManager,
  hasCommand,
  installDeps,
  installPods,
  gitInit,
} = require("../lib/scaffold");
const { renameProject } = require("../lib/rename");
const {
  PRESETS,
  DEFAULT_PRESET,
  isValidPreset,
  applyPreset,
} = require("../lib/preset");
const { runDoctor } = require("../lib/doctor");
const { checkForUpdate } = require("../lib/notify");

const pkg = require("../package.json");
const TEMPLATE_DIR = path.join(__dirname, "..", "template");
const PKG_NAME = pkg.name;

// ── arg parsing ──────────────────────────────────────────────────────────────
function parseArgs(argv) {
  const opts = {
    name: undefined,
    bundleId: undefined,
    preset: undefined,
    pm: undefined,
    dir: undefined,
    dryRun: false,
    install: undefined, // undefined = ask
    pods: undefined,
    git: undefined,
    yes: false,
    help: false,
    version: false,
    command: undefined,
    errors: [],
  };
  const positional = [];

  /** Read the value for a flag given either `--flag value` or `--flag=value`. */
  const valueOf = (arg, i) => {
    if (arg.includes("=")) return [arg.slice(arg.indexOf("=") + 1), i];
    return [argv[i + 1], i + 1];
  };

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--help" || a === "-h") opts.help = true;
    else if (a === "--version" || a === "-v") opts.version = true;
    else if (a === "--yes" || a === "-y") opts.yes = true;
    else if (a === "--dry-run") opts.dryRun = true;
    else if (a === "--no-install") opts.install = false;
    else if (a === "--install") opts.install = true;
    else if (a === "--no-pods") opts.pods = false;
    else if (a === "--pods") opts.pods = true;
    else if (a === "--no-git") opts.git = false;
    else if (a === "--git") opts.git = true;
    else if (a === "--bundle-id" || a.startsWith("--bundle-id=")) {
      const [value, next] = valueOf(a, i);
      opts.bundleId = value;
      i = next;
    } else if (a === "--preset" || a.startsWith("--preset=")) {
      const [value, next] = valueOf(a, i);
      opts.preset = value;
      i = next;
      if (!value || !isValidPreset(value)) {
        opts.errors.push(
          `Unknown preset "${value}". Choose one of: ${Object.keys(PRESETS).join(", ")}.`
        );
      }
    } else if (a === "--pm" || a.startsWith("--pm=")) {
      const [value, next] = valueOf(a, i);
      opts.pm = value;
      i = next;
      if (!value || !SUPPORTED_PACKAGE_MANAGERS.includes(value)) {
        opts.errors.push(
          `Unknown package manager "${value}". Choose one of: ${SUPPORTED_PACKAGE_MANAGERS.join(", ")}.`
        );
      }
    } else if (a === "--dir" || a.startsWith("--dir=")) {
      const [value, next] = valueOf(a, i);
      opts.dir = value;
      i = next;
      if (!value) opts.errors.push("--dir needs a path.");
    } else if (a.startsWith("-")) {
      warn(`Ignoring unknown flag: ${a}`);
    } else positional.push(a);
  }

  if (positional[0] === "doctor") {
    opts.command = "doctor";
    positional.shift();
  }
  if (positional.length) opts.name = positional[0];
  return opts;
}

function printHelp() {
  const presetList = Object.entries(PRESETS)
    .map(([name, p]) => `      ${name.padEnd(9)} ${c.dim(p.label)}`)
    .join("\n");

  log(`
${c.bold("create-rn-starter")} — scaffold a production-ready React Native CLI app

${c.bold("Usage")}
  npx ${PKG_NAME} ${c.dim("[project-name] [options]")}
  npx ${PKG_NAME} doctor ${c.dim("  check your local toolchain")}

${c.bold("Options")}
  --bundle-id <id>   Reverse-DNS app identifier (e.g. com.acme.myapp)
  --preset <name>    Feature set to generate (default: ${DEFAULT_PRESET})
  --pm <manager>     Package manager: ${SUPPORTED_PACKAGE_MANAGERS.join(" | ")}
  --dir <path>       Directory to create the project in (default: ./<slug>)
  --dry-run          Print what would happen, write nothing
  --no-install       Skip JS dependency installation
  --no-pods          Skip iOS CocoaPods installation (macOS only)
  --no-git           Skip git repository initialisation
  -y, --yes          Accept all defaults, no prompts
  -h, --help         Show this help
  -v, --version      Show version

${c.bold("Presets")}
${presetList}

${c.bold("Examples")}
  npx ${PKG_NAME} awesome-app --bundle-id com.acme.awesome
  npx ${PKG_NAME} proto --preset minimal --pm pnpm -y
  npx ${PKG_NAME} my-app --dry-run
`);
}

/** Print the resolved plan without touching the filesystem. */
function printPlan(names, target, choices, preset) {
  log(c.bold("  Plan") + c.dim("  (--dry-run: nothing will be written)"));
  log(`    ${c.dim("display name")} ${names.displayName}`);
  log(`    ${c.dim("app name    ")} ${names.pascalName}`);
  log(`    ${c.dim("slug        ")} ${names.slug}`);
  log(`    ${c.dim("bundle id   ")} ${names.bundleId}`);
  log(`    ${c.dim("preset      ")} ${preset} ${c.dim(`(${PRESETS[preset].label})`)}`);
  log(`    ${c.dim("location    ")} ${path.relative(process.cwd(), target) || "."}`);
  log(`    ${c.dim("install     ")} ${choices.install ? choices.pm : "skipped"}`);
  log(`    ${c.dim("cocoapods   ")} ${choices.pods ? "yes" : "skipped"}`);
  log(`    ${c.dim("git init    ")} ${choices.git ? "yes" : "skipped"}`);
  log("");
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));

  if (opts.help) return printHelp();
  if (opts.version) return log(pkg.version);
  if (opts.command === "doctor") return process.exit(runDoctor());

  if (opts.errors.length) {
    for (const message of opts.errors) err(message);
    process.exit(1);
  }

  log("");
  log(`${c.magenta(c.bold("◆ create-rn-starter"))}`);
  log(c.dim("  React Native CLI · React Navigation · Redux Toolkit · TypeScript\n"));

  if (!fs.existsSync(TEMPLATE_DIR)) {
    err("Bundled template/ directory is missing — the package is corrupt.");
    process.exit(1);
  }

  const prompter = createPrompter();
  // Only a directory this run created may be rolled back on failure.
  let createdTarget = null;

  try {
    // ── project name ──────────────────────────────────────────────────────
    const projectName =
      opts.name ||
      (opts.yes
        ? "My RN App"
        : await prompter.ask("Project name", {
            defaultValue: "My RN App",
            validate: (v) =>
              isValidSlug(toSlug(v))
                ? true
                : "Use letters, numbers, spaces or hyphens.",
          }));

    const slug = toSlug(projectName);
    if (!isValidSlug(slug)) {
      err(`Could not derive a valid project slug from "${projectName}".`);
      process.exit(1);
    }

    const target = opts.dir
      ? path.resolve(process.cwd(), opts.dir)
      : path.resolve(process.cwd(), slug);
    const targetExists = fs.existsSync(target);
    if (targetExists && fs.readdirSync(target).length > 0) {
      err(
        `Directory "${
          path.relative(process.cwd(), target) || target
        }" already exists and is not empty.`
      );
      process.exit(1);
    }

    // ── bundle id ─────────────────────────────────────────────────────────
    const bundleDefault = defaultBundleId(projectName);
    const bundleId =
      opts.bundleId ||
      (opts.yes
        ? bundleDefault
        : await prompter.ask("Bundle / package identifier", {
            defaultValue: bundleDefault,
            validate: (v) => bundleIdError(v) || true,
          }));

    if (!isValidBundleId(bundleId)) {
      err(`Invalid bundle identifier "${bundleId}": ${bundleIdError(bundleId)}`);
      process.exit(1);
    }

    // ── preset ────────────────────────────────────────────────────────────
    const preset =
      opts.preset ||
      (opts.yes
        ? DEFAULT_PRESET
        : await prompter.choose("Preset", {
            options: Object.entries(PRESETS).map(([value, p]) => ({
              value,
              label: `${value} — ${p.label}`,
            })),
            defaultValue: DEFAULT_PRESET,
          }));

    const names = {
      pascalName: toPascalName(projectName),
      slug,
      lowerName: toLowerName(projectName),
      displayName: toDisplayName(projectName),
      bundleId,
    };

    // ── install / pods / git decisions ────────────────────────────────────
    const pm = opts.pm || detectPackageManager();

    const wantInstall = opts.dryRun
      ? opts.install !== false
      : opts.install !== undefined
      ? opts.install
      : opts.yes
      ? true
      : await prompter.confirm("Install JS dependencies now?", true);

    const canPods = process.platform === "darwin";
    const wantPods =
      opts.pods !== undefined
        ? opts.pods && canPods
        : !canPods || !wantInstall
        ? false
        : opts.yes || opts.dryRun
        ? true
        : await prompter.confirm("Install iOS CocoaPods now?", true);

    const wantGit = opts.dryRun
      ? opts.git !== false
      : opts.git !== undefined
      ? opts.git
      : opts.yes
      ? true
      : await prompter.confirm("Initialise a git repository?", true);

    prompter.close();
    log("");

    // ── dry run stops here ────────────────────────────────────────────────
    if (opts.dryRun) {
      printPlan(names, target, { install: wantInstall, pods: wantPods, git: wantGit, pm }, preset);
      return;
    }

    // ── summary ───────────────────────────────────────────────────────────
    log(c.bold("  Creating project with:"));
    log(`    ${c.dim("display name")} ${names.displayName}`);
    log(`    ${c.dim("app name    ")} ${names.pascalName}`);
    log(`    ${c.dim("slug        ")} ${names.slug}`);
    log(`    ${c.dim("bundle id   ")} ${names.bundleId}`);
    log(`    ${c.dim("preset      ")} ${preset}`);
    log(`    ${c.dim("location    ")} ${path.relative(process.cwd(), target) || "."}`);
    log("");

    // ── scaffold ──────────────────────────────────────────────────────────
    if (!targetExists) createdTarget = target;

    step("Copying template files…");
    copyDir(TEMPLATE_DIR, target);

    if (preset !== "full") {
      step(`Applying "${preset}" preset…`);
      const result = applyPreset(target, preset);
      ok(
        `Removed ${result.removedPaths.length} feature path${
          result.removedPaths.length === 1 ? "" : "s"
        } and ${result.removedDeps.length} dependenc${
          result.removedDeps.length === 1 ? "y" : "ies"
        }.`
      );
    } else {
      // Still strip the markers themselves so generated source stays clean.
      applyPreset(target, preset);
    }

    step("Renaming project everywhere (JS, Android & iOS)…");
    const changed = renameProject(target, names);
    restoreDotfiles(target);
    ok(`Updated ${changed} file${changed === 1 ? "" : "s"} and native folders.`);

    step("Setting up environment files…");
    prepareEnv(target);
    ok("Created .env from .env.example (git-ignored).");

    // ── deps ──────────────────────────────────────────────────────────────
    if (wantInstall) {
      step(`Installing dependencies with ${pm}… (this can take a minute)`);
      if (installDeps(target, pm)) ok("Dependencies installed.");
      else warn(`"${pm} install" failed — run it manually after.`);
    } else {
      warn("Skipped dependency installation.");
    }

    if (wantPods) {
      step("Installing iOS CocoaPods…");
      const podResult = installPods(target);
      if (podResult === "ok") ok("CocoaPods installed.");
      else if (podResult === "skipped")
        warn("CocoaPods skipped (not macOS or pod not found).");
      else warn("pod install failed — run it manually in ios/.");
    }

    // ── git ───────────────────────────────────────────────────────────────
    if (wantGit) {
      if (!hasCommand("git")) {
        warn("git is not installed — skipped repository initialisation.");
      } else {
        step("Initialising git repository…");
        if (gitInit(target)) ok("Git repository initialised.");
        else warn("git init failed — skipped.");
      }
    }

    // Past this point the project exists and is usable; never roll it back.
    createdTarget = null;

    // ── next steps ────────────────────────────────────────────────────────
    const rel = path.relative(process.cwd(), target) || ".";
    log("");
    log(c.green(c.bold("  ✔ Done! Your React Native app is ready.\n")));
    log(c.bold("  Next steps:"));
    log(`    ${c.cyan("cd")} ${rel}`);
    if (!wantInstall) log(`    ${c.cyan(pm)} install`);
    if (!wantPods && canPods)
      log(`    ${c.cyan("cd ios && ")}${c.cyan("pod install && cd ..")}`);
    log(`    ${c.dim("# put your API base URL in .env")}`);
    log(`    ${c.cyan(pm === "npm" ? "npm run" : pm)} android`);
    log(`    ${c.cyan(pm === "npm" ? "npm run" : pm)} ios`);
    log("");
    log(
      c.dim(
        "  Dummy auth flow: Login → Bottom Tabs (Home · Profile) → Logout, persisted via MMKV."
      )
    );
    log("");

    const latest = await checkForUpdate(PKG_NAME, pkg.version);
    if (latest) {
      log(
        c.yellow(
          `  Update available: ${pkg.version} → ${latest}  ` +
            c.dim(`(npx ${PKG_NAME}@latest)`)
        )
      );
      log("");
    }
  } catch (e) {
    try {
      prompter.close();
    } catch {}

    // Roll back a half-written project so a retry is not blocked by the
    // "already exists and is not empty" guard.
    if (createdTarget) {
      try {
        fs.rmSync(createdTarget, { recursive: true, force: true });
        warn(`Rolled back partially created ${path.basename(createdTarget)}/.`);
      } catch {
        warn(`Could not clean up ${createdTarget} — remove it manually.`);
      }
    }

    err(e && e.message ? e.message : String(e));
    process.exit(1);
  }
}

main();
