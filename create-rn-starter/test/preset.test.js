"use strict";

const test = require("node:test");
const assert = require("node:assert");

const {stripMarkers, PRESETS, featuresFor, ALL_FEATURES} = require("../lib/preset");

const enabled = (...names) => new Set(names);

test("an enabled region keeps its body and drops only the markers", () => {
  const src = ["before", "// crns:if gallery", "kept", "// crns:endif", "after"].join("\n");
  assert.equal(stripMarkers(src, enabled("gallery")), "before\nkept\nafter");
});

test("a disabled region takes its body with it", () => {
  const src = ["before", "// crns:if gallery", "gone", "// crns:endif", "after"].join("\n");
  assert.equal(stripMarkers(src, enabled()), "before\nafter");
});

test("negated regions are the mirror image", () => {
  const src = ["// crns:if !rtkQuery", "fallback", "// crns:endif"].join("\n");
  assert.equal(stripMarkers(src, enabled()), "fallback");
  assert.equal(stripMarkers(src, enabled("rtkQuery")), "");
});

test("nested regions require every enclosing feature", () => {
  const src = [
    "// crns:if gallery",
    "outer",
    "// crns:if rtkQuery",
    "inner",
    "// crns:endif",
    "// crns:endif",
  ].join("\n");
  assert.equal(stripMarkers(src, enabled("gallery", "rtkQuery")), "outer\ninner");
  assert.equal(stripMarkers(src, enabled("gallery")), "outer");
  assert.equal(stripMarkers(src, enabled("rtkQuery")), "");
});

test("comment syntax does not matter", () => {
  const xml = ["<!-- crns:if imagePicker -->", "<uses-permission/>", "<!-- crns:endif -->"];
  assert.equal(stripMarkers(xml.join("\n"), enabled("imagePicker")), "<uses-permission/>");
  assert.equal(stripMarkers(xml.join("\n"), enabled()), "");
});

test("content with no markers is returned untouched", () => {
  const src = "just\nsome\nsource";
  assert.equal(stripMarkers(src, enabled("gallery")), src);
});

test("presets are ordered leanest to richest and reference real features", () => {
  assert.equal(featuresFor("minimal").size, 0);
  assert.ok(featuresFor("standard").size < featuresFor("full").size);
  assert.deepEqual([...featuresFor("full")].sort(), [...ALL_FEATURES].sort());
  for (const [name, preset] of Object.entries(PRESETS)) {
    for (const feature of preset.features) {
      assert.ok(ALL_FEATURES.includes(feature), `${name} -> unknown ${feature}`);
    }
  }
});
