(function () {
  "use strict";

  const body = document.body;
  const root = body.dataset.root || ".";
  const issues = window.RISMAN_ISSUES || [];

  const path = (relativePath) => `${root}/${relativePath}`;
  const readerUrl = (issue) => `${path("read/")}?issue=${encodeURIComponent(issue.number)}`;

  function issueCover(issue, priority) {
    const figure = document.createElement("figure");
    figure.className = `issue-cover issue-cover-${Number(issue.number) % 4}`;
    figure.innerHTML = `
      <div class="cover-fallback" aria-hidden="true">
        <span class="cover-fallback-title">${issue.title}</span>
        <span>No. ${issue.number}</span>
      </div>
    `;
    const image = document.createElement("img");
    image.alt = `Cover of Risman issue ${issue.number}, ${issue.title}`;
    image.width = 720;
    image.height = 960;
    image.decoding = "async";
    if (priority) image.fetchPriority = "high";
    else image.loading = "lazy";
    image.addEventListener("error", () => {
      image.hidden = true;
      figure.classList.add("cover-missing");
    }, { once: true });
    image.src = path(issue.cover);
    figure.append(image);
    return figure;
  }

  function issueCard(issue) {
    const article = document.createElement("article");
    article.className = "issue-card";
    const link = document.createElement("a");
    link.className = "issue-card-link";
    link.href = readerUrl(issue);
    link.setAttribute("aria-label", `Read issue ${issue.number}: ${issue.title}`);
    link.append(issueCover(issue, false));
    link.insertAdjacentHTML("beforeend", `
      <div class="issue-card-copy">
        <p>Issue ${issue.number}</p>
        <h3>${issue.title}</h3>
        <span class="issue-card-read" aria-hidden="true">Read <span class="link-arrow">→</span></span>
      </div>
    `);
    article.append(link);
    return article;
  }

  function renderIssues() {
    const grid = document.querySelector("#issues-grid");
    if (grid) issues.forEach((issue) => grid.append(issueCard(issue)));

    const preview = document.querySelector("#archive-preview");
    if (preview) issues.slice(1, 5).forEach((issue) => preview.append(issueCard(issue)));

    const featuredHost = document.querySelector("#featured-issue");
    if (!featuredHost || !issues.length) return;

    const issue = issues.find((item) => item.featured) || issues[0];
    const mediaLink = document.createElement("a");
    mediaLink.className = "featured-cover-link";
    mediaLink.href = readerUrl(issue);
    mediaLink.setAttribute("aria-label", `Read featured issue ${issue.number}: ${issue.title}`);
    mediaLink.append(issueCover(issue, true));

    const copy = document.createElement("div");
    copy.className = "featured-copy";
    copy.innerHTML = `
      <p class="eyebrow">Issue ${issue.number} · Latest issue</p>
      <h3>${issue.title}</h3>
      <p>${issue.description}</p>
      <a class="button button-primary" href="${readerUrl(issue)}">Read online <span class="link-arrow" aria-hidden="true">→</span></a>
    `;
    featuredHost.append(mediaLink, copy);
  }

  function setupTheme() {
    const toggle = document.querySelector(".theme-toggle");
    if (!toggle) return;

    const themeColor = document.querySelector('meta[name="theme-color"]');
    const applyTheme = (theme, persist) => {
      document.documentElement.dataset.theme = theme;
      toggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
      toggle.setAttribute("aria-pressed", String(theme === "dark"));
      if (themeColor) themeColor.content = theme === "dark" ? "#30364F" : "#F0F0DB";
      if (persist) {
        try { localStorage.setItem("risman-theme", theme); } catch (_error) {}
      }
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
      toggle.querySelector(".nav-toggle-label").textContent = "Menu";
    };

    toggle.addEventListener("click", () => {
      const isOpen = body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.querySelector(".nav-toggle-label").textContent = isOpen ? "Close" : "Menu";
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
      heading.innerHTML = "<span>Risman archive</span><strong>Issue not found</strong>";
      host.innerHTML = `
        <section class="reader-message">
          <p class="eyebrow">No matching issue</p>
          <h1>That issue is not in the archive.</h1>
          <p>Choose one of the eight published issues and continue reading.</p>
          <a class="button button-light" href="${path("issues/")}">Browse issues <span class="link-arrow" aria-hidden="true">→</span></a>
        </section>
      `;
      return;
    }

    document.title = `Issue ${issue.number}: ${issue.title} — Risman`;
    heading.innerHTML = `<span>Issue ${issue.number}</span><strong>${issue.title}</strong>`;
    const pdfPath = path(issue.pdf);

    try {
      const response = await fetch(pdfPath, { method: "HEAD", cache: "no-store" });
      if (!response.ok) throw new Error("PDF unavailable");
      host.innerHTML = `
        <object class="pdf-object" data="${pdfPath}#view=FitH&amp;toolbar=1&amp;navpanes=0" type="application/pdf" aria-label="Risman issue ${issue.number}: ${issue.title}">
          <section class="reader-message">
            <p class="eyebrow">Browser limitation</p>
            <h1>This browser cannot display the issue here.</h1>
            <p>You can still open the PDF in a new browser tab.</p>
            <a class="button button-light" href="${pdfPath}" target="_blank" rel="noopener">Open issue <span class="link-arrow" aria-hidden="true">↗</span></a>
          </section>
        </object>
      `;
    } catch (_error) {
      host.innerHTML = `
        <section class="reader-message">
          <p class="eyebrow">Issue ${issue.number}</p>
          <h1>The PDF will appear here.</h1>
          <p>Add <code>${issue.pdf}</code> to publish <em>${issue.title}</em> in the online reader.</p>
          <a class="button button-light" href="${path("issues/")}">Return to issues <span class="link-arrow" aria-hidden="true">→</span></a>
        </section>
      `;
    }
  }

  document.querySelectorAll("[data-current-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  setupTheme();
  setupNavigation();
  renderIssues();
  setupReader();
})();
