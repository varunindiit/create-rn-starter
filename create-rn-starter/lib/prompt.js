"use strict";

const readline = require("readline");
const { c } = require("./utils");

/**
 * Minimal zero-dependency prompt helpers built on Node's readline.
 * Each returns a Promise; the shared interface is created lazily and closed
 * by the caller via `close()`.
 *
 * When stdin is not a TTY — CI, a piped invocation, `< /dev/null` — there is
 * nobody to answer, so every prompt resolves to its default instead of
 * blocking forever or throwing on EOF. Callers that need a value with no
 * default should validate afterwards.
 */
function createPrompter({ interactive = process.stdin.isTTY } = {}) {
  let rl = null;
  const ensure = () => {
    if (!rl) {
      rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
    }
    return rl;
  };

  const question = (q) =>
    new Promise((resolve) => ensure().question(q, (answer) => resolve(answer)));

  /**
   * Ask for free text.
   * @param {string} message
   * @param {object} [opts] { defaultValue, validate(value) => true | string }
   */
  async function ask(message, opts = {}) {
    const { defaultValue, validate } = opts;
    if (!interactive) return defaultValue || "";

    const hint = defaultValue ? c.dim(` (${defaultValue})`) : "";
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const answer = await question(`${c.cyan("?")} ${message}${hint}: `);
      const raw = String(answer == null ? "" : answer).trim();
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

  /**
   * Pick one of a fixed set of options by number or exact value.
   * @param {string} message
   * @param {{ options: Array<{value: string, label: string}>, defaultValue: string }} opts
   */
  async function choose(message, { options, defaultValue }) {
    if (!interactive) return defaultValue;

    console.log(`${c.cyan("?")} ${message}:`);
    options.forEach((opt, i) => {
      const marker = opt.value === defaultValue ? c.cyan("›") : " ";
      console.log(`  ${marker} ${c.bold(String(i + 1))}. ${opt.label}`);
    });

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const answer = await question(`  ${c.dim(`(${defaultValue})`)} `);
      const raw = String(answer == null ? "" : answer).trim();
      if (!raw) return defaultValue;

      const byIndex = Number(raw);
      if (Number.isInteger(byIndex) && byIndex >= 1 && byIndex <= options.length) {
        return options[byIndex - 1].value;
      }
      const match = options.find((o) => o.value === raw.toLowerCase());
      if (match) return match.value;

      console.log(c.red(`  Enter 1-${options.length} or a preset name.`));
    }
  }

  /** Yes/no confirmation. */
  async function confirm(message, defaultYes = true) {
    if (!interactive) return defaultYes;

    const hint = defaultYes ? c.dim(" (Y/n)") : c.dim(" (y/N)");
    const answer = await question(`${c.cyan("?")} ${message}${hint}: `);
    const raw = String(answer == null ? "" : answer)
      .trim()
      .toLowerCase();
    if (!raw) return defaultYes;
    return raw === "y" || raw === "yes";
  }

  function close() {
    if (rl) {
      rl.close();
      rl = null;
    }
  }

  return { ask, choose, confirm, close, interactive };
}

module.exports = { createPrompter };
