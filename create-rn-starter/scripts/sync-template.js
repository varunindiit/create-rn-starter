#!/usr/bin/env node
"use strict";

/**
 * Keep `create-rn-starter/template/` byte-identical to the app at the repo
 * root.
 *
 * The repo root is a real, runnable React Native app — it is where `node_modules`,
 * CocoaPods and the Gradle caches live, so it is where the app is actually
 * developed, linted, typechecked and tested. `template/` is the copy that ships
 * inside the npm tarball. Two copies of the same source silently drift (they
 * already had: .eslintrc.js, jest.config.js, tsconfig.json and project.pbxproj
 * all differed), so this script makes the relationship explicit and mechanical:
 *
 *     node scripts/sync-template.js           copy root → template
 *     node scripts/sync-template.js --check   exit 1 if they differ (CI gate)
 *
 * Everything shared is byte-identical. Only two files are name-mapped, because
 * npm mangles or strips leading dots on publish.
 */

const fs = require("fs");
const path = require("path");

const PKG_DIR = path.join(__dirname, "..");
const TEMPLATE_DIR = path.join(PKG_DIR, "template");
const ROOT_DIR = path.join(PKG_DIR, "..");

/** Files whose name differs between the working app and the shipped template. */
const NAME_MAP = new Map([
  [".gitignore", "_gitignore"],
  [".env.example", "env.example"],
]);

/** Never copied out of the repo root — build output, caches, or repo-only. */
const ROOT_EXCLUDE_DIRS = new Set([
  "node_modules",
  "create-rn-starter",
  ".git",
  ".vscode",
  ".idea",
  "Pods",
  "build",
  ".gradle",
  ".kotlin",
  ".cxx",
  "DerivedData",
  "xcuserdata",
  "vendor",
  ".bundle",
  "coverage",
]);

const ROOT_EXCLUDE_FILES = new Set([
  ".DS_Store",
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
  "bun.lockb",
  "Podfile.lock",
  "Gemfile.lock",
  ".xcode.env.local",
  "local.properties",
  "tsconfig.tsbuildinfo",
]);

/** Recursively list files relative to `dir`, applying the exclusion rules. */
function list(dir, rel = "", out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const relPath = rel ? `${rel}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      if (ROOT_EXCLUDE_DIRS.has(entry.name)) continue;
      list(path.join(dir, entry.name), relPath, out);
    } else {
      if (ROOT_EXCLUDE_FILES.has(entry.name)) continue;
      out.push(relPath);
    }
  }
  return out;
}

/** Apply the publish-time name mapping to a relative path. */
function toTemplatePath(relPath) {
  const parts = relPath.split("/");
  const base = parts[parts.length - 1];
  if (parts.length === 1 && NAME_MAP.has(base)) {
    return NAME_MAP.get(base);
  }
  return relPath;
}

function sameContent(a, b) {
  if (!fs.existsSync(a) || !fs.existsSync(b)) return false;
  const sa = fs.statSync(a);
  const sb = fs.statSync(b);
  if (sa.size !== sb.size) return false;
  return fs.readFileSync(a).equals(fs.readFileSync(b));
}

function run({ check }) {
  const sourceFiles = list(ROOT_DIR);
  const expected = new Set(sourceFiles.map(toTemplatePath));

  const changed = [];
  const removed = [];

  // 1 — copy/compare everything the root app owns.
  for (const relPath of sourceFiles) {
    const from = path.join(ROOT_DIR, relPath);
    const to = path.join(TEMPLATE_DIR, toTemplatePath(relPath));
    if (sameContent(from, to)) continue;
    changed.push(toTemplatePath(relPath));
    if (!check) {
      fs.mkdirSync(path.dirname(to), { recursive: true });
      fs.copyFileSync(from, to);
    }
  }

  // 2 — delete anything in the template the root no longer has.
  const templateFiles = list(TEMPLATE_DIR);
  for (const relPath of templateFiles) {
    if (expected.has(relPath)) continue;
    removed.push(relPath);
    if (!check) fs.rmSync(path.join(TEMPLATE_DIR, relPath), { force: true });
  }

  return { changed, removed };
}

const check = process.argv.includes("--check");
const { changed, removed } = run({ check });

if (check) {
  if (changed.length || removed.length) {
    console.error("\x1b[31m✖ template/ is out of sync with the root app.\x1b[0m\n");
    for (const f of changed) console.error(`  differs/missing  ${f}`);
    for (const f of removed) console.error(`  stale            ${f}`);
    console.error("\nRun: npm run sync\n");
    process.exit(1);
  }
  console.log("\x1b[32m✔\x1b[0m template/ is in sync with the root app.");
} else {
  if (!changed.length && !removed.length) {
    console.log("\x1b[32m✔\x1b[0m Already in sync — nothing to do.");
  } else {
    for (const f of changed) console.log(`  updated  ${f}`);
    for (const f of removed) console.log(`  deleted  ${f}`);
    console.log(
      `\n\x1b[32m✔\x1b[0m Synced ${changed.length} file(s), removed ${removed.length}.`
    );
  }
}
