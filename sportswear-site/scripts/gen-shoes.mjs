// Generates stylised side-profile trail-runner SVGs (one per colorway) into
// /public/shoes. Replace these files with real product photography of the same
// name to instantly reskin the site with your own shoes.
import { writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '..', 'public', 'shoes')
mkdirSync(OUT, { recursive: true })

const ways = [
  // top = colour the upper fades FROM (top), bot = colour it fades TO (toe)
  { file: 'shoe-black.svg',  top: '#26292e', bot: '#0b0c0f', accent: '#9aa0a6', sole: '#0a0a0c', mid: '#15171c', lace: '#3a3d42', solid: true },
  { file: 'shoe-red.svg',    top: '#111114', bot: '#ff2d20', accent: '#ff6a5e', sole: '#0a0a0c', mid: '#141416', lace: '#0d0d0f' },
  { file: 'shoe-orange.svg', top: '#121316', bot: '#ff6a00', accent: '#ffb273', sole: '#0a0a0c', mid: '#141416', lace: '#0d0d0f' },
  { file: 'shoe-blue.svg',   top: '#5e90b6', bot: '#cfe7ff', accent: '#2c5d80', sole: '#0c0e12', mid: '#dfeefc', lace: '#0d0d0f' },
  { file: 'shoe-camo.svg',   top: '#2b2e33', bot: '#0c0d10', accent: '#ff7a18', sole: '#0a0a0c', mid: '#15171c', lace: '#26282d', camo: true },
]

// tread lugs hanging below the outsole
function lugs(sole) {
  let p = ''
  for (let i = 0; i < 20; i++) {
    const x = 78 + i * 22
    const h = i % 2 === 0 ? 16 : 11
    p += `<rect x="${x}" y="300" width="13" height="${h}" rx="3" fill="${sole}"/>`
  }
  return p
}

function shoe(w, id) {
  const { top, bot, accent, sole, mid, lace, solid, camo } = w
  const upperFill = solid ? `url(#up${id})` : `url(#up${id})`
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" role="img" aria-label="trail running shoe">
  <defs>
    <linearGradient id="up${id}" x1="0.5" y1="0" x2="0.4" y2="1">
      <stop offset="0" stop-color="${top}"/>
      <stop offset="0.55" stop-color="${top}"/>
      <stop offset="1" stop-color="${bot}"/>
    </linearGradient>
    <linearGradient id="mid${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${mid}"/>
      <stop offset="1" stop-color="${sole}"/>
    </linearGradient>
    <radialGradient id="sh${id}" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="rgba(0,0,0,0.5)"/>
      <stop offset="1" stop-color="rgba(0,0,0,0)"/>
    </radialGradient>
    <clipPath id="upclip${id}">
      <path d="M62 250 C54 196 74 156 120 142 C150 133 250 130 320 132 C352 133 366 150 372 176 L384 150 C424 162 452 200 478 250 Z"/>
    </clipPath>
  </defs>

  <ellipse cx="300" cy="330" rx="250" ry="20" fill="url(#sh${id})"/>

  <!-- outsole -->
  <path d="M52 250 C46 286 74 304 120 304 L500 304 C548 304 566 282 560 250 C540 256 360 262 300 262 C180 262 92 258 52 250 Z" fill="${sole}"/>
  ${lugs(sole)}

  <!-- midsole foam -->
  <path d="M58 244 C52 214 86 196 150 194 L470 196 C540 198 566 220 560 250 C540 256 360 262 300 262 C180 262 92 258 58 244 Z" fill="url(#mid${id})"/>
  <!-- midsole accent swoosh -->
  <path d="M120 236 C260 214 430 214 552 240" stroke="${accent}" stroke-width="7" fill="none" opacity="0.9" stroke-linecap="round"/>

  <!-- upper body -->
  <path d="M62 250 C54 196 74 156 120 142 C150 133 250 130 320 132 C352 133 366 150 372 176 L384 150 C424 162 452 200 478 250 Z" fill="${upperFill}"/>

  <!-- knit texture / wavy overlay on the upper, clipped to its shape -->
  <g clip-path="url(#upclip${id})" opacity="${camo ? 0.5 : 0.28}">
    ${Array.from({ length: 9 }, (_, i) => {
      const y = 150 + i * 12
      return `<path d="M70 ${y} C160 ${y - 10} 280 ${y - 10} 380 ${y}" stroke="${camo ? '#000' : accent}" stroke-width="${camo ? 6 : 2}" fill="none"/>`
    }).join('')}
  </g>

  <!-- toe cap -->
  <path d="M62 250 C56 214 66 184 92 168 C120 176 138 196 146 248 C118 252 84 252 62 250 Z" fill="${sole}" opacity="0.35"/>

  <!-- heel counter -->
  <path d="M384 150 C424 162 452 200 478 250 C452 252 424 250 408 248 C400 210 390 178 384 150 Z" fill="#0d0e11" opacity="0.7"/>

  <!-- dynamic side cage (like the photos) -->
  <path d="M150 248 L250 168 L286 168 L196 248 Z" fill="${accent}" opacity="0.55"/>
  <path d="M210 248 L300 172 L320 178 L250 248 Z" fill="${accent}" opacity="0.8"/>

  <!-- ankle collar -->
  <path d="M312 150 C346 124 388 130 396 168 C400 196 392 224 378 246 C352 236 330 240 318 248 C312 214 310 180 312 150 Z" fill="#0e0f12"/>
  <path d="M320 156 C348 136 380 142 386 170 C390 196 384 220 372 240 C350 232 332 236 322 244 C318 214 318 182 320 156 Z" fill="#08090b"/>

  <!-- tongue -->
  <path d="M232 150 C236 132 252 124 276 130 L300 138 L294 188 C268 178 248 178 230 186 Z" fill="${solid ? top : '#101012'}"/>

  <!-- laces -->
  <g stroke="${lace}" stroke-width="8" stroke-linecap="round" fill="none">
    <path d="M196 196 L286 168"/>
    <path d="M200 216 L292 188"/>
    <path d="M206 236 L300 210"/>
  </g>
  <g fill="${accent}">
    <circle cx="196" cy="196" r="4.5"/><circle cx="286" cy="168" r="4.5"/>
    <circle cx="200" cy="216" r="4.5"/><circle cx="292" cy="188" r="4.5"/>
    <circle cx="206" cy="236" r="4.5"/><circle cx="300" cy="210" r="4.5"/>
  </g>

  <!-- heel pull tab -->
  <path d="M392 138 C404 128 420 132 420 146 C420 156 410 160 398 158 Z" fill="#0e0f12"/>

  <!-- brand mark -->
  <text x="300" y="282" font-family="Archivo, Arial, sans-serif" font-size="15" font-weight="800" fill="${accent}" text-anchor="middle" opacity="0.95">STRIDE</text>
</svg>`
}

ways.forEach((w, i) => {
  writeFileSync(join(OUT, w.file), shoe(w, i))
  console.log('wrote', w.file)
})

const fav = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#07080b"/><circle cx="32" cy="32" r="14" fill="#ff6a00"/></svg>`
writeFileSync(join(__dirname, '..', 'public', 'favicon.svg'), fav)
console.log('wrote favicon.svg')
