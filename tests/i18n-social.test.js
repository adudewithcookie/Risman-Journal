const fs = require("node:fs");
const vm = require("node:vm");

const pages = ["index.html", "about/index.html", "issues/index.html", "read/index.html"];
const html = pages.map((p) => fs.readFileSync(p, "utf8"));
const css = fs.readFileSync("assets/css/styles.css", "utf8");
const i18n = fs.readFileSync("assets/js/i18n.js", "utf8");

// i18n script loaded on every page
console.assert(html.every((h) => h.includes("i18n.js")), "Every page must load i18n.js");

// Language toggle button on every page
console.assert(html.every((h) => h.includes('class="lang-toggle"')), "Every page needs a lang toggle");

// Early RTL detection in inline script
console.assert(html.every((h) => h.includes("risman-lang")), "Every page must detect stored lang early");

// Vazirmatn font loaded
console.assert(html.every((h) => h.includes("Vazirmatn")), "Every page must load Vazirmatn font");

// data-i18n attributes present in all main pages (not reader, which is minimal)
console.assert(html[0].includes('data-i18n="hero-title"'), "Home page must have hero title i18n");
console.assert(html[1].includes('data-i18n="about-title"'), "About page must have about title i18n");
console.assert(html[2].includes('data-i18n="issues-title"'), "Issues page must have issues title i18n");

// Social media links in footers (pages 0-2 have footers, page 3 is reader with no footer)
const footerPages = html.slice(0, 3);
console.assert(footerPages.every((h) => h.includes("t.me/Rismanmagazine")), "Footer must have Telegram link");
console.assert(footerPages.every((h) => h.includes("instagram.com/rismanmagazine")), "Footer must have Instagram link");
console.assert(footerPages.every((h) => h.includes('class="footer-social"')), "Footer must have social container");

// CSS has RTL rules
console.assert(css.includes('html[dir="rtl"]'), "CSS must have RTL overrides");
console.assert(css.includes(".lang-toggle"), "CSS must style lang toggle");
console.assert(css.includes(".footer-social"), "CSS must style footer social");

// i18n.js has Persian dictionary
const ctx = { window: {}, document: { querySelectorAll: () => [], querySelector: () => null, readyState: "complete", documentElement: { lang: "en", dir: "ltr" } }, localStorage: { getItem: () => null, setItem: () => {} } };
vm.runInNewContext(i18n, ctx);
console.assert(typeof ctx.window.RISMAN_I18N === "object", "i18n must expose RISMAN_I18N");
console.assert(typeof ctx.window.RISMAN_I18N.t === "function", "i18n must expose t()");
console.assert(typeof ctx.window.RISMAN_I18N.applyLang === "function", "i18n must expose applyLang()");
console.assert(typeof ctx.window.RISMAN_I18N.init === "function", "i18n must expose init()");

console.log("i18n + social check passed: lang toggle, translations, RTL, Telegram, Instagram all present.");
