/* Persian (fa) translation dictionary + language toggle logic.
   Load via <script defer> BEFORE main.js so window.RISMAN_I18N is available. */
(function () {
  "use strict";

  var FA = {
    // Common / Navigation
    "skip-to-content": "رفتن به محتوا",
    "nav-home": "خانه",
    "nav-issues": "شماره‌ها",
    "nav-about": "درباره ما",
    "menu-label": "منو",
    "menu-close": "بستن",
    "nav-pages-heading": "صفحات",
    "nav-options-heading": "تنظیمات",
    "menu-option-lang": "زبان",
    "menu-option-theme": "حالت نمایش",
    "theme-light": "روشن",
    "theme-dark": "تاریک",
    "back-to-home": "بازگشت به صفحه اصلی",

    // Home: Hero
    "hero-eyebrow": "نشریه روان‌شناسی",
    "hero-title": "ریسمانی در حال واکاوی<br> اعماقِ <em>ذهن</em>",
    "hero-deck": "ریسمان نگاهی عمیق به داستان‌هایی دارد که زندگی درونی و روان انسان را شکل می‌دهند—و جامعه‌ای که بر مدار آن بنا می‌کنیم.",
    "explore-issues": "مشاهده شماره‌ها",
    "about-journal-link": "درباره نشریه",

    // Map Card (Paul Stamatiou style minimal)
    "origin-eyebrow": "خاستگاه",
    "where-began": "جایی که همه چیز آغاز شد.",
    "map-city": "جایی که همه چیز آغاز شد.",
    "map-sub": "علوم و تحقیقات · دانشکده علوم انسانی",
    "map-tag-sub": "محل تولد ریسمان",
    "map-meta-foothills": "تهران",
    "map-hint-rotate": "برای چرخش بکشید",
    "map-btn-campus": "نمای نزدیک‌تر",
    "map-btn-overview": "از فضا",
    "location-info": "تهران، ایران<br>دانشگاه آزاد واحد علوم و تحقیقات<br>دانشکده علوم انسانی",

    // Home: Featured
    "current-reading": "جدیدترین سفر ریسمان",
    "featured-issue": "شماره ویژه",

    // Home: Archive preview
    "from-archive": "از آرشیو",
    "ideas-return": "سفری به درون ذهن.",
    "view-all-issues": "مشاهده همه شماره‌ها",

    // Home: Journal note
    "journal-note-heading": "ما همه نخ‌های<em> این ریسمانیم.</em>",
    "journal-note-text": "بازتاب تلاش‌ کسانی که خود را وقف خلق بستری معنادار در روان‌شناسی و علوم انسانی کرده‌اند.",
    "discover-risman": "کشف ریسمان",

    // Footer
    "footer-tagline": "نشریه روان‌شناسی",
    "footer-issues": "شماره‌ها",
    "footer-about": "درباره ما",
    "back-to-top": "بازگشت به بالا",
    "copyright-name": "نشریه ریسمان.",
    "copyright-rights": "تمامی حقوق محفوظ است.",

    // About page Dossier
    "about-eyebrow": "درباره نشریه",
    "about-title": "کمی درباره<br><em>ریسمان</em>",
    "about-deck": "همه ما تجربه‌ها، احساسات و عواطفی را حمل می‌کنیم که با گذشت زمان در هم تنیده می‌شوند، مانند رشته‌هایی که به هم بافته شده و ریسمان وجود ما را تشکیل می‌دهند. 🧶",
    "dossier-badge": "پرونده تحریریه",
    "dossier-title": "نشریه ریسمان",
    "dossier-subtitle": "دوماهنامه روان‌شناسی، خودآگاهی و ساختارهای اجتماعی.",
    "dossier-founding": "تأسیس",
    "dossier-date": "۶ آذر ۱۴۰۲",
    "dossier-campus-lbl": "دانشگاه",
    "dossier-freq-lbl": "دوره انتشار",
    "dossier-freq-val": "دوماهنامه",
    "dossier-scope-val": "۵ محور اصلی",

    "about-started": "همه چیز در ۶ آذر ۱۴۰۲ آغاز شد...",
    "about-body-1": "ریسمان از تقاطع نیاز حیاتی به محیط‌های پژوهشی خلاق و آرزوی شخصی برای ساختن فضایی فکری بی‌پیشینه پدید آمد. فلسفه ما بر تبدیل محدودیت‌های آموزشی به فرصت‌هایی برای هم‌افزایی خلاقانه و علمی متمرکز است.",
    "about-quote": "«ما همه نخ‌های این ریسمانیم.»",
    "about-fields-title": "حوزه‌های تمرکز",
    "about-fields-body": "ریسمان دیدگاه‌هایی از پنج حوزه اصلی روان‌شناسی را گرد هم می‌آورد:<br><br>✧ روان‌شناسی شناختی<br>✧ روان‌شناسی کودک و نوجوان<br>✧ روان‌شناسی شخصیت<br>✧ روان‌شناسی عمومی<br>✧ فلسفه روان‌شناسی<br><br>ما از طریق مقالات، تأملات و بحث‌هایی که از این حوزه‌ها برگرفته شده‌اند، به کاوش در ابعاد گوناگون ذهن و رفتار انسان می‌پردازیم.",
    "continue-reading": "ادامه مطالعه",
    "about-cta-heading": "هشت شماره.<br>هشت سفر متفاوت.",
    "browse-archive": "مرور آرشیو",

    // Issues page
    "complete-collection": "مجموعه کامل",
    "issues-title": "آرشیو<br><em>ریسمان.</em>",
    "issues-deck": "بازتاب تلاش‌ کسانی که خود را وقف خلق چیزی معنادار در این مسیر کرده‌اند.",
    "published-issues": "شماره منتشر شده",
    "newest-oldest": "جدیدترین به قدیمی‌ترین",
    "read-online": "مطالعه آنلاین",
    "all-issues": "همه شماره‌ها",

    // Reader page
    "skip-to-reader": "رفتن به خوانشگر",
    "opening-issue": "در حال باز کردن شماره",
    "please-wait": "لطفاً صبر کنید",
    "close-reader": "بستن",
    "preparing-issue": "در حال آماده‌سازی شماره…",

    // JS-rendered (main.js)
    "issue-label": "شماره",
    "read-label": "مطالعه شماره",
    "latest-issue": "آخرین شماره",
    "read-online-btn": "مطالعه آنلاین",
    "no-matching": "شماره‌ای یافت نشد",
    "not-in-archive": "این شماره در آرشیو موجود نیست.",
    "choose-issue": "یکی از هشت شماره منتشر شده را انتخاب کنید و به مطالعه ادامه دهید.",
    "browse-issues": "مرور شماره‌ها",
    "browser-limitation": "محدودیت مرورگر",
    "cannot-display": "این مرورگر قادر به نمایش شماره در اینجا نیست.",
    "open-in-tab": "می‌توانید PDF را در یک تب جدید باز کنید.",
    "open-issue": "باز کردن شماره",
    "pdf-here": "PDF اینجا نمایش داده خواهد شد.",
    "return-issues": "بازگشت به شماره‌ها"
  };

  var STORAGE_KEY = "risman-lang";

  function getLang() {
    try { return localStorage.getItem(STORAGE_KEY) || "en"; } catch (e) { return "en"; }
  }

  /** Translate a key. Returns Persian if lang=fa, else the fallback (or key). */
  function t(key, fallback) {
    return getLang() === "fa" ? (FA[key] || fallback || key) : (fallback || key);
  }

  /** Sweep every [data-i18n] element and swap its innerHTML with smooth cross-fade transition. */
  function applyLang(lang) {
    var b = document.body;
    if (b) {
      b.classList.add("lang-transitioning");
    }

    setTimeout(function () {
      var html = document.documentElement;
      html.lang = lang === "fa" ? "fa" : "en";
      html.dir = lang === "fa" ? "rtl" : "ltr";

      document.querySelectorAll("[data-i18n]").forEach(function (el) {
        var key = el.getAttribute("data-i18n");
        if (lang === "fa") {
          if (!el.getAttribute("data-i18n-en")) el.setAttribute("data-i18n-en", el.innerHTML);
          if (FA[key]) el.innerHTML = FA[key];
        } else {
          var en = el.getAttribute("data-i18n-en");
          if (en !== null) el.innerHTML = en;
        }
      });

      // Update toggle button text
      document.querySelectorAll(".lang-toggle").forEach(function (btn) {
        btn.textContent = lang === "fa" ? "EN" : "فا";
        btn.setAttribute("aria-label", lang === "fa" ? "Switch to English" : "تغییر به فارسی");
      });

      try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}

      if (window.renderIssues) window.renderIssues();
      if (window.renderMap) window.renderMap();
      if (window.rismanUpdateNavOptions) window.rismanUpdateNavOptions();
      if (window.rismanUpdateNavToggleLabel) window.rismanUpdateNavToggleLabel();

      requestAnimationFrame(function () {
        if (b) b.classList.remove("lang-transitioning");
      });
    }, 100);
  }

  /** Wire up the toggle button + apply stored language. */
  function init() {
    document.querySelectorAll(".lang-toggle").forEach(function (btn) {
      btn.textContent = getLang() === "fa" ? "EN" : "فا";
      btn.setAttribute("aria-label", getLang() === "fa" ? "Switch to English" : "تغییر به فارسی");
      btn.addEventListener("click", function () {
        applyLang(getLang() === "fa" ? "en" : "fa");
      });
    });
    if (getLang() === "fa") applyLang("fa");
  }

  window.RISMAN_I18N = { t: t, getLang: getLang, applyLang: applyLang, init: init };
})();
