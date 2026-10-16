# Crumbslinger

One-page website for Crumbslinger, a one-person indie game studio, hosted on GitHub Pages. No build step or dependencies.

## Editing

- `dist/content.js`: game descriptions, YouTube trailer URLs, Steam, Discord and press kit links, email, team member (photo, role, previous games), screenshot lists.
- `dist/index.html`: section copy and navigation.
- `dist/styles.css`: theme and responsive layout.
- `dist/assets/`: local images and downloadable press kits. Add media here and reference it with a relative path.

The top of the page is a layered parallax hero for We Dig the Moon (`dist/assets/hero/`), followed by the studio games list. `scripts/prepare-crumbslinger-assets.py` regenerates the hero layers, studio logo, favicon and team photo from the `../We Dig the Moon` and `../Studio Crumbslinger` source folders (run with Pillow, e.g. `uv run --with pillow python scripts/prepare-crumbslinger-assets.py`). The We Dig the Moon press kit is hosted on Google Drive.

The We Dig the Moon gallery uses the numbered screenshots (`1.png`, `2.jpg`, …) from `../We Dig the Moon` in numeric order; the same script converts them into `dist/assets/moon/screenshot-N.webp` and `thumb-N.webp`. Update the screenshot count in `dist/content.js` when it changes.

The site respects reduced-motion preferences. Screenshot galleries support keyboard navigation, touch swipes, and Escape to close.

## Validation

Run `node --check dist/app.js`, `node --check dist/content.js`, and `node scripts/check-site.mjs`. GitHub Actions runs these checks before publishing the static `dist` artifact. There is no framework compilation step.

## Publishing

GitHub Pages serves the `dist` directory through the workflow in `.github/workflows/pages.yml` on pushes to `main`.

## Domain

The site is served at https://crumbslinger.com (set in **Settings → Pages → Custom domain**). DNS for crumbslinger.com and oniindie.dev is on Cloudflare: crumbslinger.com points to GitHub Pages through the Cloudflare proxy (SSL mode Full, Always Use HTTPS on; GitHub never issued its own certificate), and oniindie.dev 301-redirects to crumbslinger.com via a Cloudflare Redirect Rule.

## Preview

Run a local static HTTP server with `dist` as its root, then open its address in your browser.
