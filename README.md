# Risman

A calm, editorial website for **Risman**, an independent journal about psychology, mind, and society.

The project uses plain HTML, CSS, and JavaScript. There is no framework, dependency installation, or build step, so it is fast to preview and simple to deploy on GitHub Pages or Vercel.

## Pages

- `/` — landing page, featured issue, and archive preview
- `/about/` — journal statement and editorial introduction
- `/issues/` — all eight published issues
- `/read/?issue=08` — in-site PDF reader (change `08` to any issue number)

## Project structure

```text
.
├── index.html
├── about/
│   └── index.html
├── issues/
│   └── index.html
├── read/
│   └── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── issues-data.js
│   │   └── main.js
│   ├── covers/
│   │   ├── issue-01.jpg
│   │   └── … issue-08.jpg
│   ├── issues/
│   │   ├── issue-01.pdf
│   │   └── … issue-08.pdf
│   ├── icons/
│   │   ├── favicon.svg
│   │   └── risman-mark.png
│   └── social/
│       └── risman-og.jpg
├── tests/
│   └── issues.test.js
├── .nojekyll
├── robots.txt
├── sitemap.xml
└── vercel.json
```

Empty asset folders are already included. Missing covers are replaced automatically by designed fallback covers; a missing PDF produces a clear message instead of a broken reader.

## Add your content

### Covers and PDFs

Add files using these exact names:

```text
assets/covers/issue-01.jpg
assets/covers/issue-02.jpg
...
assets/covers/issue-08.jpg

assets/issues/issue-01.pdf
assets/issues/issue-02.pdf
...
assets/issues/issue-08.pdf
```

For sharp, efficient covers, use portrait JPEGs with a **3:4 ratio**, ideally around `1200 × 1600 px`, compressed for the web.

### Typography, mark, and origin globe

The site uses Playfair Display for editorial display text and DM Sans for interface and body copy, loaded from Google Fonts with Georgia and Arial fallbacks.

`assets/icons/risman-mark.png` is the compact brain-and-rope mark used beside the header wordmark. Its transparent artwork is colored through CSS so the original drawing remains untouched and stays legible in both themes.

The Tehran origin globe is drawn entirely with CSS, including its marker and coordinates. It has no image dependency, external map request, or tracking code.

### Issue titles and descriptions

Edit the single list in `assets/js/issues-data.js`. The home page, archive, cover fallbacks, links, and reader all update from that file.

Keep issue numbers as two digits (`"01"`, not `"1"`). The newest issue should be first and marked with `featured: true`.

### About copy

Edit the content in `about/index.html` between:

```html
<!-- ABOUT COPY START -->
...
<!-- ABOUT COPY END -->
```

### Favicon and social preview

Add:

```text
assets/icons/favicon.svg
assets/social/risman-og.jpg
```

Use a `1200 × 630 px` JPEG for `risman-og.jpg`.

Before launch, replace every occurrence of `https://your-domain.example` in the HTML files, `robots.txt`, and `sitemap.xml` with the final public URL. Open Graph image URLs need the complete address to work in social previews.

## Preview locally

The PDF availability check requires a local web server; opening the HTML files directly from Finder is not enough.

From the project folder, run either:

```bash
python3 -m http.server 8080
```

or:

```bash
npx serve .
```

Then open `http://localhost:8080` (or the address printed by `serve`). No build command is needed.

## Verify issue data

If Node.js is installed:

```bash
node tests/issues.test.js
node tests/site.test.js
```

The checks confirm there are eight unique issues in the correct order, that each has cover and PDF paths, and that every page retains the shared theme and brand controls.

## Deploy to Vercel

### Vercel dashboard

1. Push this folder to a Git repository.
2. In Vercel, choose **Add New**, then **Project**, and import the repository.
3. Set **Framework Preset** to **Other**.
4. Leave the build command empty and use `.` as the output directory.
5. Deploy.

`vercel.json` enables clean, trailing-slash URLs for the static pages.

### Vercel CLI

```bash
npx vercel
```

Accept the defaults and leave the build command empty.

## Deploy to GitHub Pages

1. Create a GitHub repository and push this project to its default branch.
2. Open **Settings**, then **Pages**, in the repository.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the default branch and the `/ (root)` folder, then save.
5. GitHub will publish the site at the URL shown in the Pages settings.

The included `.nojekyll` file tells GitHub Pages to serve the project exactly as written. Relative links allow it to work both on a custom domain and inside a repository subpath.

## Design and accessibility notes

- Uses only the Risman navy, blue-gray, warm beige, and soft ivory palette (plus transparent mixtures of those colors).
- Includes a persistent light/dark theme switch that follows the operating-system preference on first visit.
- Uses the brain-and-rope mark, a restrained rope-loop divider, and an annotated Tehran globe as journal-specific details rather than generic decoration.
- Uses semantic landmarks, visible keyboard focus, skip links, accessible navigation states, and alt text.
- Respects `prefers-reduced-motion` while retaining the small load animation for other visitors.
- Covers are lazy-loaded except for the featured issue.
- The browser's native PDF renderer provides the reading experience without a large JavaScript library.
- If a browser cannot embed PDFs, the reader offers a clearly labelled new-tab fallback.

## Browser support

The site targets current versions of Chrome, Edge, Firefox, and Safari. PDF controls are provided by each browser and may look slightly different across platforms.
