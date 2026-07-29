"use strict";

const path = require("path");

// ── tiny ANSI helpers ───────────────────────────────────────────────────────
const useColor = process.stdout.isTTY && !process.env.NO_COLOR;
const wrap = (code) => (s) => (useColor ? `\x1b[${code}m${s}\x1b[0m` : String(s));
const c = {
  bold: wrap(1),
  dim: wrap(2),
  red: wrap(31),
  green: wrap(32),
  yellow: wrap(33),
  blue: wrap(34),
  magenta: wrap(35),
  cyan: wrap(36),
};

const log = (...a) => console.log(...a);
const step = (msg) => log(`${c.cyan("›")} ${msg}`);
const ok = (msg) => log(`${c.green("✔")} ${msg}`);
const warn = (msg) => log(`${c.yellow("!")} ${msg}`);
const err = (msg) => log(`${c.red("✖")} ${msg}`);

// ── name normalisation ───────────────────────────────────────────────────────
// A React Native CLI project carries the same app name in several casings, each
// needed by a different part of the toolchain:
//
//   pascalName  "MyCoolApp"      iOS folder/scheme/target, getMainComponentName,
//                                AppRegistry key (app.json `name`)
//   slug        "my-cool-app"    package.json `name`
//   lowerName   "mycoolapp"      misc. lowercase identifiers
//   displayName "My Cool App"    home-screen label (strings.xml / Info.plist)
//   bundleId    "com.acme.myapp" Android applicationId + iOS bundle identifier
//
// We derive each from the single name the user types.

/** PascalCase, alphanumeric — the canonical native app/module name. */
function toPascalName(input) {
  const parts = String(input)
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1));
  let name = parts.join("");
  // A native module name cannot start with a digit.
  if (/^[0-9]/.test(name)) name = "App" + name;
  return name || "MyApp";
}

/** Lower-kebab slug suitable for package.json `name`. */
function toSlug(input) {
  return String(input)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // non-alnum → hyphen
    .replace(/^-+|-+$/g, "") // trim hyphens
    .replace(/-{2,}/g, "-"); // collapse repeats
}

/** Lowercase alphanumeric, no separators. */
function toLowerName(input) {
  const s = String(input)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
  return s || "app";
}

/** Human display name — preserves the user's spacing/casing. */
function toDisplayName(input) {
  const s = String(input).trim();
  return s || "My App";
}

/** Default reverse-DNS bundle identifier from a name. */
function defaultBundleId(input) {
  const tail = toLowerName(input);
  return `com.example.${tail}`;
}

/**
 * The path segments an Android package maps to, e.g.
 * "com.acme.myapp" → ["com", "acme", "myapp"].
 */
function bundleIdToPath(bundleId) {
  return bundleId.split(".");
}

/**
 * Java/Kotlin keywords. A bundle identifier maps 1:1 onto a Java package path
 * (`com.new.app` → `com/new/app`), and a segment that is a reserved word makes
 * the generated `package com.new.app;` declaration uncompilable. Rejecting it
 * up front beats a Gradle error twenty minutes later.
 */
const RESERVED_PACKAGE_SEGMENTS = new Set([
  "abstract", "assert", "boolean", "break", "byte", "case", "catch", "char",
  "class", "const", "continue", "default", "do", "double", "else", "enum",
  "extends", "final", "finally", "float", "for", "goto", "if", "implements",
  "import", "instanceof", "int", "interface", "long", "native", "new",
  "package", "private", "protected", "public", "return", "short", "static",
  "strictfp", "super", "switch", "synchronized", "this", "throw", "throws",
  "transient", "try", "void", "volatile", "while",
  // Literals + Kotlin-only hard keywords that are equally unusable.
  "true", "false", "null", "fun", "object", "val", "var", "when", "in", "is",
  "typealias", "typeof",
]);

/** The reserved segments present in a bundle id (empty array when valid). */
function reservedSegments(id) {
  return String(id)
    .split(".")
    .filter((seg) => RESERVED_PACKAGE_SEGMENTS.has(seg.toLowerCase()));
}

/**
 * Validate a reverse-DNS identifier (com.foo.bar).
 *
 * Requires at least two segments, each starting with a letter, and rejects
 * segments that are Java/Kotlin reserved words.
 */
function isValidBundleId(id) {
  if (!/^[a-zA-Z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)+$/.test(id)) return false;
  return reservedSegments(id).length === 0;
}

/** Human-readable reason a bundle id was rejected, or `null` when it is valid. */
function bundleIdError(id) {
  if (!/^[a-zA-Z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)+$/.test(id)) {
    return "Must be reverse-DNS, e.g. com.acme.myapp";
  }
  const reserved = reservedSegments(id);
  if (reserved.length) {
    return `"${reserved.join('", "')}" ${
      reserved.length === 1 ? "is a" : "are"
    } reserved Java/Kotlin word${reserved.length === 1 ? "" : "s"} — pick another segment.`;
  }
  return null;
}

/** Validate a project/slug name. */
function isValidSlug(slug) {
  return /^[a-z0-9][a-z0-9-]*$/.test(slug) && slug.length <= 214;
}

function resolveTarget(cwd, slug) {
  return path.resolve(cwd, slug);
}

module.exports = {
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
  bundleIdToPath,
  isValidBundleId,
  bundleIdError,
  reservedSegments,
  RESERVED_PACKAGE_SEGMENTS,
  isValidSlug,
  resolveTarget,
};
