# Risman Journal

The official website for **Risman**, an editorial journal exploring psychology.

Risman is designed as a quiet meeting point between an academic journal and a contemporary editorial magazine. Visitors can explore all eight issues and read each publication directly in the browser.

## Features

- Responsive homepage, archive, about page, and issue reader
- Eight data-driven journal issues
- In-browser PDF reading experience
- Persistent light and dark themes
- Accessible keyboard navigation and reduced-motion support
- Responsive and lazy-loaded cover images
- Graceful fallbacks for missing covers or PDF files
- Open Graph, Twitter Card, sitemap, and robots metadata
- No framework, package installation, or build process
- Ready for GitHub Pages and Vercel

## Pages

| Page | Purpose |
| --- | --- |
| `/` | Journal introduction, featured issue, and archive preview |
| `/issues/` | Complete eight-issue archive |
| `/about/` | Journal statement and editorial information |
| `/read/?issue=08` | Browser reader for a selected issue |

## Technology

- Semantic HTML5
- Modern CSS
- Vanilla JavaScript
- Native browser PDF embedding
- Google Fonts: Playfair Display and DM Sans

The project intentionally has no runtime dependencies and requires no build command.

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
│   ├── covers/
│   │   ├── issue-01.jpg
│   │   └── issue-08.jpg
│   ├── css/
│   │   └── styles.css
│   ├── icons/
│   │   ├── risman-mark.png
│   │   └── risman-nastaliq.png
│   ├── issues/
│   │   ├── issue-01.pdf
│   │   └── issue-08.pdf
│   ├── js/
│   │   ├── issues-data.js
│   │   └── main.js
│   └── social/
│       └── risman-og.jpg (add before launch)
├── tests/
│   ├── issues.test.js
│   └── site.test.js
├── .nojekyll
├── robots.txt
├── sitemap.xml
└── vercel.json
```

## Run locally

Opening the HTML files directly is not recommended because the reader checks PDF availability through HTTP. Start a small local server from the repository directory:

```bash
python3 -m http.server 8080
```

Then visit [http://localhost:8080](http://localhost:8080).

You can alternatively use:

```bash
npx serve .
```

No installation or build step is needed.

## Edit issues

All issue metadata is stored in one file:

```text
assets/js/issues-data.js
```

Each issue uses this structure:

```js
{
  number: "08",
  title: "Sometimes, The Path Itself Must Be Seen",
  description: "Add the issue description here.",
  cover: "assets/covers/issue-08.jpg",
  pdf: "assets/issues/issue-08.pdf",
  featured: true
}
```

- Change `title` to rename an issue.
- Change `description` to edit its homepage summary.
- Keep issue numbers in two-digit form, such as `"01"` and `"08"`.
- Keep the newest issue first in the list.
- Add `featured: true` to the single issue that should appear on the homepage.

The homepage, archive, fallback covers, links, and reader are all generated from this list.

## Replace covers and PDFs

Place issue covers in `assets/covers/` using these exact filenames:

```text
issue-01.jpg
issue-02.jpg
...
issue-08.jpg
```

For best results, use compressed portrait JPEG files with a **3:4 aspect ratio**, ideally around `1200 × 1600 px`.

Place the publications in `assets/issues/`:

```text
issue-01.pdf
issue-02.pdf
...
issue-08.pdf
```

If a cover is unavailable, the website displays an editorial fallback cover. If a PDF is unavailable, the reader displays a clear publishing message instead of a broken embed.

## Edit the About page

Edit `about/index.html`. The replaceable journal copy is marked by these comments:

```html
<!-- ABOUT COPY START -->
...
<!-- ABOUT COPY END -->
```

## Branding and social preview

- Header mark: `assets/icons/risman-mark.png`
- Favicon: `assets/icons/risman-mark.png`
- Background watermark: `assets/icons/risman-nastaliq.png`
- Social preview: `assets/social/risman-og.jpg`

The recommended social-preview size is `1200 × 630 px`.

Before publishing, replace every occurrence of:

```text
https://your-domain.example
```

with the final website address. Check the HTML files, `robots.txt`, and `sitemap.xml`. Absolute URLs are required for correct canonical and social-sharing metadata.

## Tests

With Node.js installed, run:

```bash
node --check assets/js/main.js
node tests/issues.test.js
node tests/site.test.js
```

The checks validate JavaScript syntax, the eight-issue dataset, ordering and paths, and the shared branding and theme controls.

## Deploy to GitHub Pages

1. Push this project to a GitHub repository.
2. Open the repository's **Settings** page.
3. Select **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the default branch and the `/ (root)` folder.
6. Save and wait for GitHub to display the published address.

The included `.nojekyll` file ensures GitHub Pages serves the static project without Jekyll processing.

## Deploy to Vercel

1. Import the GitHub repository into Vercel.
2. Set **Framework Preset** to **Other**.
3. Leave the build command empty.
4. Set the output directory to `.`.
5. Deploy.

The included `vercel.json` enables clean URLs and consistent trailing slashes.

## Accessibility and performance

- Semantic landmarks and heading hierarchy
- Skip links and visible keyboard focus
- Accessible navigation and theme-control labels
- Operating-system theme preference on first visit
- Saved theme choice on later visits
- `prefers-reduced-motion` support
- Lazy-loaded archive covers
- Minimal JavaScript and no framework bundle
- System font fallbacks if Google Fonts cannot load

## Browser support

Risman targets current versions of Chrome, Edge, Firefox, and Safari. The PDF toolbar and controls are provided by each browser, so their appearance may vary.

## License

No open-source license is currently included. Unless a license is added, the journal's code, writing, artwork, covers, and publications remain under their respective owners' copyright.
