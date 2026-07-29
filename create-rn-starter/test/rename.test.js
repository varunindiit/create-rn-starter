"use strict";

const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const os = require("os");
const path = require("path");

const {applyTokenReplacements, isTextFile} = require("../lib/rename");

const withTmp = (fn) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "crns-rename-"));
  try {
    return fn(dir);
  } finally {
    fs.rmSync(dir, {recursive: true, force: true});
  }
};

test("token pass rewrites every identifier casing", () => {
  withTmp((dir) => {
    const file = path.join(dir, "a.gradle");
    fs.writeFileSync(
      file,
      'applicationId "com.awesomeproject"\nname AwesomeProject\nlower awesomeproject\n'
    );
    applyTokenReplacements(dir, {
      bundleId: "com.acme.myapp",
      pascalName: "MyApp",
      lowerName: "myapp",
    });
    const out = fs.readFileSync(file, "utf8");
    assert.match(out, /applicationId "com\.acme\.myapp"/);
    assert.match(out, /name MyApp/);
    assert.match(out, /lower myapp/);
  });
});

/**
 * Regression: replacing the patterns sequentially let a later pattern rewrite
 * text an earlier one had just inserted, so `com.awesomeproject.mobile` came
 * out as `com.mobile.mobile`. The single-pass replacer must leave it intact.
 */
test("token pass does not cascade into its own output", () => {
  withTmp((dir) => {
    const file = path.join(dir, "a.gradle");
    fs.writeFileSync(file, 'applicationId "com.awesomeproject"\n');
    applyTokenReplacements(dir, {
      bundleId: "com.awesomeproject.mobile",
      pascalName: "Mobile",
      lowerName: "mobile",
    });
    assert.match(
      fs.readFileSync(file, "utf8"),
      /applicationId "com\.awesomeproject\.mobile"/
    );
  });
});

test("token pass rewrites the default Xcode bundle id before shorter tokens", () => {
  withTmp((dir) => {
    const file = path.join(dir, "project.pbxproj");
    fs.writeFileSync(
      file,
      "PRODUCT_BUNDLE_IDENTIFIER = " +
        '"org.reactjs.native.example.$(PRODUCT_NAME:rfc1034identifier)";\n'
    );
    applyTokenReplacements(dir, {
      bundleId: "com.acme.myapp",
      pascalName: "MyApp",
      lowerName: "myapp",
    });
    assert.match(
      fs.readFileSync(file, "utf8"),
      /PRODUCT_BUNDLE_IDENTIFIER = "com\.acme\.myapp"/
    );
  });
});

test("binary assets are left untouched", () => {
  assert.ok(isTextFile("a/b/App.tsx"));
  assert.ok(isTextFile("a/Podfile"));
  assert.ok(isTextFile("a/_gitignore"));
  assert.ok(!isTextFile("a/font.ttf"));
  assert.ok(!isTextFile("a/icon.png"));
  assert.ok(!isTextFile("a/debug.keystore"));
});
