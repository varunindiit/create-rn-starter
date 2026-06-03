"use strict";

const fs = require("fs");
const path = require("path");
const { bundleIdToPath } = require("./utils");

// ── what the bundled template currently calls itself ─────────────────────────
// The template is a real, working RN CLI app, so every identifier appears as a
// concrete literal. Renaming = swapping these source literals for the user's.
const SOURCE = {
  pascalName: "AwesomeProject",
  lowerName: "awesomeproject",
  bundleId: "com.awesomeproject",
  // The default identifier `react-native init` bakes into the Xcode project.
  iosDefaultBundleId: "org.reactjs.native.example.$(PRODUCT_NAME:rfc1034identifier)",
};

// File extensions / names we treat as text and run token replacement on.
// Everything else (fonts, png, keystores, jars …) is copied verbatim.
const TEXT_EXT = new Set([
  ".js", ".jsx", ".ts", ".tsx", ".json", ".md", ".txt", ".html", ".css",
  ".yml", ".yaml", ".env", ".xml", ".plist", ".pbxproj", ".storyboard",
  ".xcscheme", ".xcworkspacedata", ".gradle", ".properties", ".kt", ".java",
  ".swift", ".h", ".m", ".mm", ".rb", ".pro", ".cfg", ".podspec", ".d.ts",
  ".xcprivacy",
]);

const TEXT_BASENAMES = new Set([
  "_gitignore", ".gitignore", "Podfile", "Gemfile", "gradlew", "gradlew.bat",
  ".watchmanconfig", "app.json",
]);

function isTextFile(filePath) {
  const base = path.basename(filePath);
  if (TEXT_BASENAMES.has(base)) return true;
  return TEXT_EXT.has(path.extname(filePath).toLowerCase());
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Walk every file under `dir`, yielding absolute paths. */
function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

/**
 * Replace every source identifier with the user's values across all text
 * files. Longer keys are applied first so `org.reactjs.native…` and
 * `com.awesomeproject` are handled before the bare `awesomeproject`.
 */
function applyTokenReplacements(root, names) {
  const tokens = {
    [SOURCE.iosDefaultBundleId]: names.bundleId,
    [SOURCE.bundleId]: names.bundleId,
    [SOURCE.pascalName]: names.pascalName,
    [SOURCE.lowerName]: names.lowerName,
  };
  const ordered = Object.keys(tokens).sort((a, b) => b.length - a.length);
  const patterns = ordered.map((key) => ({
    re: new RegExp(escapeRegExp(key), "g"),
    value: tokens[key],
  }));

  let changed = 0;
  for (const file of walk(root)) {
    if (!isTextFile(file)) continue;
    let content;
    try {
      content = fs.readFileSync(file, "utf8");
    } catch {
      continue; // unreadable / binary disguised as text — skip safely
    }
    let next = content;
    for (const { re, value } of patterns) next = next.replace(re, value);
    if (next !== content) {
      fs.writeFileSync(file, next);
      changed += 1;
    }
  }
  return changed;
}

function renameIfExists(from, to) {
  if (fs.existsSync(from) && from !== to) {
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.renameSync(from, to);
    return true;
  }
  return false;
}

/**
 * Rename the iOS folder, Xcode project, workspace and shared scheme so they
 * match the new app name. The token pass above already rewrote every internal
 * reference inside their files, so the names line up after this move.
 */
function renameIosDirs(root, names) {
  const ios = path.join(root, "ios");
  if (!fs.existsSync(ios)) return;
  const P = names.pascalName;

  renameIfExists(path.join(ios, SOURCE.pascalName), path.join(ios, P));
  renameIfExists(
    path.join(ios, `${SOURCE.pascalName}.xcodeproj`),
    path.join(ios, `${P}.xcodeproj`)
  );
  renameIfExists(
    path.join(ios, `${SOURCE.pascalName}.xcworkspace`),
    path.join(ios, `${P}.xcworkspace`)
  );

  // The shared scheme lives inside the (now renamed) .xcodeproj.
  const schemeDir = path.join(
    ios,
    `${P}.xcodeproj`,
    "xcshareddata",
    "xcschemes"
  );
  renameIfExists(
    path.join(schemeDir, `${SOURCE.pascalName}.xcscheme`),
    path.join(schemeDir, `${P}.xcscheme`)
  );
}

/** Recursively remove a directory and any parents that become empty, up to `stopAt`. */
function pruneEmptyDirs(dir, stopAt) {
  let cur = dir;
  while (cur.startsWith(stopAt) && cur !== stopAt) {
    if (fs.existsSync(cur) && fs.readdirSync(cur).length === 0) {
      fs.rmdirSync(cur);
      cur = path.dirname(cur);
    } else {
      break;
    }
  }
}

/**
 * Move the Android source from `…/java/com/awesomeproject` to the package path
 * implied by the new bundle id (e.g. `…/java/com/acme/myapp`). The `package`
 * declaration inside MainActivity/MainApplication was already rewritten by the
 * token pass, so the folder layout just needs to follow.
 */
function moveAndroidPackage(root, names) {
  const javaRoot = path.join(root, "android", "app", "src", "main", "java");
  const oldDir = path.join(javaRoot, ...bundleIdToPath(SOURCE.bundleId));
  if (!fs.existsSync(oldDir)) return;

  const newDir = path.join(javaRoot, ...bundleIdToPath(names.bundleId));
  if (path.resolve(oldDir) === path.resolve(newDir)) return;

  fs.mkdirSync(newDir, { recursive: true });
  for (const entry of fs.readdirSync(oldDir)) {
    fs.renameSync(path.join(oldDir, entry), path.join(newDir, entry));
  }
  pruneEmptyDirs(oldDir, javaRoot);
}

// ── targeted edits the token pass can't safely express ───────────────────────

function setJsonField(file, mutate) {
  if (!fs.existsSync(file)) return;
  const json = JSON.parse(fs.readFileSync(file, "utf8"));
  mutate(json);
  fs.writeFileSync(file, JSON.stringify(json, null, 2) + "\n");
}

function replaceInFile(file, re, value) {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, "utf8");
  const next = content.replace(re, value);
  if (next !== content) fs.writeFileSync(file, next);
}

/**
 * Apply the human-facing values that differ from the canonical PascalCase name:
 *   • package.json `name`     → npm slug (lowercase, hyphenated)
 *   • app.json name/displayName
 *   • Android strings.xml app_name → display name
 *   • iOS Info.plist CFBundleDisplayName → display name
 */
function applyTargetedEdits(root, names) {
  // package.json — npm names must be lowercase.
  setJsonField(path.join(root, "package.json"), (pkg) => {
    pkg.name = names.slug;
  });

  // app.json — `name` is the AppRegistry key (must equal getMainComponentName).
  setJsonField(path.join(root, "app.json"), (app) => {
    app.name = names.pascalName;
    app.displayName = names.displayName;
  });

  // Android home-screen label.
  replaceInFile(
    path.join(root, "android/app/src/main/res/values/strings.xml"),
    /(<string name="app_name">)[^<]*(<\/string>)/,
    `$1${names.displayName}$2`
  );

  // iOS home-screen label.
  replaceInFile(
    path.join(root, "ios", names.pascalName, "Info.plist"),
    /(<key>CFBundleDisplayName<\/key>\s*<string>)[^<]*(<\/string>)/,
    `$1${names.displayName}$2`
  );
}

/**
 * Full rename pipeline. Order matters: rewrite file *contents* first (while the
 * folders still sit at their source paths), then move the native folders, then
 * apply the few targeted human-facing values.
 *
 * @returns {number} number of files whose contents changed in the token pass.
 */
function renameProject(root, names) {
  const changed = applyTokenReplacements(root, names);
  renameIosDirs(root, names);
  moveAndroidPackage(root, names);
  applyTargetedEdits(root, names);
  return changed;
}

module.exports = {
  SOURCE,
  isTextFile,
  applyTokenReplacements,
  renameIosDirs,
  moveAndroidPackage,
  applyTargetedEdits,
  renameProject,
};
