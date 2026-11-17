"""Banda sonora del estilo collage: música lo-fi sintetizada por código + efectos de papel/rotulador
sincronizados con events.json + voz. Sin samples externos (todo generado aquí).
Uso: python3 audio.py episodes/<id> <LEAD>   -> escribe mix_tmp.wav en la carpeta del episodio.
"""
import json, os, subprocess, sys
import numpy as np
from scipy.signal import butter, sosfilt

SR = 44100
ep, LEAD = sys.argv[1], float(sys.argv[2])
timing = json.load(open(os.path.join(ep, "timing.json")))
events = json.load(open(os.path.join(ep, "events.json")))
script = json.load(open(os.path.join(ep, "script.json")))
DUR = timing["duration"] + LEAD + 0.2
N = int(DUR * SR)
rng = np.random.default_rng(7)

def bp(x, lo, hi): return sosfilt(butter(2, [lo, hi], "bandpass", fs=SR, output="sos"), x)
def hp(x, f): return sosfilt(butter(2, f, "highpass", fs=SR, output="sos"), x)
def lp(x, f): return sosfilt(butter(2, f, "lowpass", fs=SR, output="sos"), x)
def env(n, a=0.002, d=0.2):
    t = np.arange(n) / SR
    return np.minimum(t / a, 1) * np.exp(-t / d)
def add(buf, x, t, g=1.0):
    i = int(t * SR)
    if i >= len(buf) or i + len(x) <= 0: return
    if i < 0: x, i = x[-i:], 0
    m = min(len(x), len(buf) - i); buf[i:i + m] += x[:m] * g
def noise(sec): return rng.standard_normal(int(sec * SR))

# ---------- música (lo-fi cálido, 92 BPM, La menor) ----------
BPM = 92; beat = 60 / BPM; bar = beat * 4
music = np.zeros(N)
def kick():
    n = int(.35 * SR); t = np.arange(n) / SR
    f = 45 + 70 * np.exp(-t * 30); return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, .001, .18)
def snare():
    x = noise(.22); return (bp(x, 1200, 5000) * .7 + bp(x, 180, 400) * .5) * env(len(x), .001, .07)
def hat(o=False):
    x = noise(.12 if o else .05); return hp(x, 7000) * env(len(x), .0005, .05 if o else .015)
def note(f, sec, d=.6, bright=3):
    n = int(sec * SR); t = np.arange(n) / SR
    s = sum(np.sin(2 * np.pi * f * k * t) / k ** bright for k in range(1, 5))
    return s * env(n, .01, d) * (1 + .003 * np.sin(2 * np.pi * 5 * t))
CH = [(57, [57, 60, 64, 67]), (53, [53, 57, 60, 64]), (48, [55, 60, 64, 67]), (55, [55, 59, 62, 66])]  # Am7 Fmaj7 C(add9) G
mf = lambda m: 440 * 2 ** ((m - 69) / 12)
tear = next((timing["scenes"][i]["start"] for i, s in enumerate(script["scenes"]) if s.get("transition") == "tear"), None)
t0, b = 0.0, 0
while t0 < DUR:
    root, ch = CH[b % 4]
    for k in range(4):
        tb = t0 + k * beat
        brk = tear is not None and tear + LEAD - beat * 1.2 < tb < tear + LEAD   # silencio justo antes del desgarro
        if brk: continue
        if k in (0, 2) or (k == 3 and b % 2): add(music, kick(), tb, .9)
        if k in (1, 3) and b >= 1: add(music, snare(), tb + .012, .45)
        for h in range(2):
            if b >= 1: add(music, hat(h == 1 and k == 3), tb + h * beat / 2 + (0.03 if h else 0), .22 + .08 * h)
        add(music, note(mf(root - 12), beat * .9, .35, 2), tb + (beat / 2 if k == 3 else 0), .55)
    for j, m in enumerate(ch): add(music, note(mf(m), bar, 1.4, 2.6), t0 + j * .018, .11)       # acorde rasgueado suave
    t0 += bar; b += 1
music = lp(music, 5200)
crackle = np.zeros(N); idx = rng.integers(0, N, int(DUR * 9)); crackle[idx] = rng.standard_normal(len(idx)) * .5
music += hp(crackle, 2000) * .5 + lp(noise(DUR + 1)[:N], 900) * .006
fade = np.ones(N); fl = int(1.2 * SR); fade[-fl:] = np.linspace(1, 0, fl); fade[:int(.02 * SR)] = np.linspace(0, 1, int(.02 * SR))
music *= fade

# ---------- efectos ----------
def mixl(a, b):
    n = max(len(a), len(b)); o = np.zeros(n); o[:len(a)] += a; o[:len(b)] += b; return o
def sfx(k):
    if k == "tape":  x = noise(.12); return bp(x, 1500, 7000) * env(len(x), .002, .04) * (1 + np.sign(np.sin(np.arange(len(x)) / SR * 2 * np.pi * 90)))*.5
    if k == "slam":  return mixl(kick() * .9, bp(noise(.15), 300, 3000) * env(int(.15 * SR), .001, .04) * .6)
    if k == "marker":
        x = noise(.38); t = np.arange(len(x)) / SR; return bp(x, 2500, 5500) * (.5 + .5 * np.sin(2 * np.pi * 11 * t)) * env(len(x), .02, .25) * .5
    if k == "stick": x = noise(.09); return bp(x, 500, 2500) * env(len(x), .001, .025) * 1.2
    if k == "stamp": return mixl(kick() * 1.3, bp(noise(.25), 150, 2500) * env(int(.25 * SR), .001, .06) * .9)
    if k == "snap":  x = noise(.06); return hp(x, 2500) * env(len(x), .0003, .012) * 2.2
    if k == "rip":
        x = noise(.5); t = np.arange(len(x)) / SR; gr = (rng.random(len(x)) < .08) * 1.0
        return bp(x * (.3 + gr), 900, 6000) * np.minimum(t / .03, 1) * np.exp(-((t - .2) ** 2) / .03) * 1.2
    if k == "cut":   x = noise(.18); t = np.arange(len(x)) / SR; return bp(x, 400, 3500) * np.sin(np.pi * t / .18) * .35
    if k == "pop":
        n = int(.09 * SR); t = np.arange(n) / SR; return np.sin(2 * np.pi * np.cumsum(300 + 9000 * t) / SR) * env(n, .001, .03)
    return np.zeros(10)
fx = np.zeros(N)
GAIN = {"tape": .35, "slam": .55, "marker": .25, "stick": .5, "stamp": .8, "snap": .7, "rip": .7, "cut": .45, "pop": .5}
for e in events: add(fx, sfx(e["k"]), e["t"] + LEAD, GAIN.get(e["k"], .4))

# ---------- voz + ducking ----------
wav = os.path.join(ep, "voice_tmp.wav")
subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", os.path.join(ep, "voice.mp3"), "-ac", "1", "-ar", str(SR), "-f", "f32le", wav], check=True)
v = np.fromfile(wav, dtype=np.float32).astype(np.float64); os.remove(wav)
voice = np.zeros(N); add(voice, v, LEAD)
e_ = np.sqrt(np.maximum(lp(voice ** 2, 8), 0)); e_ = np.clip(e_ / (e_.max() + 1e-9) * 6, 0, 1)
duck = 1 - .55 * lp(e_, 3)
mix = voice * 1.0 + music * .16 * duck + fx * .5
mix /= max(1e-9, np.abs(mix).max()) / .95
st = np.stack([mix, mix], 1)
import wave
with wave.open(os.path.join(ep, "mix_tmp.wav"), "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st * 32767).astype("<i2").tobytes())
print("audio ok", f"{DUR:.1f}s", len(events), "efectos")
