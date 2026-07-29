"use strict";

const test = require("node:test");
const assert = require("node:assert");

const {
  toPascalName,
  toSlug,
  toLowerName,
  toDisplayName,
  defaultBundleId,
  bundleIdToPath,
  isValidBundleId,
  bundleIdError,
  isValidSlug,
} = require("../lib/utils");

test("toPascalName strips separators and capitalises each word", () => {
  assert.equal(toPascalName("my cool app"), "MyCoolApp");
  assert.equal(toPascalName("my-cool-app"), "MyCoolApp");
  assert.equal(toPascalName("  spaced   out  "), "SpacedOut");
  assert.equal(toPascalName("already Pascal"), "AlreadyPascal");
});

test("toPascalName keeps the native module name legal", () => {
  // A Java/ObjC class name cannot start with a digit — that is the contract,
  // not any particular casing of the remainder.
  const fromDigit = toPascalName("2fast");
  assert.ok(/^[A-Za-z]/.test(fromDigit), `${fromDigit} must not start with a digit`);
  assert.ok(/^[A-Za-z0-9]+$/.test(fromDigit), "must stay alphanumeric");
  // Nothing usable in the input still has to yield a valid name.
  assert.equal(toPascalName("!!!"), "MyApp");
  assert.equal(toPascalName(""), "MyApp");
});

test("toSlug produces a legal npm name", () => {
  assert.equal(toSlug("My Cool App"), "my-cool-app");
  assert.equal(toSlug("--leading-and-trailing--"), "leading-and-trailing");
  assert.equal(toSlug("multiple   spaces"), "multiple-spaces");
  assert.equal(toSlug("Mixed_Case.Name"), "mixed-case-name");
});

test("toLowerName and toDisplayName", () => {
  assert.equal(toLowerName("My Cool App"), "mycoolapp");
  assert.equal(toLowerName("!!!"), "app");
  assert.equal(toDisplayName("  My Cool App  "), "My Cool App");
  assert.equal(toDisplayName(""), "My App");
});

test("defaultBundleId derives a reverse-DNS id", () => {
  assert.equal(defaultBundleId("My Cool App"), "com.example.mycoolapp");
});

test("bundleIdToPath maps to Java package segments", () => {
  assert.deepEqual(bundleIdToPath("com.acme.myapp"), ["com", "acme", "myapp"]);
});

test("isValidBundleId accepts reverse-DNS and rejects malformed input", () => {
  assert.ok(isValidBundleId("com.acme.myapp"));
  assert.ok(isValidBundleId("com.acme"));
  assert.ok(!isValidBundleId("com"), "single segment");
  assert.ok(!isValidBundleId("1com.acme"), "segment starting with a digit");
  assert.ok(!isValidBundleId("com..acme"), "empty segment");
  assert.ok(!isValidBundleId("com.acme-corp.app"), "hyphen is not legal");
});

test("isValidBundleId rejects Java/Kotlin reserved words", () => {
  // `com.new.app` maps to `package com.new.app`, which does not compile.
  assert.ok(!isValidBundleId("com.new.app"));
  assert.ok(!isValidBundleId("com.class.app"));
  assert.ok(!isValidBundleId("com.package.app"));
  assert.ok(!isValidBundleId("com.fun.app"), "Kotlin keyword");
  assert.match(bundleIdError("com.new.app"), /reserved/i);
  assert.equal(bundleIdError("com.acme.myapp"), null);
});

test("isValidSlug enforces npm naming and the length cap", () => {
  assert.ok(isValidSlug("my-cool-app"));
  assert.ok(!isValidSlug("-leading-hyphen"));
  assert.ok(!isValidSlug("Upper"));
  assert.ok(!isValidSlug("a".repeat(215)));
});
