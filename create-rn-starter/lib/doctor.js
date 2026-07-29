"use strict";

const { spawnSync } = require("child_process");
const { c, log, ok, warn, err } = require("./utils");
const { hasCommand } = require("./scaffold");

const IS_WINDOWS = process.platform === "win32";
const IS_MAC = process.platform === "darwin";

/** Capture a command's stdout, or null when it is missing / fails. */
function capture(cmd, args) {
  const res = spawnSync(cmd, args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
    shell: IS_WINDOWS,
  });
  if (res.status !== 0 || !res.stdout) return null;
  return res.stdout.trim();
}

/** First `x.y.z` looking token in a string. */
const firstVersion = (s) => (s && s.match(/\d+\.\d+(\.\d+)?/) || [null])[0];

const cmp = (a, b) => {
  const pa = String(a).split(".").map(Number);
  const pb = String(b).split(".").map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] || 0) - (pb[i] || 0);
    if (d) return d < 0 ? -1 : 1;
  }
  return 0;
};

/**
 * Each check reports one of:
 *   ok      — present and new enough
 *   warn    — present but old, or missing-but-optional
 *   fail    — missing and required
 */
function checkNode() {
  const version = process.versions.node;
  if (cmp(version, "18.0.0") < 0) {
    return { level: "fail", label: "Node.js", detail: `${version} (need ≥ 18)` };
  }
  if (cmp(version, "20.19.4") < 0) {
    return {
      level: "warn",
      label: "Node.js",
      detail: `${version} — React Native 0.85 wants ≥ 20.19.4`,
    };
  }
  return { level: "ok", label: "Node.js", detail: version };
}

function checkJava() {
  // `java -version` writes to stderr, so ask for the property instead.
  const raw =
    capture("java", ["-XshowSettings:properties", "-version"]) ||
    capture("java", ["--version"]);
  if (!raw && !hasCommand("java")) {
    return {
      level: "fail",
      label: "Java (JDK)",
      detail: "not found — install a JDK 17+ (Android builds need it)",
    };
  }
  const version = firstVersion(raw || "");
  if (!version) return { level: "warn", label: "Java (JDK)", detail: "present, version unknown" };
  const major = Number(version.split(".")[0]);
  if (major < 17) {
    return { level: "warn", label: "Java (JDK)", detail: `${version} — Android Gradle wants 17+` };
  }
  return { level: "ok", label: "Java (JDK)", detail: version };
}

function checkAndroidSdk() {
  const home = process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT;
  if (!home) {
    return {
      level: "warn",
      label: "Android SDK",
      detail: "ANDROID_HOME / ANDROID_SDK_ROOT not set",
    };
  }
  return { level: "ok", label: "Android SDK", detail: home };
}

function checkXcode() {
  if (!IS_MAC) return { level: "skip", label: "Xcode", detail: "not macOS" };
  const raw = capture("xcodebuild", ["-version"]);
  if (!raw) {
    return { level: "warn", label: "Xcode", detail: "not found — iOS builds unavailable" };
  }
  return { level: "ok", label: "Xcode", detail: firstVersion(raw) || "installed" };
}

function checkCocoaPods() {
  if (!IS_MAC) return { level: "skip", label: "CocoaPods", detail: "not macOS" };
  const raw = capture("pod", ["--version"]);
  if (!raw) {
    return {
      level: "warn",
      label: "CocoaPods",
      detail: "not found — run `sudo gem install cocoapods` or use bundler",
    };
  }
  return { level: "ok", label: "CocoaPods", detail: raw };
}

function checkRuby() {
  if (!IS_MAC) return { level: "skip", label: "Ruby / bundler", detail: "not macOS" };
  const raw = capture("ruby", ["--version"]);
  if (!raw) return { level: "warn", label: "Ruby / bundler", detail: "ruby not found" };
  const version = firstVersion(raw);
  const bundler = hasCommand("bundle");
  if (version && cmp(version, "2.6.10") < 0) {
    return { level: "warn", label: "Ruby / bundler", detail: `${version} — CocoaPods wants ≥ 2.6.10` };
  }
  return {
    level: bundler ? "ok" : "warn",
    label: "Ruby / bundler",
    detail: bundler ? `${version} (bundler present)` : `${version} (bundler missing)`,
  };
}

function checkWatchman() {
  const raw = capture("watchman", ["--version"]);
  if (!raw) {
    return {
      level: "warn",
      label: "Watchman",
      detail: "not found — optional, but Metro is faster with it",
    };
  }
  return { level: "ok", label: "Watchman", detail: raw };
}

function checkGit() {
  const raw = capture("git", ["--version"]);
  if (!raw) return { level: "warn", label: "Git", detail: "not found — --no-git will be forced" };
  return { level: "ok", label: "Git", detail: firstVersion(raw) || "installed" };
}

const CHECKS = [
  checkNode,
  checkGit,
  checkJava,
  checkAndroidSdk,
  checkXcode,
  checkCocoaPods,
  checkRuby,
  checkWatchman,
];

/**
 * Run every environment check and print a report.
 *
 * @returns {number} process exit code — non-zero only when something required
 *                   is missing, so `doctor` is usable as a CI gate.
 */
function runDoctor() {
  log("");
  log(c.bold("  create-rn-starter doctor"));
  log(c.dim("  Checking the toolchain a React Native CLI build needs.\n"));

  let failures = 0;
  let warnings = 0;

  for (const check of CHECKS) {
    let result;
    try {
      result = check();
    } catch (e) {
      result = { level: "warn", label: check.name, detail: String(e && e.message) };
    }
    const label = result.label.padEnd(16);
    if (result.level === "ok") ok(`${label} ${c.dim(result.detail)}`);
    else if (result.level === "skip") log(`${c.dim("–")} ${label} ${c.dim(result.detail)}`);
    else if (result.level === "warn") {
      warnings += 1;
      warn(`${label} ${result.detail}`);
    } else {
      failures += 1;
      err(`${label} ${result.detail}`);
    }
  }

  log("");
  if (failures) {
    err(`${failures} required check${failures === 1 ? "" : "s"} failed.`);
    log(c.dim("  Scaffolding still works, but builds will not until these are fixed.\n"));
    return 1;
  }
  if (warnings) {
    warn(`${warnings} optional check${warnings === 1 ? "" : "s"} need attention.`);
    log("");
    return 0;
  }
  ok("Everything looks good.");
  log("");
  return 0;
}

module.exports = { runDoctor, CHECKS };
