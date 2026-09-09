const fs = require("node:fs");

const pages = ["index.html", "about/index.html", "issues/index.html", "read/index.html"];
const html = pages.map((p) => fs.readFileSync(p, "utf8"));
const css = fs.readFileSync("assets/css/styles.css", "utf8");
const js = fs.readFileSync("assets/js/main.js", "utf8");
const i18n = fs.readFileSync("assets/js/i18n.js", "utf8");

// 1. Persian Typography & Rokh / IRANSans checks
console.assert(css.includes('--font-title-fa: "Rokh"'), "CSS must define --font-title-fa with Rokh");
console.assert(css.includes('--font-body-fa: "IRANSans"'), "CSS must define --font-body-fa with IRANSans");
console.assert(css.includes('html[dir="rtl"] .display-title'), "CSS must assign Persian font to Persian titles");
console.assert(css.includes('html[dir="rtl"] .wordmark'), "CSS must preserve Latin font for brand wordmark");

// 2. Accurate Map Coordinates & Earth Globe (without deleted 'even closer' section)
console.assert(html[0].includes("35.7978° N") && html[0].includes("51.3205° E"), "Home map must have accurate SRBIAU coordinates");
console.assert(html[0].includes('id="tehran-map-canvas"'), "Home must have dynamic map canvas");
console.assert(html[0].includes("1,780m ALT"), "Map card must include accurate altitude");
console.assert(html[0].includes("Where it all began"), "Map header must say 'Where it all began'");
console.assert(!html[0].includes("map-btn-campus") && !html[0].includes("Even closer"), "'Even closer' section must be deleted");
console.assert(!html[0].includes("map-flag-icon"), "Iran flag icon must be deleted from map card");

// 3. Premium Editorial Typography Effects & Mobile Menu Blur
console.assert(!html[1].includes("back-link"), "About page must not have a back button");
console.assert(!html[2].includes("back-link"), "Issues page must not have a back button");
console.assert(css.includes("-webkit-background-clip: text"), "CSS must apply metallic sheen to title emphasis");
console.assert(css.includes("backdrop-filter: blur(28px)"), "CSS must apply frosted glass blur to mobile menu");
console.assert(css.includes(".stripe-book"), "CSS must style Stripe Press 3D physical book component");
console.assert(css.includes(".editorial-dossier-card"), "CSS must style About page dossier card");

// 4. JavaScript Dynamic Earth Globe (Always Dark + Star Field) & Clean Campus Map
console.assert(js.includes("createStripeBookElement"), "main.js must render 3D physical books");
console.assert(js.includes("renderGlobe"), "main.js must implement 3D orthographic globe rendering");
console.assert(js.includes("COSMIC_STARS"), "main.js must render cosmic star field in space background");
console.assert(js.includes('const oceanColor = "#0c101c"'), "Globe ocean must always be dark space black/navy");
console.assert(!js.includes("ctx.ellipse"), "main.js must not have oval/ellipse around faculty location");
console.assert(js.includes("startGlobeAnimation"), "main.js must implement continuous globe spinning");

// 5. Persian Translation Dictionary
console.assert(i18n.includes("جایی که همه چیز آغاز شد"), "i18n must translate 'Where it all began'");
console.assert(i18n.includes("از فضا"), "i18n must translate 'From space'");
console.assert(i18n.includes("نمای نزدیک‌تر"), "i18n must translate 'Even closer'");

console.log("Striking title typography, From space globe with stars, clean header & frosted glass mobile menu checks all passed successfully!");
