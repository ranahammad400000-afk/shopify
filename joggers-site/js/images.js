/* ============================================================
   images.js — jogger image source + procedural SVG fallback
   ------------------------------------------------------------
   Tries to load real jogger/sportswear photos from Unsplash.
   If a photo fails (offline / blocked), swaps in a generated
   SVG "jogger" so the layout always looks intentional.
   ============================================================ */

// Curated Unsplash photo IDs (joggers / sportswear / activewear).
const UNSPLASH_IDS = [
  "1552902865-b72c031ac5ea", // joggers
  "1556906781-9a412961c28c", // sneakers + pants
  "1483721310020-03333e577078", // runner
  "1571019613454-1cb2f99b2d8b", // gym
  "1518611012118-696072aa579a", // athletic
  "1517649763962-0c623066013b", // sport
  "1490578474895-699cd4e2cf59", // streetwear
  "1539109136881-3be0616acf4b", // model pants
  "1506629082955-511b1aa562c8", // sportswear
  "1595950653106-6c9ebd614d3a", // activewear
  "1606107557195-0e29a4b5b4aa", // pants flatlay
  "1542291026-7eec264c27ff", // red sneakers
  "1551232864-3f0890e580d9", // joggers detail
  "1473966968600-fa801b869a1a", // street fashion
  "1556821840-3a63f95609a7", // sneaker
  "1521572163474-6864f9cf17ab", // apparel
];

const seeded = (i) => UNSPLASH_IDS[i % UNSPLASH_IDS.length];

export function unsplashUrl(idIndex, w = 600, h = 800) {
  const id = seeded(idIndex);
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=70`;
}

/* ---- Procedural fallback: a stylised jogger on a gradient ---- */
const PALETTES = [
  ["#7a5cff", "#c6ff3a"],
  ["#ff5c8a", "#7a5cff"],
  ["#c6ff3a", "#0d0d16"],
  ["#22d3ee", "#7a5cff"],
  ["#ff8a3a", "#ff5c8a"],
  ["#34d399", "#c6ff3a"],
];

export function joggerSVG(seed = 0, w = 600, h = 800) {
  const [a, b] = PALETTES[seed % PALETTES.length];
  const gid = `g${seed}`;
  // simple jogger-pants silhouette path
  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Jogger pants">
    <defs>
      <linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${a}"/>
        <stop offset="1" stop-color="${b}"/>
      </linearGradient>
      <radialGradient id="${gid}r" cx="0.3" cy="0.2" r="0.9">
        <stop offset="0" stop-color="rgba(255,255,255,0.35)"/>
        <stop offset="1" stop-color="rgba(0,0,0,0.25)"/>
      </radialGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#0d0d16"/>
    <rect width="${w}" height="${h}" fill="url(#${gid})" opacity="0.9"/>
    <rect width="${w}" height="${h}" fill="url(#${gid}r)" opacity="0.5"/>
    <g fill="#0a0a0f" opacity="0.88" transform="translate(${w / 2},${h * 0.12})">
      <path d="M-120,0 h240 a18,18 0 0 1 18,18 v40 h-276 v-40 a18,18 0 0 1 18,-18 z"/>
      <path d="M-138,58 h120 l-6,${h * 0.74} a16,16 0 0 1 -16,16 h-78 a16,16 0 0 1 -16,-16 z"/>
      <path d="M18,58 h120 l-24,${h * 0.7} a16,16 0 0 1 -16,16 h-78 a16,16 0 0 1 -16,-16 z"/>
    </g>
    <g stroke="${a}" stroke-width="3" opacity="0.55" fill="none" transform="translate(${w / 2},${h * 0.12})">
      <path d="M-92,90 v${h * 0.62}"/>
      <path d="M70,90 v${h * 0.6}"/>
    </g>
  </svg>`;
}

export function joggerDataUri(seed, w, h) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(joggerSVG(seed, w, h))}`;
}

/* Build an <img> that falls back to the SVG on error. */
export function buildImage(idIndex, { w = 600, h = 800, alt = "Jogger pants", lazy = true } = {}) {
  const img = document.createElement("img");
  img.alt = alt;
  img.width = w; img.height = h;
  if (lazy) img.loading = "lazy";
  img.decoding = "async";
  img.src = unsplashUrl(idIndex, w, h);
  img.addEventListener("error", function onErr() {
    img.removeEventListener("error", onErr);
    img.src = joggerDataUri(idIndex, w, h);
  });
  return img;
}

/* Fisher–Yates shuffle for "random on each load". */
export function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
