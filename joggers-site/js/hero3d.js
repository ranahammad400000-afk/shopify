/* ============================================================
   hero3d.js — floating 3D objects behind the hero (Three.js)
   Falls back silently if WebGL / module load is unavailable.
   ============================================================ */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

async function initHero3D() {
  const canvas = document.getElementById("hero3d");
  if (!canvas || reduceMotion) return;

  let THREE;
  try {
    THREE = await import("three");
  } catch (e) {
    return; // CDN blocked — gradient background still carries the hero
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 7;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  // Lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const key = new THREE.DirectionalLight(0xc6ff3a, 2.2); key.position.set(5, 6, 5); scene.add(key);
  const rim = new THREE.DirectionalLight(0x7a5cff, 2.0); rim.position.set(-6, -3, 4); scene.add(rim);
  const fill = new THREE.PointLight(0xff5c8a, 1.4, 30); fill.position.set(0, -4, 6); scene.add(fill);

  // Floating objects
  const group = new THREE.Group();
  scene.add(group);
  const palette = [0xc6ff3a, 0x7a5cff, 0xff5c8a, 0x22d3ee, 0xffffff];
  const geos = [
    new THREE.IcosahedronGeometry(0.9, 0),
    new THREE.TorusGeometry(0.7, 0.26, 24, 60),
    new THREE.OctahedronGeometry(0.95, 0),
    new THREE.TorusKnotGeometry(0.55, 0.18, 90, 14),
    new THREE.DodecahedronGeometry(0.85, 0),
  ];
  const meshes = [];
  for (let i = 0; i < 11; i++) {
    const geo = geos[i % geos.length];
    const mat = new THREE.MeshStandardMaterial({
      color: palette[i % palette.length],
      roughness: 0.25, metalness: 0.55, flatShading: true,
    });
    const m = new THREE.Mesh(geo, mat);
    const s = 0.5 + Math.random() * 0.9;
    m.scale.setScalar(s);
    m.position.set((Math.random() - 0.5) * 11, (Math.random() - 0.5) * 7, (Math.random() - 0.5) * 4 - 1);
    m.userData.spin = { x: (Math.random() - 0.5) * 0.01, y: (Math.random() - 0.5) * 0.012 };
    m.userData.float = Math.random() * Math.PI * 2;
    group.add(m);
    meshes.push(m);
  }

  // Pointer parallax
  const pointer = { x: 0, y: 0 };
  window.addEventListener("mousemove", (e) => {
    pointer.x = (e.clientX / innerWidth - 0.5) * 2;
    pointer.y = (e.clientY / innerHeight - 0.5) * 2;
  });

  function resize() {
    const w = canvas.clientWidth || innerWidth;
    const h = canvas.clientHeight || innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener("resize", resize);

  let running = true;
  document.addEventListener("visibilitychange", () => { running = !document.hidden; if (running) loop(); });

  const clock = new THREE.Clock();
  function loop() {
    if (!running) return;
    requestAnimationFrame(loop);
    const t = clock.getElapsedTime();
    meshes.forEach((m) => {
      m.rotation.x += m.userData.spin.x;
      m.rotation.y += m.userData.spin.y;
      m.position.y += Math.sin(t + m.userData.float) * 0.0015;
    });
    group.rotation.y += (pointer.x * 0.4 - group.rotation.y) * 0.04;
    group.rotation.x += (pointer.y * 0.25 - group.rotation.x) * 0.04;
    renderer.render(scene, camera);
  }
  loop();
}

initHero3D();
