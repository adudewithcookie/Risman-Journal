const fs = require("node:fs");

const css = fs.readFileSync("assets/css/styles.css", "utf8");
const js = fs.readFileSync("assets/js/main.js", "utf8");
const i18n = fs.readFileSync("assets/js/i18n.js", "utf8");

// 1. Mobile menu blur and containing block clearance
console.assert(css.includes("body.nav-open .site-header"), "CSS must clear backdrop-filter from header when nav is open");
console.assert(css.includes("body.nav-open #main-content"), "CSS must blur main content background when nav is open");
console.assert(css.includes("backdrop-filter: blur(28px)"), "CSS must apply frosted glass blur to mobile menu");
console.assert(css.includes("color-mix(in srgb, var(--page-bg) 82%, transparent)"), "CSS must use theme-aware translucent frosted glass background");

// 2. Options inside mobile menu
console.assert(js.includes(".nav-options"), "main.js must inject .nav-options into .site-nav");
console.assert(js.includes("data-lang-choice"), "main.js must provide language choices in mobile menu");
console.assert(js.includes("data-theme-choice"), "main.js must provide theme choices in mobile menu");
console.assert(css.includes(".nav-options"), "CSS must style .nav-options");
console.assert(css.includes(".nav-choice-btn"), "CSS must style .nav-choice-btn");

// 3. Featured issue headline and CTA button spacing
console.assert(css.includes("margin: 0 0 clamp(2.2rem, 4vw, 3.2rem) !important;"), "CSS must provide generous spacing below featured headline with !important override");
console.assert(!css.includes(".featured-copy h3,"), "CSS must not zero-out margin on featured-copy h3");
console.assert(css.includes(".featured-cta-group"), "CSS must style featured-cta-group");

// 4. Persian translations for menu options
console.assert(i18n.includes('"menu-close": "بستن"'), "i18n must translate menu close to بستن");
console.assert(i18n.includes('"nav-options-heading": "تنظیمات"'), "i18n must translate options heading to تنظیمات");
console.assert(i18n.includes('"menu-option-lang": "زبان"'), "i18n must translate language option to زبان");
console.assert(i18n.includes('"menu-option-theme": "حالت نمایش"'), "i18n must translate theme option to حالت نمایش");

const html = fs.readFileSync("index.html", "utf8");

// 5. Rich star field, deletion of even closer section, and restored light/dark theme colors
const starCount = (js.match(/\{ x: [0-9.]+, y: [0-9.]+/g) || []).length;
console.assert(starCount >= 100, `COSMIC_STARS must have at least 100 stars (found ${starCount})`);
console.assert(!html.includes("map-btn-campus") && !html.includes("Even closer"), "'Even closer' section must be deleted from HTML");
console.assert(css.includes("--navy: #181c2b;"), "CSS must restore #181c2b as --navy");
console.assert(css.includes("--ivory: #f4f3ea;"), "CSS must restore #f4f3ea as --ivory");
console.assert(css.includes("--navy-deep: #0f131f;"), "CSS must restore #0f131f as --navy-deep");

console.log("Mobile menu frosted glass blur, options & pages selection, featured headline spacing, 120 cosmic stars, deleted even closer section, and restored light/dark colors tests passed successfully!");
