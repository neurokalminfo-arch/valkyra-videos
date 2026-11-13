// Capa cinemática: fondos animados dibujados con código (canvas 1080x1920).
// Uso en script.json, por escena: "bg": {"type": "space|sunrise|sunset|night|smoke|rain|glow", ...opciones}
// Opciones: orb (bola de luz central), warp (rayos de velocidad al entrar), palm (palmera), embers (brasas en humo)
(function () {
  const W = 1080, H = 1920;
  function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  const STARS = (() => { const r = rng(7); return Array.from({ length: 360 }, () => ({ x: r() * W, y: r() * H, s: r() * 2.6 + 0.4, p: r() * 6.28, f: 0.6 + r() * 2.2 })); })();
  const PUFFS = (() => { const r = rng(11); return Array.from({ length: 46 }, () => ({ x: r(), d: r(), s: 0.6 + r() * 0.8, w: r() * 6.28, v: 0.5 + r() * 0.7 })); })();
  const DROPS = (() => { const r = rng(5); return Array.from({ length: 160 }, () => ({ x: r() * W, y: r() * H, l: 20 + r() * 50, v: 900 + r() * 700, a: 0.1 + r() * 0.25 })); })();
  const BOKEH = (() => { const r = rng(3); return Array.from({ length: 34 }, () => ({ x: r() * W, y: r() * H, r: 30 + r() * 110, h: r(), p: r() * 6.28 })); })();
  const RAYS = (() => { const r = rng(9); return Array.from({ length: 140 }, () => ({ a: r() * 6.28, d: r(), l: 0.1 + r() * 0.3 })); })();

  function grad(ctx, y0, y1, stops) { const g = ctx.createLinearGradient(0, y0, 0, y1); stops.forEach(([o, c]) => g.addColorStop(o, c)); return g; }
  function orb(ctx, x, y, r, t, warm) {
    const pulse = 1 + 0.03 * Math.sin(t * 2.3);
    let g = ctx.createRadialGradient(x, y, 0, x, y, r * 3.2 * pulse);
    g.addColorStop(0, warm ? 'rgba(255,190,90,.55)' : 'rgba(255,214,140,.5)'); g.addColorStop(0.35, 'rgba(255,140,60,.18)'); g.addColorStop(1, 'rgba(255,120,40,0)');
    ctx.fillStyle = g; ctx.fillRect(x - r * 4, y - r * 4, r * 8, r * 8);
    g = ctx.createRadialGradient(x - r * 0.2, y - r * 0.2, r * 0.05, x, y, r);
    g.addColorStop(0, '#FFFBEA'); g.addColorStop(0.45, '#FFD27A'); g.addColorStop(0.85, '#F39A3E'); g.addColorStop(1, 'rgba(230,120,40,.9)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * pulse, 0, 7); ctx.fill();
  }
  function stars(ctx, t, a, drift) {
    STARS.forEach(s => {
      const tw = 0.45 + 0.55 * Math.sin(t * s.f + s.p);
      ctx.globalAlpha = a * tw; ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(s.x, (s.y + t * drift * s.s) % H, s.s, 0, 7); ctx.fill();
    });
    ctx.globalAlpha = 1;
  }
  function palm(ctx, x, y, sc, t) {
    ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); ctx.fillStyle = '#120b14'; ctx.strokeStyle = '#120b14';
    ctx.beginPath(); ctx.moveTo(-14, 0); ctx.quadraticCurveTo(10, -380, 70, -700); ctx.lineTo(84, -698); ctx.quadraticCurveTo(30, -380, 14, 0); ctx.fill();
    const sway = Math.sin(t * 1.1) * 0.05;
    for (let i = 0; i < 9; i++) {
      const ang = -Math.PI / 2 + (i - 4) * 0.42 + sway, len = 300 + (i % 3) * 40;
      ctx.save(); ctx.translate(77, -700); ctx.rotate(ang);
      ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(len * 0.5, -40, len, 60 + Math.abs(i - 4) * 18); ctx.stroke();
      ctx.lineWidth = 4;
      for (let k = 1; k < 16; k++) { const u = k / 16, px = len * u, py = -40 * 2 * u * (1 - u) + (60 + Math.abs(i - 4) * 18) * u * u; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + 22, py + 70 * (1 - u * 0.5)); ctx.moveTo(px, py); ctx.lineTo(px + 22, py - 40 * (1 - u * 0.6)); ctx.stroke(); }
      ctx.restore();
    }
    ctx.restore();
  }
  function seaShimmer(ctx, x, yTop, yBot, t, col) {
    for (let y = yTop; y < yBot; y += 9) {
      const k = (y - yTop) / (yBot - yTop), w = 60 + 300 * k;
      for (let j = 0; j < 3; j++) {
        const off = (Math.sin(y * 0.07 + t * 2.2 + j * 2) * 0.6 + Math.sin(y * 0.31 + j * 5.1) * 0.5) * w, len = (20 + 60 * Math.abs(Math.sin(y * 0.13 + t * 1.7 + j))) * (0.5 + k);
        ctx.globalAlpha = 0.25 + 0.5 * Math.abs(Math.sin(y * 0.21 + t * 3 + j)); ctx.fillStyle = col;
        ctx.fillRect(x + off - len / 2, y, len, 3 + 3 * k);
      }
    }
    ctx.globalAlpha = 1;
  }
  function sky(ctx, set, t, lt, o) {
    const hz = 1180;
    ctx.fillStyle = grad(ctx, 0, hz, set ? [[0, '#1b1036'], [0.38, '#7a2a5a'], [0.7, '#e2553f'], [1, '#ffb35a']] : [[0, '#241a4f'], [0.4, '#a3416e'], [0.72, '#f2875a'], [1, '#ffdc8a']]);
    ctx.fillRect(0, 0, W, hz);
    for (let i = 0; i < 7; i++) { // nubes alargadas
      const y = 380 + i * 105, x = ((i * 233 + t * (14 + i * 3)) % (W + 900)) - 450;
      ctx.globalAlpha = 0.16; ctx.fillStyle = set ? '#ff9a7a' : '#ffc4a0';
      ctx.beginPath(); ctx.ellipse(x, y, 420, 16 + i * 2, 0, 0, 7); ctx.fill();
    }
    ctx.globalAlpha = 1;
    const sy = set ? 900 + 220 * Math.min(1, lt / 8) : 1260 - 190 * Math.min(1, lt / 6);
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, hz); ctx.clip(); orb(ctx, 400, sy, 92, t, set); ctx.restore();
    ctx.fillStyle = grad(ctx, hz, 1640, set ? [[0, '#5a2440'], [1, '#160c22']] : [[0, '#7a3a5c'], [1, '#22142e']]); ctx.fillRect(0, hz, W, 460);
    seaShimmer(ctx, 400, hz + 8, 1630, t, set ? '#ffb06a' : '#ffd08a');
    ctx.fillStyle = grad(ctx, hz - 30, hz + 40, [[0, 'rgba(255,220,150,0)'], [0.5, 'rgba(255,220,150,.35)'], [1, 'rgba(255,220,150,0)']]); ctx.fillRect(0, hz - 30, W, 70);
    ctx.fillStyle = grad(ctx, 1620, H, [[0, '#d8915a'], [1, '#8a4a34']]);
    ctx.beginPath(); ctx.moveTo(0, 1650); for (let x = 0; x <= W; x += 40) ctx.lineTo(x, 1630 + 14 * Math.sin(x * 0.01 + 1)); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill();
    if (o.palm !== false) palm(ctx, 960, 1900, 0.82, t);
  }

  const DRAW = {
    space(ctx, t, lt, o) {
      ctx.fillStyle = grad(ctx, 0, H, [[0, '#04060f'], [0.5, '#0b1030'], [1, '#05060c']]); ctx.fillRect(0, 0, W, H);
      [[260, 600, 520, 'rgba(90,70,190,.22)'], [820, 1300, 600, 'rgba(40,90,180,.2)'], [500, 1000, 420, 'rgba(160,60,140,.12)']].forEach(([x, y, r, c]) => {
        const g = ctx.createRadialGradient(x + 30 * Math.sin(t * .2), y, 0, x, y, r); g.addColorStop(0, c); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      });
      stars(ctx, t, 0.9, 4);
      if (o.warp && lt < 1.6) { // rayos de velocidad (efecto "zoom" del espacio)
        const k = 1 - lt / 1.6; ctx.strokeStyle = '#cfe0ff';
        RAYS.forEach(r => { const d0 = ((r.d + lt * 1.4) % 1) * 1100, d1 = d0 + r.l * 900 * k; ctx.globalAlpha = 0.5 * k; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(540 + Math.cos(r.a) * d0, 960 + Math.sin(r.a) * d0); ctx.lineTo(540 + Math.cos(r.a) * d1, 960 + Math.sin(r.a) * d1); ctx.stroke(); });
        ctx.globalAlpha = 1;
      }
      if (o.orb) orb(ctx, 540, 1000, 120, t);
    },
    sunrise(ctx, t, lt, o) { sky(ctx, false, t, lt, o); },
    sunset(ctx, t, lt, o) { sky(ctx, true, t, lt, o); },
    night(ctx, t, lt, o) {
      ctx.fillStyle = grad(ctx, 0, H, [[0, '#03050c'], [0.6, '#0d1730'], [1, '#1a2340']]); ctx.fillRect(0, 0, W, H);
      stars(ctx, t, 0.8, 0);
      const g = ctx.createRadialGradient(840, 680, 0, 840, 680, 380); g.addColorStop(0, 'rgba(200,215,255,.28)'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#EEF1FA'; ctx.beginPath(); ctx.arc(840, 680, 70, 0, 7); ctx.fill();
      ctx.fillStyle = '#0d1730'; ctx.beginPath(); ctx.arc(866, 662, 62, 0, 7); ctx.fill();
      const r = rng(21); let x = -20; ctx.fillStyle = '#05070d';
      const bl = [];
      while (x < W) { const w = 70 + r() * 110, h = 260 + r() * 420; ctx.fillRect(x, H - h, w, h); bl.push([x, w, h]); x += w + 6; }
      bl.forEach(([bx, w, h], i) => { const rr = rng(100 + i); for (let yy = H - h + 30; yy < H - 30; yy += 46) for (let xx = bx + 14; xx < bx + w - 20; xx += 30) { if (rr() < 0.32) { ctx.globalAlpha = rr() < 0.08 ? 0.4 + 0.5 * Math.abs(Math.sin(t * 2 + xx)) : 0.85; ctx.fillStyle = '#F6C66B'; ctx.fillRect(xx, yy, 12, 18); } } });
      ctx.globalAlpha = 1;
    },
    smoke(ctx, t, lt, o) {
      ctx.fillStyle = grad(ctx, 0, H, [[0, '#0b0a0c'], [1, '#1d1714']]); ctx.fillRect(0, 0, W, H);
      PUFFS.forEach(p => {
        const life = (p.d + t * 0.05 * p.v) % 1, y = 1750 - life * 1700, x = 540 + (p.x - 0.5) * 260 * (0.3 + life * 2.2) + 90 * Math.sin(t * 0.6 + p.w + life * 4);
        const r = (80 + life * 330) * p.s, a = 0.16 * Math.sin(Math.PI * life);
        const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, `rgba(200,195,190,${a})`); g.addColorStop(1, 'rgba(200,195,190,0)'); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
      });
      if (o.embers !== false) { const g = ctx.createRadialGradient(540, 1780, 0, 540, 1780, 260); g.addColorStop(0, `rgba(255,120,40,${0.35 + 0.1 * Math.sin(t * 5)})`); g.addColorStop(1, 'rgba(255,90,20,0)'); ctx.fillStyle = g; ctx.fillRect(0, 1500, W, 420); }
    },
    rain(ctx, t, lt, o) {
      ctx.fillStyle = grad(ctx, 0, H, [[0, '#0c121b'], [1, '#18222e']]); ctx.fillRect(0, 0, W, H);
      BOKEH.forEach(b => { const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r); const c = b.h < 0.5 ? '255,180,90' : '120,170,255'; g.addColorStop(0, `rgba(${c},${0.14 + 0.06 * Math.sin(t + b.p)})`); g.addColorStop(1, `rgba(${c},0)`); ctx.fillStyle = g; ctx.fillRect(b.x - b.r, b.y - b.r, 2 * b.r, 2 * b.r); });
      ctx.strokeStyle = '#cfe0f5'; ctx.lineWidth = 2;
      DROPS.forEach(d => { const y = (d.y + t * d.v) % (H + 100) - 50; ctx.globalAlpha = d.a; ctx.beginPath(); ctx.moveTo(d.x, y); ctx.lineTo(d.x - 6, y + d.l); ctx.stroke(); });
      ctx.globalAlpha = 1;
    },
    glow(ctx, t, lt, o) { // cálido y luminoso (amanecer en casa, calma)
      ctx.fillStyle = grad(ctx, 0, H, [[0, '#2a1a22'], [0.55, '#6b3a3a'], [1, '#c77a4e']]); ctx.fillRect(0, 0, W, H);
      BOKEH.forEach(b => { const y = (b.y - t * 18 * (0.5 + b.h)) % H; const yy = y < 0 ? y + H : y; const g = ctx.createRadialGradient(b.x, yy, 0, b.x, yy, b.r); g.addColorStop(0, `rgba(255,210,150,${0.12 + 0.08 * Math.sin(t * .8 + b.p)})`); g.addColorStop(1, 'rgba(255,210,150,0)'); ctx.fillStyle = g; ctx.fillRect(b.x - b.r, yy - b.r, 2 * b.r, 2 * b.r); });
      if (o.orb) orb(ctx, 540, 1050, 110, t);
    }
  };

  // Viñeta + grano suave para el acabado "cine"
  const NOISE = (() => { const c = document.createElement('canvas'); c.width = c.height = 256; const x = c.getContext('2d'); const d = x.createImageData(256, 256); const r = rng(1); for (let i = 0; i < d.data.length; i += 4) { const v = r() * 255; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 18; } x.putImageData(d, 0, 0); return c; })();
  function finish(ctx, t) {
    const g = ctx.createRadialGradient(540, 900, 500, 540, 960, 1300); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.55)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    const ox = Math.floor((t * 97) % 256), oy = Math.floor((t * 61) % 256);
    ctx.save(); ctx.translate(-ox, -oy); ctx.fillStyle = ctx.createPattern(NOISE, 'repeat'); ctx.fillRect(0, 0, W + 256, H + 256); ctx.restore();
  }

  // layers: [{bg, lt, alpha, zoom}]
  window.CINE = {
    types: Object.keys(DRAW),
    draw(canvas, t, layers) {
      const ctx = canvas.getContext('2d'); ctx.clearRect(0, 0, W, H);
      layers.forEach(L => {
        if (!L.alpha || !DRAW[L.bg.type]) return;
        ctx.save(); ctx.globalAlpha = 1;
        const tmp = L.canvas || (L.canvas = Object.assign(document.createElement('canvas'), { width: W, height: H }));
        const c2 = tmp.getContext('2d'); c2.clearRect(0, 0, W, H);
        c2.save(); const z = L.zoom || 1; c2.translate(W / 2, H / 2); c2.scale(z, z); c2.translate(-W / 2, -H / 2);
        DRAW[L.bg.type](c2, t, L.lt, L.bg); c2.restore(); finish(c2, t);
        ctx.globalAlpha = L.alpha; ctx.drawImage(tmp, 0, 0); ctx.restore();
      });
    }
  };
})();
