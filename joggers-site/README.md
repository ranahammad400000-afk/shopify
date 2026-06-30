# STRIDE — 3D Joggers store

A high-motion, single-page storefront for a jogger-pants brand. Built with
**zero build step** — plain HTML/CSS/JS with libraries loaded from CDN, so you
can open it instantly.

## Run it

It's a static site. Use any static server (needed because the JS uses ES
modules + `fetch`, which don't run from `file://`):

```bash
cd joggers-site
python3 -m http.server 5173
# then open http://localhost:5173
```

Or with Node:

```bash
npx serve joggers-site
```

## What's inside

| File | Role |
| --- | --- |
| `index.html` | Markup + section structure, CDN library tags |
| `css/styles.css` | All styling, animated background, responsive + reduced-motion |
| `js/hero3d.js` | Three.js floating-objects hero scene (pointer parallax) |
| `js/images.js` | Jogger image sourcing + **procedural SVG fallback** |
| `js/main.js` | Lenis smooth scroll, GSAP reveals, product grid, tilt, story, collage, reviews, cart |

## Effects included

- Page-load intro animation
- Lenis momentum smooth-scrolling
- Three.js 3D hero with cursor parallax
- Word-by-word hero headline reveal
- Scroll-triggered fade/slide/scale reveals (staggered) on every section
- 3D tilt + cursor shine on product cards
- Magnetic buttons + cursor-follow glow
- Pinned, scrubbed scroll-story section
- Infinite marquee + animated gradient/noise background
- Auto-rotating reviews carousel
- Add-to-cart micro-interaction with live count
- Full responsive layout + `prefers-reduced-motion` support

## Images — random on every load

Product and lookbook images are **shuffled on each page load** so the layout
feels alive. Each image first tries a real jogger/sportswear photo from
Unsplash; if that's blocked or offline, it falls back to a generated SVG jogger
silhouette on a gradient — so the site **always looks complete**, even with no
network.

### Swap in your own product photos

1. Drop images into `joggers-site/assets/`.
2. In `js/images.js`, replace `buildImage()` usage or point `unsplashUrl()` at
   your own paths, e.g. return `assets/aero-jogger.jpg`.
3. Update product names/prices in the `PRODUCTS` array in `js/main.js`.

## Notes

- CDN libraries: GSAP + ScrollTrigger, Lenis, Three.js (ES module via importmap).
- No keys, no accounts, no build tooling required.
