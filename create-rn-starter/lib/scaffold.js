"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

/** Recursively copy a directory tree (preserving symlinks). */
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(from, to);
    } else if (entry.isSymbolicLink()) {
      fs.symlinkSync(fs.readlinkSync(from), to);
    } else {
      fs.copyFileSync(from, to);
    }
  }
}

/** Rename the bundled `_gitignore` back to `.gitignore` in the new project. */
function restoreDotfiles(root) {
  const from = path.join(root, "_gitignore");
  const to = path.join(root, ".gitignore");
  if (fs.existsSync(from)) fs.renameSync(from, to);
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

function run(cmd, args, cwd) {
  const res = spawnSync(cmd, args, { cwd, stdio: "inherit", shell: false });
  return res.status === 0;
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

  const has = (cmd) =>
    spawnSync("sh", ["-c", `command -v ${cmd}`], { stdio: "ignore" }).status ===
    0;

  if (fs.existsSync(path.join(root, "Gemfile")) && has("bundle")) {
    spawnSync("bundle", ["install"], { cwd: root, stdio: "inherit" });
    if (run("bundle", ["exec", "pod", "install"], iosDir)) return "ok";
  }
  if (has("pod")) {
    return run("pod", ["install"], iosDir) ? "ok" : "failed";
  }
  return "skipped";
}

function gitInit(root) {
  if (fs.existsSync(path.join(root, ".git"))) return true;
  const init = spawnSync("git", ["init", "-q"], { cwd: root, stdio: "ignore" });
  if (init.status !== 0) return false;
  spawnSync("git", ["add", "-A"], { cwd: root, stdio: "ignore" });
  spawnSync(
    "git",
    ["commit", "-q", "-m", "chore: bootstrap from create-rn-starter"],
    { cwd: root, stdio: "ignore" }
  );
  return true;
}

module.exports = {
  copyDir,
  restoreDotfiles,
  prepareEnv,
  detectPackageManager,
  installDeps,
  installPods,
  gitInit,
};
