#!/usr/bin/env node
"use strict";

// End-to-end smoke test: scaffold a project into a temp dir (no install / pods /
// git) and assert the rename across JS, Android and iOS happened correctly.
// Used by `npm test` and CI. Exits non-zero on the first failed assertion.

const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");

let failures = 0;
function assert(cond, msg) {
  if (cond) {
    console.log(`  \x1b[32m✔\x1b[0m ${msg}`);
  } else {
    console.error(`  \x1b[31m✖ ${msg}\x1b[0m`);
    failures += 1;
  }
}

const read = (p) => fs.readFileSync(p, "utf8");
const cli = path.join(__dirname, "..", "bin", "index.js");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "crns-smoke-"));

try {
  const res = spawnSync(
    process.execPath,
    [
      cli,
      "Smoke Test App",
      "--bundle-id",
      "com.smoke.testapp",
      "--no-install",
      "--no-pods",
      "--no-git",
    ],
    { cwd: tmp, stdio: "inherit" }
  );
  assert(res.status === 0, "CLI exited successfully");

  const proj = path.join(tmp, "smoke-test-app");
  assert(fs.existsSync(proj), "project directory created from slug");

  // ── package.json / app.json ───────────────────────────────────────────────
  const pkg = JSON.parse(read(path.join(proj, "package.json")));
  assert(pkg.name === "smoke-test-app", "package.json name = slug");

  const app = JSON.parse(read(path.join(proj, "app.json")));
  assert(app.name === "SmokeTestApp", "app.json name = PascalCase app name");
  assert(app.displayName === "Smoke Test App", "app.json displayName set");

  // ── Android ───────────────────────────────────────────────────────────────
  const strings = read(
    path.join(proj, "android/app/src/main/res/values/strings.xml")
  );
  assert(
    /<string name="app_name">Smoke Test App<\/string>/.test(strings),
    "Android app_name = display name"
  );

  const gradle = read(path.join(proj, "android/app/build.gradle"));
  assert(
    /namespace "com\.smoke\.testapp"/.test(gradle),
    "Android namespace = bundle id"
  );
  assert(
    /applicationId "com\.smoke\.testapp"/.test(gradle),
    "Android applicationId = bundle id"
  );

  const settings = read(path.join(proj, "android/settings.gradle"));
  assert(
    /rootProject\.name = 'SmokeTestApp'/.test(settings),
    "Android rootProject.name = app name"
  );

  const newPkgDir = path.join(
    proj,
    "android/app/src/main/java/com/smoke/testapp"
  );
  assert(fs.existsSync(newPkgDir), "Android package directory moved to bundle path");
  assert(
    !fs.existsSync(path.join(proj, "android/app/src/main/java/com/awesomeproject")),
    "old Android package directory removed"
  );
  const mainActivity = read(path.join(newPkgDir, "MainActivity.kt"));
  assert(
    /^package com\.smoke\.testapp/m.test(mainActivity),
    "MainActivity package declaration rewritten"
  );
  assert(
    /getMainComponentName\(\): String = "SmokeTestApp"/.test(mainActivity),
    "MainActivity component name = app name"
  );
  const mainApp = read(path.join(newPkgDir, "MainApplication.kt"));
  assert(
    /^package com\.smoke\.testapp/m.test(mainApp),
    "MainApplication package declaration rewritten"
  );

  // ── iOS ───────────────────────────────────────────────────────────────────
  assert(
    fs.existsSync(path.join(proj, "ios/SmokeTestApp")),
    "iOS source folder renamed"
  );
  assert(
    fs.existsSync(path.join(proj, "ios/SmokeTestApp.xcodeproj")),
    "iOS .xcodeproj renamed"
  );
  assert(
    fs.existsSync(path.join(proj, "ios/SmokeTestApp.xcworkspace")),
    "iOS .xcworkspace renamed"
  );
  assert(
    fs.existsSync(
      path.join(
        proj,
        "ios/SmokeTestApp.xcodeproj/xcshareddata/xcschemes/SmokeTestApp.xcscheme"
      )
    ),
    "iOS shared scheme renamed"
  );
  assert(
    !fs.existsSync(path.join(proj, "ios/AwesomeProject")),
    "old iOS source folder removed"
  );

  const plist = read(path.join(proj, "ios/SmokeTestApp/Info.plist"));
  assert(
    /<key>CFBundleDisplayName<\/key>\s*<string>Smoke Test App<\/string>/.test(
      plist
    ),
    "iOS CFBundleDisplayName = display name"
  );
  const pbxproj = read(
    path.join(proj, "ios/SmokeTestApp.xcodeproj/project.pbxproj")
  );
  assert(
    /PRODUCT_BUNDLE_IDENTIFIER = "?com\.smoke\.testapp"?/.test(pbxproj),
    "iOS PRODUCT_BUNDLE_IDENTIFIER = bundle id"
  );
  assert(
    /PRODUCT_NAME = SmokeTestApp/.test(pbxproj),
    "iOS PRODUCT_NAME = app name"
  );

  const podfile = read(path.join(proj, "ios/Podfile"));
  assert(/target 'SmokeTestApp' do/.test(podfile), "iOS Podfile target renamed");

  // ── dotfiles / env ────────────────────────────────────────────────────────
  assert(fs.existsSync(path.join(proj, ".gitignore")), ".gitignore restored");
  assert(!fs.existsSync(path.join(proj, "_gitignore")), "_gitignore removed");
  assert(fs.existsSync(path.join(proj, ".env.example")), ".env.example restored");
  assert(fs.existsSync(path.join(proj, ".env")), ".env seeded");
  assert(!fs.existsSync(path.join(proj, "env.example")), "env.example renamed");

  // ── no leftovers ──────────────────────────────────────────────────────────
  const leftovers = [];
  (function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        walk(full);
      } else if (
        /\.(ts|tsx|js|jsx|json|md|gradle|kt|swift|plist|pbxproj|xml|xcscheme|xcworkspacedata)$/.test(
          e.name
        ) ||
        e.name === "Podfile"
      ) {
        const t = read(full);
        if (/AwesomeProject|awesomeproject/.test(t)) {
          leftovers.push(path.relative(proj, full));
        }
      }
    }
  })(proj);
  assert(
    leftovers.length === 0,
    `no leftover source names${
      leftovers.length ? " (found: " + leftovers.join(", ") + ")" : ""
    }`
  );
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}

if (failures > 0) {
  console.error(`\n\x1b[31mSmoke test FAILED (${failures} assertion(s)).\x1b[0m`);
  process.exit(1);
}
console.log("\n\x1b[32mSmoke test passed.\x1b[0m");
