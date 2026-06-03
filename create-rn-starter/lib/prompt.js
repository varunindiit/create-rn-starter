"use strict";

const readline = require("readline");
const { c } = require("./utils");

/**
 * Minimal zero-dependency prompt helpers built on Node's readline.
 * Each returns a Promise; the shared interface is created lazily and closed
 * by the caller via `close()`.
 */
function createPrompter() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (q) => new Promise((resolve) => rl.question(q, resolve));

  /**
   * Ask for free text.
   * @param {string} message
   * @param {object} [opts] { defaultValue, validate(value) => true | string }
   */
  async function ask(message, opts = {}) {
    const { defaultValue, validate } = opts;
    const hint = defaultValue ? c.dim(` (${defaultValue})`) : "";
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const raw = (await question(`${c.cyan("?")} ${message}${hint}: `)).trim();
      const value = raw || defaultValue || "";
      if (!value) {
        console.log(c.red("  Please enter a value."));
        continue;
      }
      if (validate) {
        const result = validate(value);
        if (result !== true) {
          console.log(c.red(`  ${result}`));
          continue;
        }
      }
      return value;
    }
  }

  /** Yes/no confirmation. */
  async function confirm(message, defaultYes = true) {
    const hint = defaultYes ? c.dim(" (Y/n)") : c.dim(" (y/N)");
    const raw = (await question(`${c.cyan("?")} ${message}${hint}: `))
      .trim()
      .toLowerCase();
    if (!raw) return defaultYes;
    return raw === "y" || raw === "yes";
  }

  function close() {
    rl.close();
  }

  return { ask, confirm, close };
}

module.exports = { createPrompter };
