# OniDev Studio

One-page indie game studio website, hosted on GitHub Pages. No build step or dependencies.

## Editing

- `dist/content.js`: game descriptions, YouTube trailer URLs, Steam and Discord links, email, team members, screenshot lists.
- `dist/index.html`: section copy and navigation.
- `dist/styles.css`: theme and responsive layout.
- `dist/assets/`: local images and downloadable press kits. Add media here and reference it with a relative path.

We Dig the Moon is the featured game, followed by Tankful. Its gallery uses the five approved Steam screenshots in order: `22.png`, `3.png`, `7.jpg`, `23.png`, `14.png`. Optimized WebP images and thumbnails live in `dist/assets/moon/`; the press kit includes the original screenshots and marketing artwork. `scripts/prepare-moon-assets.py` regenerates these assets from the local source folders using Pillow.

The original studio theme and two-column game layout are retained, with We Dig the Moon first. The site respects reduced-motion preferences. Screenshot galleries support keyboard navigation, touch swipes, and Escape to close.

## Validation

Run `node --check dist/app.js`, `node --check dist/content.js`, and `node scripts/check-site.mjs`. GitHub Actions runs these checks before publishing the static `dist` artifact. There is no framework compilation step.

## Publishing

GitHub Pages serves the `dist` directory through the workflow in `.github/workflows/pages.yml` on pushes to `main`.

## Custom domain later

Set the domain in the repository's **Settings → Pages → Custom domain**, configure its DNS as instructed by GitHub, and enable HTTPS. Relative asset paths support the current project URL and a future domain.

## Preview

Run a local static HTTP server with `dist` as its root, then open its address in your browser.
