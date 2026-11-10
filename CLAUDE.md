# Fábrica diaria de vídeos Valkyra

Cada ejecución crea 2 vídeos cortos (1080x1920, 25–35 s) y los deja programados en Metricool:
- **calma**: TikTok @calma.valkyra + Instagram @neurokalm (Reel) + YouTube (Short).
- **oficial**: TikTok @valkyra.oficial.

## Pasos de cada ejecución (slot `am` = 09:00, slot `pm` = 18:00, hora de Madrid)
1. Lee los temas ya usados: `grep -h '"topic"' episodes/*/script.json`. No repitas tema ni gancho de los últimos 30 días.
2. Escribe `episodes/AAAA-MM-DD-calma-<slot>/script.json` y `episodes/AAAA-MM-DD-oficial-<slot>/script.json` (formato abajo).
3. Para cada episodio: `python3 engine/tts.py <ep>` (necesita `ELEVENLABS_API_KEY`), luego `node engine/render.js <ep> --preview t1,t2,t3` y mira los fotogramas (texto completo, nada cortado, nada fuera de la zona segura). Corrige y repite. Después `node engine/render.js <ep>`.
4. `git add -A && git commit && git push origin main`. URL pública del vídeo:
   `https://raw.githubusercontent.com/neurokalminfo-arch/valkyra-videos/main/episodes/<id>/final.mp4` (comprueba con curl que da 200).
5. Programa en Metricool (`createScheduledPost`, `draft: false`, `autoPublish: true`, zona `Europe/Madrid`):
   - blogId **7796202** · providers `[tiktok]` · vídeo calma · `tiktokData.title` obligatorio · `isAigc: true`.
   - blogId **7738323** · providers `[instagram, youtube]` · vídeo calma · `instagramData: {type: REEL, showReelOnFeed: true, isAiGenerated: true}` · `youtubeData: {title: "<título> #shorts", type: short, privacy: public, category: HOWTO_STYLE, madeForKids: false, isAiGeneratedContent: false, tags: [...]}`.
   - blogId **7738323** · providers `[tiktok]` · vídeo oficial · `tiktokData.title` · `isAigc: true`.
   - Si Metricool da "internal error while storing the media", reintenta tras unos segundos (pasa a veces).
   - NO toques las marcas Fetbull, Airnaze ni La Gran Pregunta.

## Reglas de contenido (obligatorias)
- Se tiene que entender A LA PRIMERA que hablamos de **dejar de fumar** (cigarro, tabaco, piti). Nombrarlo en el texto en pantalla y en la voz. Nada de mensajes vagos.
- Contenido educativo, que aporte valor y conecte: situaciones concretas del día ("esto me pasa a mí"), trucos prácticos, mitos, recaídas, miedo a engordar, ansiedad, entorno, café, alcohol, estrés, después de comer, al despertar, en el coche, pausas del trabajo, noche, fines de semana, culpa, pequeñas victorias.
- **Muy poco** de respiración consciente (como mucho una frase de pasada, no en todos los vídeos).
- Valkyra aparece poco y de forma natural (el gesto de cambiar el cigarro por el collar), nunca como anuncio. Sin precio, sin promesas ("deja de fumar en X días"), sin claims médicos. Valkyra NO es un producto médico.
- Datos solo si son ciertos y generales. Ante la duda, no pongas cifra.
- Gancho fuerte en los 2 primeros segundos (pregunta o frase que identifique).
- Mañana (am): tono de empezar el día. Tarde (pm): cansancio, estrés, sobremesa, after-work, noche.
- **CTA obligatoria en TODOS los vídeos**: la última escena pide, en la voz y en pantalla, que nos sigan + una acción concreta (like, comentar algo específico, guardar o compartir). Usa `zone.type: "cta"`. Varía la frase y la petición de comentario cada vez, y que tenga que ver con el tema (p. ej. "Comenta CAFÉ si es tu cigarro más difícil", "Guárdalo para mañana", "Mándaselo a quien lo esté dejando"). El caption también termina con una pregunta o petición para comentar.
- Cada guion: 5–6 escenas, 380–480 caracteres de voz en total (cuidado con los créditos de ElevenLabs).

## Cuentas
- **calma** (`"account": "calma"`): mujeres 30–60 que quieren dejar de fumar; ya lo intentaron, miedo a engordar, a recaer, a que las juzguen, van a mil. Tono cálido, cercano, de apoyo, frases bonitas que inspiren. Voz Eva Dorado. Paleta crema/terracota/salvia.
- **oficial** (`"account": "oficial"`): protagonista chico joven que usa Valkyra en distintos momentos del día; consejos, inspiración y entretenimiento; tono informal y cercano, en primera persona ("tío", "a mí me pasaba"). Voz Carlos. Paleta oscura con ámbar. Usa el personaje (`zone.type: "guy"`) en 2–3 escenas, con una etiqueta de momento del día (`"label": "08:10 · CAFÉ"`).

## Formato de script.json
```json
{"account":"calma|oficial","slot":"am|pm","topic":"...",
 "scenes":[{"say":"texto que dice la voz","kicker":"frase pequeña con *acento en cursiva*","title":["LÍNEA 1","línea *acento*"],"zone":{...}}],
 "caption":"texto del post con emojis y pregunta final","hashtags":["#dejardefumar","..."],
 "tiktok_title":"título corto","yt_title":"título de YouTube"}
```
- `*palabra*` = color de acento. Títulos: 1–3 líneas, máx. ~14 caracteres por línea (Anton grande).
- `zone.type`: `steps` (items `{n,t,s,at}`, máx. 3), `chips` (items `{t,at}`), `note` (`text`, `at`), `pendant` (collar), `vs` (items `{k:"no"|"si",t}`), `timer` (`from` en segundos, `label`), `big` (`text`, `sub`), `guy` (`pose`: wave, think, breath, coffee, phone; `label`; `at`), `cta` (items `{icon: follow|like|comment|save|share, t, at}`, 2–3 botones; `*palabra*` resalta).
- `at` = palabra exacta que dice la voz en esa escena; el elemento aparece justo ahí.
- No pongas texto en pantalla que no se entienda sin la voz.

## Motor
- `engine/tts.py`: voz por API con tiempos por carácter → `voice.mp3` + `timing.json`.
- `engine/render.js`: dibuja `engine/template.html` fotograma a fotograma con Playwright y monta con ffmpeg (-14 LUFS) → `final.mp4`.
- Nunca subas claves a este repositorio (es público).
