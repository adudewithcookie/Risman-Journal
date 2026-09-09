const fs = require("node:fs");

const pages = ["index.html", "about/index.html", "issues/index.html", "read/index.html"];
const html = pages.map((page) => fs.readFileSync(page, "utf8"));
const css = fs.readFileSync("assets/css/styles.css", "utf8");
const js = fs.readFileSync("assets/js/main.js", "utf8");

console.assert(html.every((page) => page.includes('class="theme-toggle"')), "Every page needs a theme control");
console.assert(html.every((page) => page.includes("risman-mark.png")), "Every page needs the journal mark");
console.assert(css.includes('html[data-theme="dark"]'), "Dark theme tokens are missing");
console.assert(js.includes('localStorage.setItem("risman-theme", theme)'), "Theme choice is not persisted");
console.assert(html[0].includes("Where it all began") && html[0].includes('class="origin-globe"'), "Home origin globe is missing");
console.assert(html.every((page) => page.includes('rel="icon"') && page.includes("risman-mark.png")), "Every page must have risman-mark favicon");
console.assert(html.every((page) => !page.toLowerCase().includes("independent")), "No page should describe the journal as independent");
console.assert(html.every((page) => !page.includes("Psychology · Mind · Society")), "Tagline 'Psychology · Mind · Society' must be removed");
console.assert(html[1].includes("Nov 11, 2023"), "About page must have Nov 11, 2023 foundation date");

console.log("Site feature check passed: theme, mark, origin globe, favicon, and brand tone verified.");
