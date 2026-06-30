/* ============================================================
   main.js — STRIDE interactions, motion & content
   ============================================================ */
import { buildImage, joggerDataUri, shuffle } from "./images.js";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;
if (gsap && ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------
   1. Loader intro
------------------------------------------------------------ */
function runLoader() {
  const loader = document.getElementById("loader");
  if (!loader) return Promise.resolve();
  const bar = loader.querySelector(".loader__bar span");
  return new Promise((resolve) => {
    if (reduceMotion || !gsap) {
      loader.style.display = "none";
      return resolve();
    }
    const tl = gsap.timeline({ onComplete: resolve });
    tl.to(bar, { width: "100%", duration: 1.0, ease: "power2.inOut" })
      .to(loader.querySelector(".loader__word"), { y: -20, opacity: 0, duration: 0.4, ease: "power2.in" }, "-=0.1")
      .to(loader, { yPercent: -100, duration: 0.7, ease: "power4.inOut" }, "-=0.1")
      .set(loader, { display: "none" });
  });
}

/* ------------------------------------------------------------
   2. Smooth scrolling (Lenis) wired to ScrollTrigger
------------------------------------------------------------ */
function initSmoothScroll() {
  if (reduceMotion || typeof Lenis === "undefined") return;
  const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  lenis.on("scroll", () => ScrollTrigger && ScrollTrigger.update());
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ------------------------------------------------------------
   3. Navbar scroll state
------------------------------------------------------------ */
function initNav() {
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("nav--scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ------------------------------------------------------------
   4. Cursor glow + magnetic buttons
------------------------------------------------------------ */
function initCursor() {
  const glow = document.getElementById("cursorGlow");
  if (!glow || reduceMotion) { if (glow) glow.style.display = "none"; return; }
  let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y;
  window.addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; });
  const loop = () => { x += (tx - x) * 0.12; y += (ty - y) * 0.12; glow.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`; requestAnimationFrame(loop); };
  loop();
}

function initMagnetic() {
  if (reduceMotion) return;
  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    const strength = 0.35;
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const mx = e.clientX - (r.left + r.width / 2);
      const my = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${mx * strength}px, ${my * strength}px)`;
    });
    el.addEventListener("mouseleave", () => { el.style.transform = ""; });
  });
}

/* ------------------------------------------------------------
   5. Hero word + reveal animations
------------------------------------------------------------ */
function initHeroIntro() {
  if (!gsap || reduceMotion) {
    document.querySelectorAll("[data-word], .hero__inner [data-reveal]").forEach((el) => (el.style.opacity = 1));
    return;
  }
  gsap.from("[data-word]", { yPercent: 120, opacity: 0, duration: 0.9, stagger: 0.12, ease: "power4.out", delay: 0.1 });
  gsap.set("[data-word]", { opacity: 1 });
  gsap.from(".hero__inner [data-reveal]", { y: 24, opacity: 0, duration: 0.8, stagger: 0.12, ease: "power3.out", delay: 0.5 });
  gsap.set(".hero__inner [data-reveal]", { opacity: 1 });
}

function initReveals() {
  if (!gsap || !ScrollTrigger) {
    document.querySelectorAll("[data-reveal]").forEach((el) => (el.style.opacity = 1));
    return;
  }
  document.querySelectorAll("[data-reveal]").forEach((el) => {
    if (el.closest(".hero__inner")) return; // handled by hero intro
    gsap.fromTo(el, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
  });
}

/* ------------------------------------------------------------
   6. Hero parallax layer
------------------------------------------------------------ */
function initParallax() {
  if (!gsap || !ScrollTrigger || reduceMotion) return;
  document.querySelectorAll("[data-parallax]").forEach((el) => {
    const depth = parseFloat(el.dataset.parallax) || 0.1;
    gsap.to(el, { yPercent: depth * 100, ease: "none",
      scrollTrigger: { trigger: el.closest("section"), start: "top top", end: "bottom top", scrub: true } });
  });
}

/* ------------------------------------------------------------
   7. Product grid (random order each load)
------------------------------------------------------------ */
const PRODUCTS = [
  { name: "Aero Jogger", price: 88, desc: "Featherlight 4-way stretch", tag: "New" },
  { name: "Velocity Cargo", price: 96, desc: "Tapered tech cargo", tag: "Hot" },
  { name: "Drift Fleece", price: 74, desc: "Brushed cloud fleece", tag: null },
  { name: "Pulse Track", price: 82, desc: "Retro side-stripe", tag: "New" },
  { name: "Shadow Slim", price: 90, desc: "Sculpted matte black", tag: null },
  { name: "Nimbus Lounge", price: 68, desc: "Sunday-soft knit", tag: "Sale" },
  { name: "Carbon Flex", price: 104, desc: "Water-repellent shell", tag: "New" },
  { name: "Sprint Mesh", price: 86, desc: "Ventilated runner cut", tag: null },
];

function buildProducts() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;
  const order = shuffle(PRODUCTS.map((_, i) => i));
  order.forEach((pIndex, slot) => {
    const p = PRODUCTS[pIndex];
    const imgIndex = Math.floor(Math.random() * 16); // random photo
    const card = document.createElement("article");
    card.className = "card";
    card.setAttribute("data-tilt", "");

    const media = document.createElement("div");
    media.className = "card__media";
    if (p.tag) {
      const tag = document.createElement("span");
      tag.className = "card__tag";
      tag.textContent = p.tag;
      media.appendChild(tag);
    }
    media.appendChild(buildImage(imgIndex, { w: 600, h: 800, alt: p.name }));
    const shine = document.createElement("div");
    shine.className = "card__shine";
    media.appendChild(shine);

    const body = document.createElement("div");
    body.className = "card__body";
    body.innerHTML = `
      <div class="card__row">
        <span class="card__name">${p.name}</span>
        <span class="card__price">$${p.price}</span>
      </div>
      <span class="card__desc">${p.desc}</span>
      <button class="card__add" type="button">Add to cart</button>`;

    card.appendChild(media);
    card.appendChild(body);
    grid.appendChild(card);

    // reveal on scroll
    if (gsap && ScrollTrigger && !reduceMotion) {
      gsap.fromTo(card, { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: (slot % 4) * 0.06,
        scrollTrigger: { trigger: card, start: "top 90%" },
      });
    }
  });
  initTilt();
  initAddToCart();
}

/* ------------------------------------------------------------
   8. 3D tilt + shine on cards
------------------------------------------------------------ */
function initTilt() {
  if (reduceMotion) return;
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    const media = card.querySelector(".card__media");
    const shine = card.querySelector(".card__shine");
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (0.5 - py) * 12;
      const ry = (px - 0.5) * 14;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
      if (shine) { shine.style.setProperty("--mx", `${px * 100}%`); shine.style.setProperty("--my", `${py * 100}%`); }
    });
    card.addEventListener("mouseleave", () => { card.style.transform = ""; });
  });
}

/* ------------------------------------------------------------
   9. Add-to-cart micro-interaction
------------------------------------------------------------ */
let cart = 0;
function initAddToCart() {
  const count = document.getElementById("cartCount");
  document.querySelectorAll(".card__add").forEach((btn) => {
    btn.addEventListener("click", () => {
      cart++;
      count.textContent = cart;
      btn.textContent = "Added ✓";
      btn.classList.add("added");
      if (gsap && !reduceMotion) gsap.fromTo(count, { scale: 1.6 }, { scale: 1, duration: 0.4, ease: "back.out(3)" });
      setTimeout(() => { btn.textContent = "Add to cart"; btn.classList.remove("added"); }, 1400);
    });
  });
}

/* ------------------------------------------------------------
   10. Scroll-story (pinned, scrubbed image reveals)
------------------------------------------------------------ */
function initStory() {
  const imgs = document.querySelectorAll("[data-story-img]");
  imgs.forEach((el, i) => { el.style.backgroundImage = `url("${joggerDataUri(i + 2, 700, 880)}")`; });
  // try real photos on top
  imgs.forEach((el, i) => {
    const probe = new Image();
    const idx = i * 3 + 1;
    const url = `https://images.unsplash.com/photo-${["1483721310020-03333e577078","1571019613454-1cb2f99b2d8b","1552902865-b72c031ac5ea"][i % 3]}?auto=format&fit=crop&w=700&h=880&q=70`;
    probe.onload = () => { el.style.backgroundImage = `url("${url}")`; };
    probe.src = url;
  });

  if (!gsap || !ScrollTrigger || reduceMotion) return;
  const pin = document.querySelector(".story__pin");
  if (!pin) return;
  gsap.set(imgs, { rotate: (i) => (i - 1) * 6, scale: 0.9, opacity: 0, xPercent: (i) => (i - 1) * 18 });
  const tl = gsap.timeline({
    scrollTrigger: { trigger: ".story", start: "top top", end: "+=120%", pin: true, scrub: 1 },
  });
  tl.to(imgs, { opacity: 1, scale: 1, xPercent: 0, rotate: 0, stagger: 0.25, ease: "power2.out" })
    .from(".story__text > *", { y: 40, opacity: 0, stagger: 0.15, ease: "power2.out" }, "-=0.4");
}

/* ------------------------------------------------------------
   11. Lookbook collage (random images + stagger reveal)
------------------------------------------------------------ */
function buildCollage() {
  const wrap = document.getElementById("collage");
  if (!wrap) return;
  const count = 9;
  const sizes = [[600, 800], [600, 600], [600, 900], [600, 750]];
  const order = shuffle(Array.from({ length: 16 }, (_, i) => i)).slice(0, count);
  order.forEach((idx, i) => {
    const [w, h] = sizes[Math.floor(Math.random() * sizes.length)];
    const item = document.createElement("figure");
    item.className = "collage__item";
    item.appendChild(buildImage(idx, { w, h, alt: "Lookbook" }));
    wrap.appendChild(item);
    if (gsap && ScrollTrigger && !reduceMotion) {
      const dir = i % 2 ? 50 : -50;
      gsap.fromTo(item, { x: dir, y: 40, opacity: 0 }, {
        x: 0, y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: item, start: "top 92%" },
      });
    }
  });
}

/* ------------------------------------------------------------
   12. Reviews carousel
------------------------------------------------------------ */
const REVIEWS = [
  { stars: "★★★★★", text: "Lightest joggers I’ve ever worn. Feels like wearing nothing.", who: "— Maya R., verified" },
  { stars: "★★★★★", text: "The fit is unreal. Got two more the next week.", who: "— Devon K., verified" },
  { stars: "★★★★☆", text: "Super soft and the colour is exactly as shown. Sizing runs true.", who: "— Aisha B., verified" },
  { stars: "★★★★★", text: "Wore them on a 10k and to dinner after. That’s the whole point.", who: "— Leo M., verified" },
];

function buildReviews() {
  const track = document.getElementById("reviewTrack");
  const dotsWrap = document.getElementById("reviewDots");
  if (!track) return;
  REVIEWS.forEach((r) => {
    const el = document.createElement("blockquote");
    el.className = "review";
    el.innerHTML = `<span class="review__stars">${r.stars}</span><p class="review__text">${r.text}</p><cite class="review__who">${r.who}</cite>`;
    track.appendChild(el);
  });
  let index = 0;
  const dots = REVIEWS.map((_, i) => {
    const b = document.createElement("button");
    b.type = "button"; b.setAttribute("aria-label", `Review ${i + 1}`);
    b.addEventListener("click", () => go(i));
    dotsWrap.appendChild(b);
    return b;
  });
  function go(i) {
    index = i;
    const card = track.children[0];
    const gap = 24;
    const step = card.getBoundingClientRect().width + gap;
    track.style.transform = `translateX(${-i * step}px)`;
    dots.forEach((d, di) => d.classList.toggle("active", di === i));
  }
  go(0);
  setInterval(() => go((index + 1) % REVIEWS.length), 4500);
  window.addEventListener("resize", () => go(index));
}

/* ------------------------------------------------------------
   13. Newsletter
------------------------------------------------------------ */
function initNewsletter() {
  const form = document.getElementById("newsForm");
  const msg = document.getElementById("newsMsg");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    msg.textContent = "You’re in. Welcome to the stride. ⚡";
    form.reset();
    if (gsap && !reduceMotion) gsap.fromTo(msg, { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 });
  });
}

/* ------------------------------------------------------------
   Boot
------------------------------------------------------------ */
async function boot() {
  buildProducts();
  buildCollage();
  buildReviews();
  initStory();
  initNav();
  initCursor();
  initMagnetic();
  initNewsletter();
  initParallax();
  initReveals();
  await runLoader();
  initHeroIntro();
  initSmoothScroll();
  if (ScrollTrigger) ScrollTrigger.refresh();
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
else boot();
