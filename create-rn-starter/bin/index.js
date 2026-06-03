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
  isValidSlug,
  resolveTarget,
} = require("../lib/utils");
const { createPrompter } = require("../lib/prompt");
const {
  copyDir,
  restoreDotfiles,
  prepareEnv,
  detectPackageManager,
  installDeps,
  installPods,
  gitInit,
} = require("../lib/scaffold");
const { renameProject } = require("../lib/rename");

const TEMPLATE_DIR = path.join(__dirname, "..", "template");

// ── arg parsing ──────────────────────────────────────────────────────────────
function parseArgs(argv) {
  const opts = {
    name: undefined,
    bundleId: undefined,
    install: undefined, // undefined = ask
    pods: undefined,
    git: undefined,
    yes: false,
  };
  const positional = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--help" || a === "-h") opts.help = true;
    else if (a === "--version" || a === "-v") opts.version = true;
    else if (a === "--yes" || a === "-y") opts.yes = true;
    else if (a === "--no-install") opts.install = false;
    else if (a === "--install") opts.install = true;
    else if (a === "--no-pods") opts.pods = false;
    else if (a === "--pods") opts.pods = true;
    else if (a === "--no-git") opts.git = false;
    else if (a === "--git") opts.git = true;
    else if (a === "--bundle-id") opts.bundleId = argv[++i];
    else if (a.startsWith("--bundle-id=")) opts.bundleId = a.split("=")[1];
    else if (a.startsWith("--")) warn(`Ignoring unknown flag: ${a}`);
    else positional.push(a);
  }
  if (positional.length) opts.name = positional[0];
  return opts;
}

function printHelp() {
  log(`
${c.bold("create-rn-starter")} — scaffold a production-ready React Native CLI app

${c.bold("Usage")}
  npx create-rn-starter ${c.dim("[project-name] [options]")}

${c.bold("Options")}
  --bundle-id <id>   Reverse-DNS app identifier (e.g. com.acme.myapp)
  --no-install       Skip JS dependency installation
  --no-pods          Skip iOS CocoaPods installation (macOS only)
  --no-git           Skip git repository initialisation
  -y, --yes          Accept all defaults, no prompts
  -h, --help         Show this help
  -v, --version      Show version

${c.bold("Example")}
  npx create-rn-starter awesome-app --bundle-id com.acme.awesome
`);
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));

  if (opts.help) return printHelp();
  if (opts.version) {
    const pkg = require("../package.json");
    return log(pkg.version);
  }

  log("");
  log(`${c.magenta(c.bold("◆ create-rn-starter"))}`);
  log(c.dim("  React Native CLI · React Navigation · Redux Toolkit · TypeScript\n"));

  if (!fs.existsSync(TEMPLATE_DIR)) {
    err("Bundled template/ directory is missing — the package is corrupt.");
    process.exit(1);
  }

  const prompter = createPrompter();

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

    const target = resolveTarget(process.cwd(), slug);
    if (fs.existsSync(target) && fs.readdirSync(target).length > 0) {
      err(`Directory "${slug}" already exists and is not empty.`);
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
            validate: (v) =>
              isValidBundleId(v)
                ? true
                : "Must be reverse-DNS, e.g. com.acme.myapp",
          }));

    if (!isValidBundleId(bundleId)) {
      err(`Invalid bundle identifier: ${bundleId}`);
      process.exit(1);
    }

    const names = {
      pascalName: toPascalName(projectName),
      slug,
      lowerName: toLowerName(projectName),
      displayName: toDisplayName(projectName),
      bundleId,
    };

    // ── install / pods / git decisions ────────────────────────────────────
    const wantInstall =
      opts.install !== undefined
        ? opts.install
        : opts.yes
        ? true
        : await prompter.confirm("Install JS dependencies now?", true);

    const canPods = process.platform === "darwin";
    const wantPods =
      opts.pods !== undefined
        ? opts.pods
        : !canPods || !wantInstall
        ? false
        : opts.yes
        ? true
        : await prompter.confirm("Install iOS CocoaPods now?", true);

    const wantGit =
      opts.git !== undefined
        ? opts.git
        : opts.yes
        ? true
        : await prompter.confirm("Initialise a git repository?", true);

    prompter.close();

    // ── summary ───────────────────────────────────────────────────────────
    log("");
    log(c.bold("  Creating project with:"));
    log(`    ${c.dim("display name")} ${names.displayName}`);
    log(`    ${c.dim("app name    ")} ${names.pascalName}`);
    log(`    ${c.dim("slug        ")} ${names.slug}`);
    log(`    ${c.dim("bundle id   ")} ${names.bundleId}`);
    log(
      `    ${c.dim("location    ")} ${
        path.relative(process.cwd(), target) || "."
      }`
    );
    log("");

    // ── scaffold ──────────────────────────────────────────────────────────
    step("Copying template files…");
    copyDir(TEMPLATE_DIR, target);

    step("Renaming project everywhere (JS, Android & iOS)…");
    const changed = renameProject(target, names);
    restoreDotfiles(target);
    ok(`Updated ${changed} file${changed === 1 ? "" : "s"} and native folders.`);

    step("Setting up environment files…");
    prepareEnv(target);
    ok("Created .env from .env.example.");

    // ── deps ──────────────────────────────────────────────────────────────
    const pm = detectPackageManager();
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
      step("Initialising git repository…");
      if (gitInit(target)) ok("Git repository initialised.");
      else warn("git init failed or git is not installed — skipped.");
    }

    // ── next steps ────────────────────────────────────────────────────────
    const rel = path.relative(process.cwd(), target) || ".";
    log("");
    log(c.green(c.bold("  ✔ Done! Your React Native app is ready.\n")));
    log(c.bold("  Next steps:"));
    log(`    ${c.cyan("cd")} ${rel}`);
    if (!wantInstall) log(`    ${c.cyan(pm)} install`);
    if (!wantPods && canPods)
      log(`    ${c.cyan("cd ios && ")}${c.cyan("pod install && cd ..")}`);
    log(`    ${c.dim("# edit .env / src/services/Config.ts with your API URL")}`);
    log(`    ${c.cyan(pm === "npm" ? "npm run" : pm)} android`);
    log(`    ${c.cyan(pm === "npm" ? "npm run" : pm)} ios`);
    log("");
    log(
      c.dim(
        "  Dummy auth flow: Login → Bottom Tabs (Home · Profile) → Logout, persisted via MMKV."
      )
    );
    log("");
  } catch (e) {
    try {
      prompter.close();
    } catch {}
    err(e && e.message ? e.message : String(e));
    process.exit(1);
  }
}

main();
