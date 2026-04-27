# Hikaru — Latent Studies · Vol. 026

> **Highlight your brand.** Twenty-five generative image studies from Hikaru's 2026 AI image lab — an editorial index from **光曜町 (Hikaru · Taipei)**.

🌐 **Live:** https://hikaru-tw.github.io/hikaru-vol-026/
🏛 **Studio:** https://www.hikaru.com.tw/

---

## About

Hikaru — 光曜町 — is a Taipei-based digital integrated brand specialist, illuminating brand value since 2010 through **OMO (Online Merge Offline)** solutions across Branding, MarTech, Media & Social.

**The Lab** is our generative atelier — a sandbox where creative strategy meets latent space. Vol. 026 samples twenty-five image studies from a year of latent exploration, presented as an Awwwards-style editorial index.

## Stack

Pure static site — no build step.

- `index.html` — markup, structure, content
- `styles.css` — layout, typography, animations
- `script.js` — loader, smooth scroll, gallery, lightbox, custom cursor
- `image/` — gallery assets (F.01 – F.25)

Typography: **Fraunces**, **Inter Tight**, **Noto Serif TC**, **Zen Old Mincho** (via Google Fonts).

## Local development

Just open `index.html` in a browser, or serve the folder for proper relative paths:

```powershell
# Python
python -m http.server 8000

# Node
npx serve .
```

Then visit http://localhost:8000.

## Deployment

Deploys automatically to **GitHub Pages** on every push to `main` via [`.github/workflows/pages.yml`](.github/workflows/pages.yml).

Pages source: **GitHub Actions** (Settings → Pages).

## Credits

- Studio · [Hikaru · 光曜町](https://www.hikaru.com.tw/)
- Built by · [@eryet](https://github.com/eryet)

---

© 光曜町數位行銷 · 2026 · Visual Index № 026
