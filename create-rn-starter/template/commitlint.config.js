/**
 * Conventional Commits, enforced by the commit-msg hook.
 * Keeps `git log` readable and lets a changelog be generated from it.
 *   feat: …   fix: …   chore: …   docs: …   refactor: …   test: …
 */
module.exports = {extends: ['@commitlint/config-conventional']};
