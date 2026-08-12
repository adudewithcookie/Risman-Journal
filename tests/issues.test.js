const fs = require("node:fs");
const vm = require("node:vm");

const context = { window: {} };
vm.runInNewContext(fs.readFileSync("assets/js/issues-data.js", "utf8"), context);

const issues = context.window.RISMAN_ISSUES;
const numbers = issues.map(({ number }) => number);

console.assert(issues.length === 8, "Risman must contain exactly eight issues");
console.assert(new Set(numbers).size === 8, "Issue numbers must be unique");
console.assert(numbers.join(",") === "08,07,06,05,04,03,02,01", "Issues must be ordered newest first");
console.assert(issues.every(({ cover, pdf }) => cover && pdf), "Every issue needs cover and PDF paths");

console.log("Issue data check passed: 8 unique issues, newest first.");
