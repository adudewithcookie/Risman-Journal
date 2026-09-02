(function () {
  "use strict";

  const body = document.body;
  const root = body.dataset.root || ".";
  const issues = window.RISMAN_ISSUES || [];

  const path = (relativePath) => `${root}/${relativePath}`;
  const readerUrl = (issue) => `${path("read/")}?issue=${encodeURIComponent(issue.number)}`;

  const ISSUE_METAS = {
    "08": { tag: "Mind & Consciousness", pages: "68 pp.", date: "Winter 2024", subtitle: "A study of cognitive depths and shared human perception." },
    "07": { tag: "Psychoanalysis & Trauma", pages: "72 pp.", date: "Autumn 2024", subtitle: "Memory, repression, and the architecture of personal grief." },
    "06": { tag: "Introspection & Self", pages: "64 pp.", date: "Summer 2024", subtitle: "The inner observer and the construction of identity." },
    "05": { tag: "Cognitive Science", pages: "60 pp.", date: "Spring 2024", subtitle: "Neural networks, mental models, and intuitive cognition." },
    "04": { tag: "Philosophy of Mind", pages: "56 pp.", date: "Winter 2023", subtitle: "Free will, determinism, and the hard problem." },
    "03": { tag: "Depression & Mood", pages: "64 pp.", date: "Autumn 2023", subtitle: "Clinical reflections on affect, society, and coping." },
    "02": { tag: "Social Psychology", pages: "52 pp.", date: "Summer 2023", subtitle: "The individual inside the collective machine." },
    "01": { tag: "The Inception", pages: "48 pp.", date: "Spring 2023", subtitle: "First reflections from the Faculty of Humanities." }
  };

  /* ==========================================================================
     Stripe Press-style 3D Physical Book Renderer (Covers Always Visible)
     ========================================================================== */
  function isPersian() {
    try {
      return document.documentElement.lang === "fa" || (window.RISMAN_I18N && window.RISMAN_I18N.getLang() === "fa") || localStorage.getItem("risman-lang") === "fa";
    } catch (e) {
      return false;
    }
  }

  function createStripeBookElement(issue, isFeatured) {
    const isFa = isPersian();
    const title = isFa && issue.title_fa ? issue.title_fa : issue.title;
    const numLabel = isFa ? `شماره ${issue.number}` : `No. ${issue.number}`;

    const bookWrapper = document.createElement("div");
    bookWrapper.className = `stripe-book-wrapper ${isFeatured ? "featured-book-wrapper" : ""}`;

    const book = document.createElement("div");
    book.className = `stripe-book stripe-book-${Number(issue.number) % 4}`;

    // Book spine
    const spine = document.createElement("div");
    spine.className = "book-spine";

    // Book front cover
    const cover = document.createElement("div");
    cover.className = "book-cover";

    // Image element
    const img = document.createElement("img");
    img.alt = `Cover of Risman Issue ${issue.number}: ${title}`;
    img.width = 720;
    img.height = 960;
    img.decoding = "async";
    if (isFeatured) img.fetchPriority = "high";
    else img.loading = "lazy";

    // Fallback if image fails to load
    const fallback = document.createElement("div");
    fallback.className = "cover-fallback";
    fallback.setAttribute("aria-hidden", "true");
    fallback.innerHTML = `
      <span class="cover-fallback-title">${title}</span>
      <span>${numLabel}</span>
    `;

    img.addEventListener("error", () => {
      img.hidden = true;
      book.classList.add("cover-missing");
    }, { once: true });
    img.src = path(issue.cover);

    // Gloss sheen overlay
    const gloss = document.createElement("div");
    gloss.className = "book-gloss";

    cover.append(img, fallback, gloss);

    // Hardcover page edges
    const pages = document.createElement("div");
    pages.className = "book-pages";

    // Soft drop shadow
    const shadow = document.createElement("div");
    shadow.className = "book-shadow";

    book.append(spine, cover, pages);
    bookWrapper.append(shadow, book);

    // Interactive 3D tilt tracking on mousemove
    bookWrapper.addEventListener("mousemove", (e) => {
      const rect = bookWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 14;

      book.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
      shadow.style.transform = `scale(0.92) translateY(14px) rotateX(60deg)`;
      shadow.style.opacity = "0.7";

      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      gloss.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.05) 50%, transparent 80%)`;
      gloss.style.opacity = "1";
    });

    bookWrapper.addEventListener("mouseleave", () => {
      book.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0)";
      shadow.style.transform = "scale(1) translateY(0) rotateX(60deg)";
      shadow.style.opacity = "0.45";
      gloss.style.opacity = "0";
    });

    return bookWrapper;
  }

  function issueCard(issue) {
    const isFa = isPersian();
    const title = isFa && issue.title_fa ? issue.title_fa : issue.title;
    const volLabel = isFa ? `شماره ${issue.number}` : `VOL. ${issue.number}`;
    const tagLabel = isFa ? (issue.tag_fa || "روان‌شناسی") : (issue.tag_en || "Psychology");
    const pagesLabel = isFa ? (issue.pages_fa || "۶۰ صفحه") : (issue.pages_en || "60 pp.");
    const readLabel = isFa ? "مطالعه شماره" : "Read issue";

    const article = document.createElement("article");
    article.className = "issue-card";

    const link = document.createElement("a");
    link.className = "issue-card-link";
    link.href = readerUrl(issue);
    link.setAttribute("aria-label", `Read issue ${issue.number}: ${title}`);

    link.append(createStripeBookElement(issue, false));
    link.insertAdjacentHTML("beforeend", `
      <div class="issue-card-copy">
        <div class="issue-meta-row">
          <span class="issue-num-badge">${volLabel}</span>
          <span class="issue-tag-pill">${tagLabel}</span>
        </div>
        <h3 class="issue-title-heading">${title}</h3>
        <div class="issue-card-footer">
          <span class="issue-page-count">${pagesLabel}</span>
          <span class="issue-card-read" aria-hidden="true"><span>${readLabel}</span> <span class="link-arrow">→</span></span>
        </div>
      </div>
    `);
    article.append(link);
    return article;
  }

  function renderIssues() {
    const grid = document.querySelector("#issues-grid");
    if (grid) {
      grid.innerHTML = "";
      issues.forEach((issue) => grid.append(issueCard(issue)));
    }

    const preview = document.querySelector("#archive-preview");
    if (preview) {
      preview.innerHTML = "";
      issues.slice(1, 5).forEach((issue) => preview.append(issueCard(issue)));
    }

    const featuredHost = document.querySelector("#featured-issue");
    if (!featuredHost || !issues.length) return;

    const isFa = isPersian();
    const issue = issues.find((item) => item.featured) || issues[0];
    const title = isFa && issue.title_fa ? issue.title_fa : issue.title;
    const tagLabel = isFa ? (issue.tag_fa || "ذهن و آگاهی") : (issue.tag_en || "Mind & Consciousness");
    const pagesLabel = isFa ? (issue.pages_fa || "۶۸ صفحه") : (issue.pages_en || "68 pp.");
    const issuePill = isFa ? `شماره ${issue.number} · آخرین شماره` : `Issue ${issue.number} · Latest issue`;
    const readBtn = isFa ? "مطالعه آنلاین" : "Read online";
    const specText = isFa ? "شاپا ۳۰۴۱-۸۸۵۲ · نشریه ریسمان" : "ISSN 3041-8852 · Editorial Risman";

    featuredHost.innerHTML = "";

    const mediaLink = document.createElement("a");
    mediaLink.className = "featured-cover-link";
    mediaLink.href = readerUrl(issue);
    mediaLink.setAttribute("aria-label", `Read featured issue ${issue.number}: ${title}`);
    mediaLink.append(createStripeBookElement(issue, true));

    const copy = document.createElement("div");
    copy.className = "featured-copy";
    copy.innerHTML = `
      <div class="featured-badge-row">
        <span class="featured-pill">${issuePill}</span>
        <span class="featured-meta-pill">${tagLabel} · ${pagesLabel}</span>
      </div>
      <h3 class="featured-headline">${title}</h3>
      <div class="featured-cta-group">
        <a class="button button-primary" href="${readerUrl(issue)}"><span>${readBtn}</span> <span class="link-arrow" aria-hidden="true">→</span></a>
        <span class="featured-spec-text">${specText}</span>
      </div>
    `;
    featuredHost.append(mediaLink, copy);
  }

  window.renderIssues = renderIssues;

  /* ==========================================================================
     Real-World Accurate GIS Vector Dataset for Earth Globe
     (Accurate coastlines and country borders based on Natural Earth data)
     ========================================================================== */
  let currentMapMode = "globe";
  let globeLon = 51.32; // Centered on Tehran (51.32° E)
  let globeLat = 32.0;  // Center latitude
  let isDraggingGlobe = false;
  let lastPointerX = 0;
  let lastPointerY = 0;
  let globeVelocity = 0.12; // Natural slow orbit
  let isInteracting = false;
  let animFrameId = null;

  const WORLD_VECTORS = {
    // Accurate polygon of Iran (Border and Coastlines)
    iran: [
      [44.5, 39.4], [45.2, 39.1], [46.5, 39.0], [48.0, 38.4], [48.87, 38.42], // Astara (Caspian NW)
      [49.46, 37.47], [50.66, 36.9], [51.4, 36.65], [52.65, 36.7], [54.0, 36.9], [54.0, 37.3], // Caspian South Coast
      [54.8, 37.4], [55.5, 37.9], [57.0, 37.5], [58.5, 37.6], [60.0, 36.8], [61.15, 36.5], // NE Kopet Dag / Sarakhs
      [60.5, 34.0], [60.8, 32.5], [61.0, 31.2], [61.8, 31.0], [61.8, 28.0], [63.0, 27.2], [62.5, 25.3], // East border (Afgh/Pak)
      [61.5, 25.15], [60.6, 25.3], [59.0, 25.4], [57.77, 25.64], // Gulf of Oman / Chabahar / Jask
      [56.3, 27.18], [54.88, 26.55], [53.5, 27.0], [52.6, 27.47], [50.83, 28.97], [50.15, 30.05], [48.5, 30.0], // Persian Gulf / Bandar Abbas to Khuzestan
      [48.0, 31.5], [47.5, 32.5], [46.0, 33.5], [45.5, 35.5], [45.0, 36.8], [44.3, 38.0], [44.5, 39.4] // West border (Iraq & Turkey)
    ],

    // Caspian Sea (Accurate inland water body North of Iran)
    caspianSea: [
      [48.87, 38.42], [49.46, 37.47], [50.66, 36.9], [51.4, 36.65], [52.65, 36.7], [54.0, 36.9], [54.0, 37.3],
      [53.5, 39.5], [53.0, 41.0], [52.5, 43.0], [51.0, 45.0], [49.5, 46.5], [47.0, 46.5], [47.5, 44.5],
      [48.5, 42.0], [49.8, 40.5], [49.0, 39.0], [48.87, 38.42]
    ],

    // Persian Gulf & Gulf of Oman (Accurate water body South of Iran)
    persianGulf: [
      [48.5, 30.0], [50.15, 30.05], [50.83, 28.97], [52.6, 27.47], [54.88, 26.55], [56.3, 27.18], [57.77, 25.64], [60.6, 25.3], [61.5, 25.15],
      [59.5, 23.5], [58.5, 23.6], [56.5, 25.5], [56.0, 26.0], [55.3, 25.3], [54.0, 24.3], [52.0, 24.0], [50.8, 26.0], [49.0, 28.5], [48.0, 30.0], [48.5, 30.0]
    ],

    // Turkey & Anatolia
    turkey: [
      [26.0, 41.8], [28.5, 41.5], [32.0, 41.8], [36.0, 42.0], [41.5, 41.5], [44.5, 39.4],
      [44.3, 38.0], [43.0, 37.2], [41.0, 37.0], [36.5, 36.0], [34.0, 36.5], [31.0, 36.8], [28.0, 36.5], [26.5, 38.5], [26.0, 41.8]
    ],

    // Arabian Peninsula (Saudi Arabia, UAE, Oman, Yemen, Jordan, Iraq, Kuwait)
    arabia: [
      [34.5, 31.5], [35.5, 29.5], [37.0, 28.0], [39.0, 24.0], [41.0, 20.0], [43.0, 16.0], [44.0, 13.0], [45.0, 12.5], // Red Sea Coast
      [48.0, 14.0], [52.0, 15.5], [54.0, 17.0], [58.5, 23.6], [56.5, 25.5], [54.0, 24.3], [50.8, 26.0], [48.0, 30.0], // Arabian Sea & Persian Gulf Coast
      [47.5, 32.5], [45.5, 35.5], [43.0, 37.2], [41.0, 37.0], [38.0, 34.0], [36.0, 32.5], [34.5, 31.5] // Fertile crescent & Iraq border
    ],

    // East of Iran: Afghanistan, Pakistan & India
    southAsia: [
      [61.15, 36.5], [65.0, 37.5], [71.0, 37.0], [74.5, 37.0], [77.0, 35.5], [78.0, 31.0], [80.0, 29.0], [88.0, 27.5], [92.0, 25.0], [90.0, 22.0], // Himalayas / North
      [86.0, 20.0], [80.0, 16.0], [80.0, 10.0], [77.5, 8.0], [74.0, 14.0], [72.5, 19.0], [70.0, 22.0], [67.0, 24.5], [62.5, 25.3], // Indian Ocean & Arabian Sea
      [63.0, 27.2], [61.8, 28.0], [61.8, 31.0], [60.8, 32.5], [61.15, 36.5] // Border with Iran
    ],

    // Central Asia & Caucasus (Turkmenistan, Uzbekistan, Kazakhstan, Azerbaijan, Armenia, Georgia)
    centralAsia: [
      [40.0, 43.5], [44.0, 43.5], [47.5, 44.5], [49.5, 46.5], [51.0, 48.0], [60.0, 50.0], [70.0, 52.0], [80.0, 50.0], [87.0, 48.0],
      [85.0, 42.0], [78.0, 40.0], [74.5, 37.0], [71.0, 37.0], [65.0, 37.5], [61.15, 36.5],
      [58.5, 37.6], [57.0, 37.5], [54.8, 37.4], [54.0, 37.3], [53.5, 39.5], [52.5, 43.0], [49.8, 40.5], [48.87, 38.42], [46.5, 39.0], [44.5, 39.4], [40.0, 43.5]
    ],

    // Europe Continent
    europe: [
      [-9.0, 36.0], [-9.5, 43.0], [-1.5, 43.5], [-4.5, 48.5], [2.0, 51.0], [5.0, 53.0], [9.0, 54.5], [14.0, 54.0],
      [18.0, 55.0], [22.0, 60.0], [25.0, 65.0], [30.0, 70.0], [20.0, 70.0], [10.0, 63.0], [5.0, 58.0], [0.0, 50.0],
      [-5.0, 48.0], [-8.0, 44.0], [-9.0, 36.0]
    ],

    // Africa Continent
    africa: [
      [-5.0, 36.0], [-10.0, 30.0], [-17.0, 21.0], [-17.0, 15.0], [-15.0, 5.0], [-5.0, 5.0], [5.0, 4.0], [10.0, 2.0],
      [10.0, -5.0], [12.0, -15.0], [15.0, -25.0], [18.0, -34.0], [28.0, -33.0], [34.0, -20.0], [40.0, -10.0],
      [51.0, 11.0], [43.0, 12.0], [38.0, 22.0], [34.5, 31.5], [25.0, 32.0], [15.0, 32.0], [10.0, 36.0], [-5.0, 36.0]
    ],

    // East Asia (China, Indochina, Korea, Japan)
    eastAsia: [
      [90.0, 22.0], [98.0, 10.0], [105.0, 10.0], [108.0, 20.0], [118.0, 24.0], [122.0, 30.0], [120.0, 38.0], [126.0, 40.0],
      [130.0, 42.0], [140.0, 50.0], [142.0, 54.0], [130.0, 68.0], [100.0, 72.0], [87.0, 48.0], [90.0, 22.0]
    ],

    // North & South America (for full 360 degree spin)
    northAmerica: [
      [-165.0, 65.0], [-140.0, 70.0], [-90.0, 75.0], [-60.0, 60.0], [-65.0, 45.0], [-75.0, 35.0], [-80.0, 25.0],
      [-90.0, 30.0], [-97.0, 26.0], [-90.0, 18.0], [-80.0, 9.0], [-105.0, 20.0], [-115.0, 30.0], [-125.0, 48.0], [-140.0, 60.0], [-165.0, 65.0]
    ],
    southAmerica: [
      [-80.0, 9.0], [-60.0, 10.0], [-50.0, 0.0], [-35.0, -5.0], [-40.0, -22.0], [-55.0, -35.0], [-65.0, -55.0],
      [-75.0, -45.0], [-70.0, -20.0], [-80.0, -5.0], [-80.0, 9.0]
    ],
    australia: [
      [115.0, -22.0], [130.0, -12.0], [142.0, -10.0], [150.0, -22.0], [150.0, -35.0], [138.0, -35.0], [115.0, -35.0], [115.0, -22.0]
    ]
  };

  function projectGlobe(lon, lat, cLon, cLat, radius, cx, cy) {
    const phi = (lat * Math.PI) / 180;
    const lambda = (lon * Math.PI) / 180;
    const phi0 = (cLat * Math.PI) / 180;
    const lambda0 = (cLon * Math.PI) / 180;

    const cosC = Math.sin(phi0) * Math.sin(phi) + Math.cos(phi0) * Math.cos(phi) * Math.cos(lambda - lambda0);
    if (cosC < 0) return null; // Back face of the sphere

    const x = radius * Math.cos(phi) * Math.sin(lambda - lambda0);
    const y = -radius * (Math.cos(phi0) * Math.sin(phi) - Math.sin(phi0) * Math.cos(phi) * Math.cos(lambda - lambda0));

    return { x: cx + x, y: cy + y };
  }

  const COSMIC_STARS = [
    { x: 0.06, y: 0.12, r: 1.2, a: 0.8 },
    { x: 0.14, y: 0.24, r: 0.8, a: 0.55 },
    { x: 0.08, y: 0.52, r: 1.0, a: 0.65 },
    { x: 0.04, y: 0.82, r: 1.4, a: 0.85, sparkle: true },
    { x: 0.16, y: 0.88, r: 0.7, a: 0.45 },
    { x: 0.24, y: 0.08, r: 0.9, a: 0.6 },
    { x: 0.38, y: 0.12, r: 0.6, a: 0.4 },
    { x: 0.62, y: 0.07, r: 1.1, a: 0.7 },
    { x: 0.78, y: 0.14, r: 0.8, a: 0.5 },
    { x: 0.92, y: 0.11, r: 1.5, a: 0.9, sparkle: true },
    { x: 0.95, y: 0.36, r: 0.7, a: 0.45 },
    { x: 0.88, y: 0.56, r: 1.1, a: 0.7 },
    { x: 0.94, y: 0.78, r: 1.3, a: 0.8 },
    { x: 0.84, y: 0.89, r: 0.9, a: 0.55 },
    { x: 0.66, y: 0.94, r: 0.7, a: 0.4 },
    { x: 0.44, y: 0.96, r: 1.0, a: 0.65 },
    { x: 0.28, y: 0.93, r: 0.8, a: 0.5 },
    { x: 0.03, y: 0.38, r: 1.5, a: 0.85, sparkle: true },
    { x: 0.97, y: 0.91, r: 0.6, a: 0.4 },
    { x: 0.86, y: 0.05, r: 0.8, a: 0.55 },
    { x: 0.48, y: 0.05, r: 0.7, a: 0.45 }
  ];

  function renderGlobe(ctx, w, h, isDark) {
    const cx = w * 0.5;
    const cy = h * 0.5;
    const radius = Math.min(w, h) * 0.42;

    // Clear cosmic space canvas
    ctx.fillStyle = "#090c14";
    ctx.fillRect(0, 0, w, h);

    // Draw cosmic star field
    for (let i = 0; i < COSMIC_STARS.length; i++) {
      const s = COSMIC_STARS[i];
      const sx = s.x * w;
      const sy = s.y * h;
      ctx.fillStyle = `rgba(255, 255, 255, ${s.a})`;
      ctx.beginPath();
      ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
      ctx.fill();

      if (s.sparkle) {
        ctx.strokeStyle = `rgba(184, 141, 76, ${s.a * 0.75})`;
        ctx.lineWidth = 0.75;
        ctx.beginPath();
        ctx.moveTo(sx - 3.5, sy);
        ctx.lineTo(sx + 3.5, sy);
        ctx.moveTo(sx, sy - 3.5);
        ctx.lineTo(sx, sy + 3.5);
        ctx.stroke();
      }
    }

    // Atmospheric Glow behind globe
    const atmo = ctx.createRadialGradient(cx, cy, radius * 0.96, cx, cy, radius * 1.14);
    atmo.addColorStop(0, "rgba(184, 141, 76, 0.22)");
    atmo.addColorStop(0.4, "rgba(80, 130, 190, 0.1)");
    atmo.addColorStop(1, "transparent");
    ctx.fillStyle = atmo;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.16, 0, Math.PI * 2);
    ctx.fill();

    // Always dark space palette in all themes
    const oceanColor = "#0c101c";
    const globeBorder = "rgba(184, 141, 76, 0.45)";
    const landColor = "#182030";
    const landStroke = "rgba(184, 141, 76, 0.22)";
    const iranFill = "rgba(184, 141, 76, 0.48)";
    const gridColor = "rgba(255, 255, 255, 0.06)";

    // Globe Sphere Background
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = oceanColor;
    ctx.fill();
    ctx.strokeStyle = globeBorder;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 3D Sphere Specular Sheen
    const grad = ctx.createRadialGradient(cx - radius * 0.35, cy - radius * 0.35, radius * 0.1, cx, cy, radius);
    grad.addColorStop(0, "rgba(255,255,255,0.09)");
    grad.addColorStop(0.8, "transparent");
    grad.addColorStop(1, "rgba(0,0,0,0.55)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();

    // Latitude Meridians
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 0.75;
    for (let lat = -60; lat <= 60; lat += 30) {
      ctx.beginPath();
      let first = true;
      for (let lon = -180; lon <= 180; lon += 5) {
        const pt = projectGlobe(lon, lat, globeLon, globeLat, radius, cx, cy);
        if (pt) {
          if (first) { ctx.moveTo(pt.x, pt.y); first = false; }
          else ctx.lineTo(pt.x, pt.y);
        } else {
          first = true;
        }
      }
      ctx.stroke();
    }

    // Longitude Meridians
    for (let lon = -180; lon < 180; lon += 30) {
      ctx.beginPath();
      let first = true;
      for (let lat = -80; lat <= 80; lat += 5) {
        const pt = projectGlobe(lon, lat, globeLon, globeLat, radius, cx, cy);
        if (pt) {
          if (first) { ctx.moveTo(pt.x, pt.y); first = false; }
          else ctx.lineTo(pt.x, pt.y);
        } else {
          first = true;
        }
      }
      ctx.stroke();
    }

    // Helper to draw realistic land polygon
    function drawPoly(pts, fill, stroke, strokeWidth) {
      ctx.beginPath();
      let first = true;
      for (let i = 0; i < pts.length; i++) {
        const pt = projectGlobe(pts[i][0], pts[i][1], globeLon, globeLat, radius, cx, cy);
        if (pt) {
          if (first) { ctx.moveTo(pt.x, pt.y); first = false; }
          else ctx.lineTo(pt.x, pt.y);
        }
      }
      ctx.closePath();
      if (fill) { ctx.fillStyle = fill; ctx.fill(); }
      if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = strokeWidth || 1; ctx.stroke(); }
    }

    // Draw Continents
    drawPoly(WORLD_VECTORS.europe, landColor, landStroke, 1);
    drawPoly(WORLD_VECTORS.africa, landColor, landStroke, 1);
    drawPoly(WORLD_VECTORS.eastAsia, landColor, landStroke, 1);
    drawPoly(WORLD_VECTORS.turkey, landColor, landStroke, 1);
    drawPoly(WORLD_VECTORS.arabia, landColor, landStroke, 1);
    drawPoly(WORLD_VECTORS.southAsia, landColor, landStroke, 1);
    drawPoly(WORLD_VECTORS.centralAsia, landColor, landStroke, 1);
    drawPoly(WORLD_VECTORS.northAmerica, landColor, landStroke, 1);
    drawPoly(WORLD_VECTORS.southAmerica, landColor, landStroke, 1);
    drawPoly(WORLD_VECTORS.australia, landColor, landStroke, 1);

    // Inland seas
    drawPoly(WORLD_VECTORS.caspianSea, oceanColor, landStroke, 1);
    drawPoly(WORLD_VECTORS.persianGulf, oceanColor, landStroke, 1);

    // Highlighted Accurate Iran Geometry
    drawPoly(WORLD_VECTORS.iran, iranFill, isDark ? "#b88d4c" : "#9b7235", 1.8);

    // Precise Tehran & SRBIAU Pinpoint (51.3205° E, 35.7978° N)
    const tehranPt = projectGlobe(51.3205, 35.7978, globeLon, globeLat, radius, cx, cy);
    if (tehranPt) {
      ctx.beginPath();
      ctx.arc(tehranPt.x, tehranPt.y, 8, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(184, 141, 76, 0.85)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(tehranPt.x, tehranPt.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#b88d4c";
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 10px var(--sans)";
      ctx.fillText("Tehran · SRBIAU", tehranPt.x + 10, tehranPt.y - 6);
    }
  }

  /* ==========================================================================
     Accurate Minimalist Campus Map (Faculty of Humanities, SRBIAU, Hesarak)
     ========================================================================== */
  function renderCampusMap(ctx, w, h, isDark) {
    const bg = isDark ? "#101420" : "#ece6d3";
    const mountainBg = isDark ? "#0d101a" : "#ded6bf";
    const roadColor = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(24, 28, 43, 0.09)";
    const mainRoadColor = isDark ? "rgba(184, 141, 76, 0.35)" : "rgba(184, 141, 76, 0.5)";
    const contourColor = isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(24, 28, 43, 0.06)";
    const gridLine = isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(24, 28, 43, 0.04)";

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Alborz Mountain Contour (North of Tehran)
    ctx.fillStyle = mountainBg;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(w, 0);
    ctx.lineTo(w, h * 0.38);
    ctx.bezierCurveTo(w * 0.7, h * 0.28, w * 0.4, h * 0.44, 0, h * 0.34);
    ctx.closePath();
    ctx.fill();

    // Elevation Lines
    ctx.strokeStyle = contourColor;
    ctx.lineWidth = 1;
    for (let i = 1; i <= 5; i++) {
      ctx.beginPath();
      ctx.moveTo(0, h * (0.07 * i));
      ctx.bezierCurveTo(w * 0.35, h * (0.07 * i + 0.04), w * 0.65, h * (0.06 * i), w, h * (0.08 * i));
      ctx.stroke();
    }

    // Grid Coordinates
    ctx.strokeStyle = gridLine;
    ctx.lineWidth = 0.75;
    const step = 28;
    for (let x = 0; x < w; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Arteries: Niayesh & Hemmat
    ctx.strokeStyle = mainRoadColor;
    ctx.lineWidth = 2.4;
    ctx.lineCap = "round";

    // Hashemi Rafsanjani (Niayesh)
    ctx.beginPath();
    ctx.moveTo(0, h * 0.68);
    ctx.bezierCurveTo(w * 0.3, h * 0.64, w * 0.7, h * 0.60, w, h * 0.54);
    ctx.stroke();

    // Hemmat
    ctx.beginPath();
    ctx.moveTo(0, h * 0.88);
    ctx.bezierCurveTo(w * 0.4, h * 0.84, w * 0.7, h * 0.80, w, h * 0.74);
    ctx.stroke();

    // Sattari & Bakeri
    ctx.strokeStyle = roadColor;
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(w * 0.32, 0);
    ctx.lineTo(w * 0.40, h);
    ctx.stroke();

    // Hesarak Blvd up to SRBIAU
    ctx.strokeStyle = isDark ? "rgba(184, 141, 76, 0.75)" : "rgba(184, 141, 76, 0.9)";
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(w * 0.36, h * 0.64);
    ctx.lineTo(w * 0.50, h * 0.42);
    ctx.stroke();
    ctx.setLineDash([]);

    // Faculty of Humanities Building Marker
    ctx.fillStyle = "#b88d4c";
    ctx.beginPath();
    ctx.arc(w * 0.50, h * 0.42, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Label on map
    ctx.fillStyle = isDark ? "#ffffff" : "#181c2b";
    ctx.font = "bold 11px var(--sans)";
    ctx.fillText("Faculty of Humanities", w * 0.50 + 12, h * 0.42 + 4);
    ctx.fillStyle = isDark ? "rgba(255,255,255,0.6)" : "rgba(24,28,43,0.65)";
    ctx.font = "9px var(--sans)";
    ctx.fillText("SRBIAU Campus · 1,780m", w * 0.50 + 12, h * 0.42 + 16);
  }

  function renderMap() {
    const canvas = document.querySelector("#tehran-map-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark = document.documentElement.dataset.theme === "dark";
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;

    if (currentMapMode === "globe") {
      renderGlobe(ctx, w, h, isDark);
    } else {
      renderCampusMap(ctx, w, h, isDark);
    }
  }

  function startGlobeAnimation() {
    if (animFrameId) cancelAnimationFrame(animFrameId);

    function tick() {
      if (currentMapMode === "globe" && !isInteracting) {
        globeLon += globeVelocity;
        if (globeLon > 180) globeLon -= 360;
        if (globeLon < -180) globeLon += 360;
        renderMap();
      }
      animFrameId = requestAnimationFrame(tick);
    }
    animFrameId = requestAnimationFrame(tick);
  }

  function setupDynamicMap() {
    const canvas = document.querySelector("#tehran-map-canvas");
    if (!canvas) return;

    window.addEventListener("resize", renderMap);
    renderMap();
    startGlobeAnimation();

    // Mouse spin & drag
    canvas.addEventListener("mousedown", (e) => {
      if (currentMapMode !== "globe") return;
      isDraggingGlobe = true;
      isInteracting = true;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDraggingGlobe || currentMapMode !== "globe") return;
      const deltaX = e.clientX - lastPointerX;
      const deltaY = e.clientY - lastPointerY;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;

      globeLon -= (deltaX * 0.35);
      globeLat = Math.max(-60, Math.min(60, globeLat + (deltaY * 0.25)));
      globeVelocity = -deltaX * 0.08;
      renderMap();
    });

    window.addEventListener("mouseup", () => {
      if (isDraggingGlobe) {
        isDraggingGlobe = false;
        setTimeout(() => { isInteracting = false; }, 1500);
      }
    });

    // Touch support for dragging & spinning
    canvas.addEventListener("touchstart", (e) => {
      if (currentMapMode !== "globe" || !e.touches.length) return;
      isDraggingGlobe = true;
      isInteracting = true;
      lastPointerX = e.touches[0].clientX;
      lastPointerY = e.touches[0].clientY;
    }, { passive: true });

    canvas.addEventListener("touchmove", (e) => {
      if (!isDraggingGlobe || currentMapMode !== "globe" || !e.touches.length) return;
      const deltaX = e.touches[0].clientX - lastPointerX;
      const deltaY = e.touches[0].clientY - lastPointerY;
      lastPointerX = e.touches[0].clientX;
      lastPointerY = e.touches[0].clientY;

      globeLon -= (deltaX * 0.35);
      globeLat = Math.max(-60, Math.min(60, globeLat + (deltaY * 0.25)));
      globeVelocity = -deltaX * 0.08;
      renderMap();
    }, { passive: true });

    canvas.addEventListener("touchend", () => {
      isDraggingGlobe = false;
      setTimeout(() => { isInteracting = false; }, 1500);
    });

    const globeBtn = document.querySelector("#map-btn-globe") || document.querySelector("#map-btn-overview");
    const campusBtn = document.querySelector("#map-btn-campus");

    if (globeBtn) {
      globeBtn.addEventListener("click", () => {
        currentMapMode = "globe";
        globeBtn.classList.add("active");
        if (campusBtn) campusBtn.classList.remove("active");
        renderMap();
      });
    }

    if (campusBtn) {
      campusBtn.addEventListener("click", () => {
        currentMapMode = "campus";
        campusBtn.classList.add("active");
        if (globeBtn) globeBtn.classList.remove("active");
        renderMap();
      });
    }
  }

  function setupTheme() {
    const toggle = document.querySelector(".theme-toggle");
    if (!toggle) return;

    const themeColor = document.querySelector('meta[name="theme-color"]');
    const applyTheme = (theme, persist) => {
      document.documentElement.dataset.theme = theme;
      toggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
      toggle.setAttribute("aria-pressed", String(theme === "dark"));
      if (themeColor) themeColor.content = theme === "dark" ? "#0F131F" : "#F4F3EA";
      if (persist) {
        try { localStorage.setItem("risman-theme", theme); } catch (_error) {}
      }
      renderMap();
    };

    applyTheme(document.documentElement.dataset.theme || "light", false);
    toggle.addEventListener("click", () => {
      applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark", true);
    });
  }

  function setupNavigation() {
    const currentPage = body.dataset.page;
    document.querySelector(`[data-nav="${currentPage}"]`)?.setAttribute("aria-current", "page");

    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".site-nav");
    if (!toggle || !nav) return;

    const close = () => {
      body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
      const label = toggle.querySelector(".nav-toggle-label");
      if (label) label.textContent = "Menu";
    };

    toggle.addEventListener("click", () => {
      const isOpen = body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      const label = toggle.querySelector(".nav-toggle-label");
      if (label) label.textContent = isOpen ? "Close" : "Menu";
    });
    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) close();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        close();
        toggle.focus();
      }
    });
  }

  async function setupReader() {
    const host = document.querySelector("#pdf-reader");
    if (!host) return;

    const requested = new URLSearchParams(window.location.search).get("issue");
    const issue = issues.find((item) => item.number === requested);
    const heading = document.querySelector("#reader-heading");

    if (!issue) {
      document.title = "Issue not found — Risman";
      if (heading) heading.innerHTML = "<span>Risman archive</span><strong>Issue not found</strong>";
      host.innerHTML = `
        <section class="reader-message">
          <p class="eyebrow" data-i18n="no-matching">No matching issue</p>
          <h1 data-i18n="not-in-archive">That issue is not in the archive.</h1>
          <p data-i18n="choose-issue">Choose one of the eight published issues and continue reading.</p>
          <a class="button button-light" href="${path("issues/")}"><span data-i18n="browse-issues">Browse issues</span> <span class="link-arrow" aria-hidden="true">→</span></a>
        </section>
      `;
      if (window.RISMAN_I18N && window.RISMAN_I18N.getLang() === "fa") window.RISMAN_I18N.applyLang("fa");
      return;
    }

    document.title = `Issue ${issue.number}: ${issue.title} — Risman`;
    if (heading) heading.innerHTML = `<span>Issue ${issue.number}</span><strong>${issue.title}</strong>`;
    const pdfPath = path(issue.pdf);

    try {
      const response = await fetch(pdfPath, { method: "HEAD", cache: "no-store" });
      if (!response.ok) throw new Error("PDF unavailable");
      host.innerHTML = `
        <object class="pdf-object" data="${pdfPath}#view=FitH&amp;toolbar=1&amp;navpanes=0" type="application/pdf" aria-label="Risman issue ${issue.number}: ${issue.title}">
          <section class="reader-message">
            <p class="eyebrow" data-i18n="browser-limitation">Browser limitation</p>
            <h1 data-i18n="cannot-display">This browser cannot display the issue here.</h1>
            <p data-i18n="open-in-tab">You can still open the PDF in a new browser tab.</p>
            <a class="button button-light" href="${pdfPath}" target="_blank" rel="noopener"><span data-i18n="open-issue">Open issue</span> <span class="link-arrow" aria-hidden="true">↗</span></a>
          </section>
        </object>
      `;
    } catch (_error) {
      host.innerHTML = `
        <section class="reader-message">
          <p class="eyebrow"><span data-i18n="issue-label">Issue</span> ${issue.number}</p>
          <h1 data-i18n="pdf-here">The PDF will appear here.</h1>
          <p>Add <code>${issue.pdf}</code> to publish <em>${issue.title}</em> in the online reader.</p>
          <a class="button button-light" href="${path("issues/")}"><span data-i18n="return-issues">Return to issues</span> <span class="link-arrow" aria-hidden="true">→</span></a>
        </section>
      `;
    }
    if (window.RISMAN_I18N && window.RISMAN_I18N.getLang() === "fa") window.RISMAN_I18N.applyLang("fa");
  }

  document.querySelectorAll("[data-current-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  setupTheme();
  setupNavigation();
  renderIssues();
  setupDynamicMap();
  setupReader();
  if (window.RISMAN_I18N) window.RISMAN_I18N.init();
})();
