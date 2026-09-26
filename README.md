# OniDev Studio

One-page indie game studio website, hosted on GitHub Pages. No build step or dependencies.

## Editing

- `dist/content.js`: game descriptions, YouTube trailer URLs, Steam and Discord links, email, team members, screenshot lists.
- `dist/index.html`: section copy and navigation.
- `dist/styles.css`: theme and responsive layout.
- `dist/assets/`: local images and downloadable press kits. Add media here and reference it with a relative path.

How to Digging Moon Together currently uses a gameplay gallery in place of its trailer. Add its YouTube URL, Steam URL, and Discord invite in `content.js` when available. Empty links are omitted.

## Publishing

GitHub Pages serves the `dist` directory through the workflow in `.github/workflows/pages.yml` on pushes to `main`.

## Custom domain later

Set the domain in the repository's **Settings → Pages → Custom domain**, configure its DNS as instructed by GitHub, and enable HTTPS. Relative asset paths support the current project URL and a future domain.

## Preview

Run a local static HTTP server with `dist` as its root, then open its address in your browser.
