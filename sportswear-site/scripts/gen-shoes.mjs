// Generates stylised trail-runner SVGs (one per colorway) into /public/shoes.
// Replace these files with real product photography of the same name to
// instantly skin the site with your own shoes.
import { writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '..', 'public', 'shoes')
mkdirSync(OUT, { recursive: true })

const ways = [
  { file: 'shoe-black.svg',  upper1: '#23262b', upper2: '#0c0d10', accent: '#8b9096', sole: '#0a0a0c', lace: '#3a3d42' },
  { file: 'shoe-red.svg',    upper1: '#ff3b30', upper2: '#1a0608', accent: '#ff6a5e', sole: '#0a0a0c', lace: '#111' },
  { file: 'shoe-orange.svg', upper1: '#ff6a00', upper2: '#120a06', accent: '#ffae66', sole: '#0a0a0c', lace: '#111' },
  { file: 'shoe-blue.svg',   upper1: '#bfe1ff', upper2: '#5b8fb5', accent: '#2c5d80', sole: '#0c0e12', lace: '#111' },
  { file: 'shoe-camo.svg',   upper1: '#2a2d31', upper2: '#0b0c0e', accent: '#ff7a18', sole: '#0a0a0c', lace: '#2a2d31' },
]

// 16 sole lugs along the bottom
function lugs(sole) {
  let p = ''
  for (let i = 0; i < 17; i++) {
    const x = 70 + i * 31
    p += `<rect x="${x}" y="372" width="18" height="20" rx="4" fill="${sole}"/>`
  }
  return p
}

function shoe({ upper1, upper2, accent, sole, lace }, id) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 440" role="img" aria-label="trail running shoe">
  <defs>
    <linearGradient id="up${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${upper1}"/>
      <stop offset="1" stop-color="${upper2}"/>
    </linearGradient>
    <linearGradient id="mid${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2b2e33"/>
      <stop offset="1" stop-color="#0c0d10"/>
    </linearGradient>
    <radialGradient id="sh${id}" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="rgba(0,0,0,0.55)"/>
      <stop offset="1" stop-color="rgba(0,0,0,0)"/>
    </radialGradient>
  </defs>

  <ellipse cx="320" cy="410" rx="250" ry="22" fill="url(#sh${id})"/>

  <!-- outsole -->
  <path d="M58 360 Q60 330 110 326 L560 322 Q598 322 600 350 L600 372 Q600 392 575 392 L92 392 Q58 392 58 360 Z" fill="${sole}"/>
  ${lugs(sole)}

  <!-- midsole -->
  <path d="M60 350 Q70 300 150 296 L548 300 Q596 304 596 348 L596 360 Q470 372 300 370 Q150 368 60 360 Z" fill="url(#mid${id})"/>
  <path d="M300 312 Q450 308 590 330" stroke="${accent}" stroke-width="6" fill="none" opacity="0.85"/>

  <!-- upper body -->
  <path d="M96 300 Q90 200 150 150 Q210 100 300 104 Q360 106 410 150 L470 250 Q540 260 560 300 Q470 318 300 316 Q170 314 96 300 Z" fill="url(#up${id})"/>

  <!-- toe cap -->
  <path d="M96 300 Q90 250 120 220 Q160 210 200 230 L210 304 Q150 308 96 300 Z" fill="${upper2}" opacity="0.6"/>

  <!-- heel counter -->
  <path d="M470 250 Q540 258 560 300 Q520 312 470 308 Z" fill="${upper2}" opacity="0.7"/>

  <!-- accent dynamic stripe -->
  <path d="M210 290 Q300 200 400 200 Q330 250 300 300 Z" fill="${accent}" opacity="0.5"/>
  <path d="M250 300 L330 205 L360 205 L280 300 Z" fill="${accent}" opacity="0.7"/>

  <!-- collar / ankle -->
  <path d="M398 150 Q430 120 470 150 Q480 200 470 250 Q440 240 410 250 Q400 200 398 150 Z" fill="${upper2}"/>
  <path d="M404 156 Q430 132 462 156 Q470 198 462 240 Q438 232 414 240 Q406 198 404 156 Z" fill="#0d0e11"/>

  <!-- tongue -->
  <path d="M300 120 Q330 110 360 124 L356 180 Q330 172 304 180 Z" fill="${upper2}"/>

  <!-- laces -->
  <g stroke="${lace}" stroke-width="9" stroke-linecap="round" fill="none">
    <path d="M250 180 L330 156"/>
    <path d="M256 210 L336 186"/>
    <path d="M262 240 L342 216"/>
    <path d="M268 270 L348 246"/>
  </g>
  <g fill="${accent}">
    <circle cx="250" cy="180" r="5"/><circle cx="330" cy="156" r="5"/>
    <circle cx="262" cy="240" r="5"/><circle cx="342" cy="216" r="5"/>
  </g>

  <!-- brand pull tab -->
  <rect x="466" y="120" width="40" height="22" rx="8" fill="${upper2}"/>
  <text x="486" y="136" font-family="Archivo, sans-serif" font-size="11" font-weight="800" fill="${accent}" text-anchor="middle">S</text>
</svg>`
}

ways.forEach((w, i) => {
  writeFileSync(join(OUT, w.file), shoe(w, i))
  console.log('wrote', w.file)
})

// favicon
const fav = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#07080b"/><circle cx="32" cy="32" r="14" fill="#ff6a00"/></svg>`
writeFileSync(join(__dirname, '..', 'public', 'favicon.svg'), fav)
console.log('wrote favicon.svg')
