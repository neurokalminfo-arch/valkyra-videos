// Uso: node render.js episodes/<id> [--preview 2.5,8,14]
const { chromium } = require('playwright');
const { spawn, execFileSync } = require('child_process');
const fs = require('fs'), path = require('path');
const ep = path.resolve(process.argv[2]);
const prev = process.argv[3] === '--preview' ? process.argv[4].split(',').map(Number) : null;
const coverMode = process.argv[3] === '--cover';
let script = JSON.parse(fs.readFileSync(path.join(ep, 'script.json')));
let timing = JSON.parse(fs.readFileSync(path.join(ep, 'timing.json')));
if (coverMode) { // portada: una sola escena con el texto de 'cover' (o la primera escena)
  const c = script.cover || script.scenes[0];
  const zone = c.zone !== undefined ? c.zone : (script.account === 'oficial' ? { type: 'guy', pose: 'wave' } : { type: 'pendant' });
  script = { ...script, cover: true, scenes: [{ kicker: c.kicker, title: c.title, zone }] };
  timing = { scenes: [{ start: 0, end: 99, end_speech: 99, words: [] }], duration: 99 };
}
const FPS = 30, LEAD = 0.3, dur = timing.duration + LEAD;

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.addInitScript(d => { window.DATA = d; }, { script, timing });
  await p.goto('file://' + path.join(__dirname, 'template.html'));
  await p.evaluate(() => document.fonts.ready);
  if (coverMode) {
    await p.evaluate(() => { document.body.classList.add('cover'); render(20); });
    await p.screenshot({ path: path.join(ep, 'cover.jpg'), type: 'jpeg', quality: 90 });
    await b.close(); console.log('ok', path.join(ep, 'cover.jpg')); return;
  }
  if (prev) {
    for (const t of prev) { await p.evaluate(t => render(t), t); await p.screenshot({ path: path.join(ep, `prev_${t}.jpg`), type: 'jpeg', quality: 85 }); }
    await b.close(); return;
  }
  const tmp = path.join(ep, 'video_tmp.mp4'), silent = path.join(ep, 'silent_tmp.mp4');
  const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-pix_fmt', 'yuv420p', silent], { stdio: ['pipe', 'inherit', 'inherit'] });
  const N = Math.ceil(dur * FPS);
  for (let f = 0; f < N; f++) {
    await p.evaluate(t => render(t), f / FPS - LEAD);
    const buf = await p.screenshot({ type: 'jpeg', quality: 92 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await b.close();
  execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', silent, '-i', path.join(ep, 'voice.mp3'), '-map', '0:v', '-map', '1:a', '-c:v', 'copy',
    '-af', `adelay=${LEAD * 1000}|${LEAD * 1000},apad,loudnorm=I=-14:TP=-1.5:LRA=11`, '-ar', '44100', '-c:a', 'aac', '-b:a', '192k', '-shortest', tmp]);
  fs.renameSync(tmp, path.join(ep, 'final.mp4')); fs.unlinkSync(silent);
  console.log('ok', path.join(ep, 'final.mp4'), dur.toFixed(1) + 's');
})();
