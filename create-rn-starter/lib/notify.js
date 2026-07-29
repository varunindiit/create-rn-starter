"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");
const https = require("https");

const CACHE_FILE = path.join(os.tmpdir(), ".create-rn-starter-update-check");
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // one check per day
const REQUEST_TIMEOUT_MS = 1500;

/** Compare two dotted versions, ignoring any pre-release suffix. */
function isNewer(candidate, current) {
  const clean = (v) => String(v).split("-")[0].split(".").map(Number);
  const a = clean(candidate);
  const b = clean(current);
  for (let i = 0; i < 3; i++) {
    const d = (a[i] || 0) - (b[i] || 0);
    if (d) return d > 0;
  }
  return false;
}

function readCache() {
  try {
    const raw = JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"));
    if (Date.now() - raw.checkedAt > CACHE_TTL_MS) return null;
    return raw;
  } catch {
    return null;
  }
}

function writeCache(latest) {
  try {
    fs.writeFileSync(
      CACHE_FILE,
      JSON.stringify({ latest, checkedAt: Date.now() })
    );
  } catch {
    /* a cache we cannot write is not an error worth surfacing */
  }
}

/** Ask the registry for the `latest` dist-tag. Resolves to null on any failure. */
function fetchLatest(pkgName) {
  return new Promise((resolve) => {
    const url = `https://registry.npmjs.org/${pkgName.replace(
      "/",
      "%2f"
    )}/latest`;
    let settled = false;
    const done = (value) => {
      if (settled) return;
      settled = true;
      resolve(value);
    };

    const req = https.get(
      url,
      { headers: { accept: "application/json" } },
      (res) => {
        if (res.statusCode !== 200) {
          res.resume();
          return done(null);
        }
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          body += chunk;
          if (body.length > 1e6) req.destroy();
        });
        res.on("end", () => {
          try {
            done(JSON.parse(body).version || null);
          } catch {
            done(null);
          }
        });
      }
    );

    req.setTimeout(REQUEST_TIMEOUT_MS, () => {
      req.destroy();
      done(null);
    });
    req.on("error", () => done(null));
  });
}

/**
 * Check npm for a newer release, at most once a day.
 *
 * Deliberately best-effort: it runs *after* the project is generated, never
 * blocks for more than {@link REQUEST_TIMEOUT_MS}, and swallows every failure —
 * an offline machine or a private registry must not affect the exit code.
 *
 * @returns {Promise<string|null>} the newer version, or null
 */
async function checkForUpdate(pkgName, currentVersion) {
  if (process.env.NO_UPDATE_NOTIFIER || process.env.CI) return null;

  const cached = readCache();
  const latest = cached ? cached.latest : await fetchLatest(pkgName);
  if (!latest) return null;
  if (!cached) writeCache(latest);

  return isNewer(latest, currentVersion) ? latest : null;
}

module.exports = { checkForUpdate, isNewer, CACHE_FILE };
