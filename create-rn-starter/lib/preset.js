"use strict";

const fs = require("fs");
const path = require("path");
const { isTextFile } = require("./rename");

/**
 * Presets let one template serve a throwaway prototype and a full product.
 *
 * The template on disk is always the *full* variant — that is the version we
 * lint, typecheck and test, so there is exactly one source of truth. A preset
 * subtracts from it:
 *
 *   1. feature directories/files are deleted outright,
 *   2. the code that referenced them is removed via `crns:if` markers,
 *   3. the now-unused dependencies are pruned from package.json.
 *
 * Marker syntax is comment-agnostic — any line containing `crns:if <feature>`
 * opens a region and any line containing `crns:endif` closes it, so the same
 * mechanism works in TS, Gradle, XML and plists:
 *
 *   // crns:if i18n
 *   import "./src/localization/i18n";
 *   // crns:endif
 *
 * When the feature is enabled only the marker lines are stripped; when it is
 * disabled the whole region goes.
 */

/**
 * Every optional feature, with the files and dependencies it owns.
 *
 * Localisation and form validation are deliberately NOT optional. They are
 * pure-JS, small, and referenced from nearly every screen — making them
 * removable would mean every screen carrying two variants of its copy and its
 * submit handler, which is exactly the kind of conditional source that rots.
 * What a preset drops instead is weight that is genuinely optional: a heavy
 * native dependency, a data layer, a showcase screen.
 */
const FEATURES = {
  imagePicker: {
    label: "Image picker sheet (camera + gallery, cropping)",
    paths: ["src/components/ImagePickerSheet"],
    dependencies: ["react-native-image-crop-picker"],
  },
  rtkQuery: {
    label: "RTK Query data layer",
    paths: ["src/services/apiSlice.ts", "src/services/hooks.ts"],
    dependencies: [],
  },
  gallery: {
    label: "Component gallery screen",
    paths: ["src/screen/root/gallery"],
    dependencies: [],
  },
};

const ALL_FEATURES = Object.keys(FEATURES);

/** Named bundles of features, leanest first. */
const PRESETS = {
  minimal: {
    label:
      "No native image picker, no data layer, no showcase \u2014 leanest binary",
    features: [],
  },
  standard: {
    label: "Everything except the component gallery showcase",
    features: ["imagePicker", "rtkQuery"],
  },
  full: {
    label: "Every feature, including the component gallery",
    features: ALL_FEATURES,
  },
};

const DEFAULT_PRESET = "full";

const isValidPreset = (name) => Object.prototype.hasOwnProperty.call(PRESETS, name);

/** The enabled-feature set for a preset name. */
function featuresFor(preset) {
  return new Set(PRESETS[preset].features);
}

const OPEN_RE = /crns:if\s+(!?)([A-Za-z0-9_]+)/;
const CLOSE_RE = /crns:endif/;

/**
 * Strip `crns:if` regions from a source string.
 *
 * `crns:if feature` keeps the region when the feature is on; `crns:if !feature`
 * keeps it when the feature is off. The negated form exists so a construct can
 * offer two complete, individually valid alternatives — writing one variant as
 * a fragment that only parses once the other half is stripped produces source
 * that neither Prettier nor ESLint can accept in the generated project.
 *
 * @param {string} content
 * @param {Set<string>} enabled
 * @returns {string}
 */
function stripMarkers(content, enabled) {
  if (!content.includes("crns:")) return content;

  const lines = content.split("\n");
  const out = [];
  /** @type {boolean[]} whether each enclosing region is currently kept */
  const stack = [];

  for (const line of lines) {
    const open = OPEN_RE.exec(line);
    if (open) {
      const negated = open[1] === "!";
      const active = enabled.has(open[2]);
      stack.push(negated ? !active : active);
      continue; // marker lines never survive
    }
    if (CLOSE_RE.test(line)) {
      stack.pop();
      continue;
    }
    // Keep the line only when every enclosing region is kept.
    if (stack.every(Boolean)) out.push(line);
  }

  return out.join("\n");
}

/** Remove a file or directory if present. */
function removePath(target) {
  if (!fs.existsSync(target)) return false;
  fs.rmSync(target, { recursive: true, force: true });
  return true;
}

/** Drop pruned packages from the generated project's package.json. */
function prunePackageJson(root, removedDeps) {
  const file = path.join(root, "package.json");
  if (!fs.existsSync(file) || removedDeps.length === 0) return;
  const pkg = JSON.parse(fs.readFileSync(file, "utf8"));
  for (const group of ["dependencies", "devDependencies"]) {
    if (!pkg[group]) continue;
    for (const dep of removedDeps) delete pkg[group][dep];
  }
  fs.writeFileSync(file, JSON.stringify(pkg, null, 2) + "\n");
}

/** Walk every file under `dir`, yielding absolute paths. */
function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

/**
 * Apply a preset to an already-copied project tree.
 *
 * @param {string} root generated project directory
 * @param {string} preset preset name
 * @returns {{ removedPaths: string[], removedDeps: string[], strippedFiles: number }}
 */
function applyPreset(root, preset) {
  const enabled = featuresFor(preset);
  const removedPaths = [];
  const removedDeps = [];

  // 1 — delete the files owned by every disabled feature.
  for (const name of ALL_FEATURES) {
    if (enabled.has(name)) continue;
    for (const rel of FEATURES[name].paths) {
      if (removePath(path.join(root, rel))) removedPaths.push(rel);
    }
    removedDeps.push(...FEATURES[name].dependencies);
  }

  // 2 — strip the marker regions from everything that is left.
  let strippedFiles = 0;
  for (const file of walk(root)) {
    if (!isTextFile(file)) continue;
    let content;
    try {
      content = fs.readFileSync(file, "utf8");
    } catch {
      continue;
    }
    const next = stripMarkers(content, enabled);
    if (next !== content) {
      fs.writeFileSync(file, next);
      strippedFiles += 1;
    }
  }

  // 3 — prune the dependencies nothing imports any more.
  prunePackageJson(root, removedDeps);

  return { removedPaths, removedDeps, strippedFiles };
}

module.exports = {
  FEATURES,
  ALL_FEATURES,
  PRESETS,
  DEFAULT_PRESET,
  isValidPreset,
  featuresFor,
  stripMarkers,
  applyPreset,
};
