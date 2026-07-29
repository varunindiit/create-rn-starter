"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const IS_WINDOWS = process.platform === "win32";

/**
 * Local build/dependency output that must never end up in a generated project.
 * The published tarball is already clean (see .npmignore), but the CLI is also
 * run straight from a checkout during development, where `template/` carries
 * an installed `node_modules`, CocoaPods and Gradle caches.
 */
const COPY_SKIP_DIRS = new Set([
  "node_modules",
  "Pods",
  "build",
  ".gradle",
  ".kotlin",
  ".cxx",
  "DerivedData",
  "xcuserdata",
  "vendor",
  ".git",
]);

const COPY_SKIP_FILES = new Set([
  ".DS_Store",
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
  "bun.lockb",
  "Podfile.lock",
  "Gemfile.lock",
  ".xcode.env.local",
  "local.properties",
]);

/**
 * Recursively copy a directory tree (preserving symlinks), skipping local build
 * artefacts and anything the active preset excluded.
 *
 * @param {string} src
 * @param {string} dest
 * @param {(relPath: string) => boolean} [filter] return false to skip an entry
 * @param {string} [rel] internal — path relative to the copy root
 */
function copyDir(src, dest, filter, rel = "") {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const relPath = rel ? `${rel}/${entry.name}` : entry.name;
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      if (COPY_SKIP_DIRS.has(entry.name)) continue;
      if (filter && !filter(relPath)) continue;
      copyDir(from, to, filter, relPath);
      continue;
    }

    if (COPY_SKIP_FILES.has(entry.name)) continue;
    if (filter && !filter(relPath)) continue;

    if (entry.isSymbolicLink()) {
      fs.symlinkSync(fs.readlinkSync(from), to);
    } else {
      fs.copyFileSync(from, to);
    }
  }
}

/**
 * Restore files whose real names start with a dot. npm rewrites a published
 * `.gitignore` to `.npmignore`, so the template stores them un-dotted and the
 * CLI puts the dot back in the generated project.
 */
const DOTFILES = [
  ["_gitignore", ".gitignore"],
  ["_husky", ".husky"],
];

function restoreDotfiles(root) {
  for (const [bundled, real] of DOTFILES) {
    const from = path.join(root, bundled);
    const to = path.join(root, real);
    if (fs.existsSync(from) && !fs.existsSync(to)) fs.renameSync(from, to);
  }
}

/**
 * Restore the env template (`env.example` → `.env.example`) and seed a working
 * `.env` from it. Stored without a leading dot in the package so npm doesn't
 * strip it on publish (same trick as `_gitignore`).
 */
function prepareEnv(root) {
  const bundled = path.join(root, "env.example");
  const example = path.join(root, ".env.example");
  if (fs.existsSync(bundled)) fs.renameSync(bundled, example);
  const env = path.join(root, ".env");
  if (fs.existsSync(example) && !fs.existsSync(env)) {
    fs.copyFileSync(example, env);
  }
}

/** Pick a package manager from the user agent that invoked us, default npm. */
function detectPackageManager() {
  const ua = process.env.npm_config_user_agent || "";
  if (ua.startsWith("yarn")) return "yarn";
  if (ua.startsWith("pnpm")) return "pnpm";
  if (ua.startsWith("bun")) return "bun";
  return "npm";
}

const SUPPORTED_PACKAGE_MANAGERS = ["npm", "yarn", "pnpm", "bun"];

/**
 * Run a child process.
 *
 * On Windows the package managers are `.cmd` shims rather than real
 * executables, and `spawnSync` cannot execute those without a shell — so npm /
 * yarn / pnpm installs fail with ENOENT unless `shell` is set. We only enable
 * the shell on Windows, and never interpolate user input into a command
 * string, so there is no injection surface.
 */
function run(cmd, args, cwd, opts = {}) {
  const res = spawnSync(cmd, args, {
    cwd,
    stdio: opts.stdio || "inherit",
    shell: IS_WINDOWS,
  });
  return res.status === 0;
}

/** Whether an executable is resolvable on PATH (cross-platform). */
function hasCommand(cmd) {
  const probe = IS_WINDOWS
    ? spawnSync("where", [cmd], { stdio: "ignore", shell: true })
    : spawnSync("sh", ["-c", `command -v ${cmd}`], { stdio: "ignore" });
  return probe.status === 0;
}

function installDeps(root, pm) {
  return run(pm, ["install"], root);
}

/**
 * Best-effort CocoaPods install for iOS. Only meaningful on macOS and only when
 * an `ios/` directory exists. Prefers the project's bundler (Gemfile) so the
 * CocoaPods version is pinned, falling back to a global `pod`.
 *
 * @returns {"ok"|"skipped"|"failed"}
 */
function installPods(root) {
  if (process.platform !== "darwin") return "skipped";
  const iosDir = path.join(root, "ios");
  if (!fs.existsSync(iosDir)) return "skipped";

  if (fs.existsSync(path.join(root, "Gemfile")) && hasCommand("bundle")) {
    run("bundle", ["install"], root);
    if (run("bundle", ["exec", "pod", "install"], iosDir)) return "ok";
  }
  if (hasCommand("pod")) {
    return run("pod", ["install"], iosDir) ? "ok" : "failed";
  }
  return "skipped";
}

function gitInit(root) {
  if (fs.existsSync(path.join(root, ".git"))) return true;
  if (!run("git", ["init", "-q"], root, { stdio: "ignore" })) return false;
  run("git", ["add", "-A"], root, { stdio: "ignore" });
  run(
    "git",
    ["commit", "-q", "-m", "chore: bootstrap from create-rn-starter"],
    root,
    { stdio: "ignore" }
  );
  return true;
}

module.exports = {
  COPY_SKIP_DIRS,
  COPY_SKIP_FILES,
  SUPPORTED_PACKAGE_MANAGERS,
  copyDir,
  restoreDotfiles,
  prepareEnv,
  detectPackageManager,
  hasCommand,
  installDeps,
  installPods,
  gitInit,
};
