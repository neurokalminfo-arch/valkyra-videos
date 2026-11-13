# Fábrica diaria de vídeos Valkyra

Cada ejecución crea 2 vídeos cortos (1080x1920, 25–35 s) y los deja programados en Metricool:
- **calma**: TikTok @calma.valkyra + Instagram @neurokalm (Reel) + YouTube (Short).
- **oficial**: TikTok @valkyra.oficial.

## Pasos de cada ejecución (slot `am` = 09:00, slot `pm` = 18:00, hora de Madrid)
0. Lee `estrategia.md` (pilares, calendario semanal, series, ganchos, CTA, ritmo), `datos.md` (los únicos números permitidos) y `aprendizajes.md` (lo que ha funcionado según los datos). Mira qué pilar toca hoy en el calendario para cada cuenta y aplica los ajustes de `aprendizajes.md`.
1. Lee los temas ya usados: `grep -h '"topic"\|"pillar"\|"hook"\|"cta"' episodes/*/script.json`. No repitas tema ni gancho de los últimos 30 días, ni el mismo tipo de gancho dos veces seguidas en la misma cuenta.
2. Escribe `episodes/AAAA-MM-DD-calma-<slot>/script.json` y `episodes/AAAA-MM-DD-oficial-<slot>/script.json` (formato abajo).
3. Para cada episodio: `python3 engine/tts.py <ep>` (necesita `ELEVENLABS_API_KEY`), luego `node engine/render.js <ep> --preview t1,t2,t3` y mira los fotogramas (texto completo, nada cortado, nada fuera de la zona segura). Corrige y repite. Después `node engine/render.js <ep>` y la portada: `node engine/render.js <ep> --cover` → `cover.jpg` (míralo: el texto se lee entero y se entiende que va de dejar de fumar).
4. `git add -A && git commit && git push origin main`. URL pública del vídeo:
   `https://raw.githubusercontent.com/neurokalminfo-arch/valkyra-videos/main/episodes/<id>/final.mp4` y la portada `.../episodes/<id>/cover.jpg` (comprueba con curl que las dos dan 200).
5. Programa en Metricool (`createScheduledPost`, `draft: false`, `autoPublish: true`, zona `Europe/Madrid`):
   - En TODOS los posts de TikTok e Instagram añade `videoThumbnailUrl` = URL raw de `cover.jpg` del episodio.
   - blogId **7796202** · providers `[tiktok]` · vídeo calma · `tiktokData.title` obligatorio · `isAigc: true` · portada.
   - blogId **7738323** · providers `[instagram]` · vídeo calma · `instagramData: {type: REEL, showReelOnFeed: true, isAiGenerated: true}` · portada.
   - blogId **7738323** · providers `[youtube]` (post aparte, SIN `videoThumbnailUrl`) · vídeo calma · `youtubeData: {title: "<título> #shorts", type: short, privacy: public, category: HOWTO_STYLE, madeForKids: false, isAiGeneratedContent: false, tags: [...]}`.
   - blogId **7738323** · providers `[tiktok]` · vídeo oficial · `tiktokData.title` · `isAigc: true` · portada.
   - Si Metricool rechaza la portada (`VIDEO_THUMBNAIL_NOT_APPLICABLE`), vuelve a crear ese post sin `videoThumbnailUrl`.
   - Si Metricool da "internal error while storing the media", reintenta tras unos segundos (pasa a veces).
   - NO toques las marcas Fetbull, Airnaze ni La Gran Pregunta.

## Reglas de contenido (obligatorias)
- Se tiene que entender A LA PRIMERA que hablamos de **dejar de fumar** (cigarro, tabaco, piti). Nombrarlo en el texto en pantalla y en la voz. Nada de mensajes vagos.
- Contenido educativo, que aporte valor y conecte: situaciones concretas del día ("esto me pasa a mí"), trucos prácticos, mitos, recaídas, miedo a engordar, ansiedad, entorno, café, alcohol, estrés, después de comer, al despertar, en el coche, pausas del trabajo, noche, fines de semana, culpa, pequeñas victorias.
- **Muy poco** de respiración consciente (como mucho una frase de pasada, no en todos los vídeos).
- Excepción: en el pilar `producto` (1 por cuenta y semana, ver `estrategia.md`) Valkyra es protagonista, pero mostrando el gesto en un momento real, y la CTA lleva al enlace del perfil.
- Valkyra aparece poco y de forma natural (el gesto de cambiar el cigarro por el collar), nunca como anuncio. Sin precio, sin promesas ("deja de fumar en X días"), sin claims médicos. Valkyra NO es un producto médico.
- Cifras y datos de salud: SOLO los de `datos.md`, citando la fuente. Nada más.
- Gancho fuerte: la primera escena ES el gancho, se ve completa desde el fotograma 0, nombra el tabaco y promete algo concreto. Distinto en cada vídeo (no empieces siempre con "Si estás dejando de fumar:").
- Cada vídeo tiene que dejar algo útil que se pueda aplicar hoy (ver la pregunta de `estrategia.md`). Un vídeo que solo describe un momento sin dar nada no vale.
- Momentos universales (café, primer cigarro, sobremesa, estrés, alcohol, noche, recaída); evita los de nicho.
- Mañana (am): tono de empezar el día. Tarde (pm): cansancio, estrés, sobremesa, after-work, noche.
- **CTA obligatoria en TODOS los vídeos**: la última escena pide, en la voz y en pantalla, que nos sigan + una acción concreta (like, comentar algo específico, guardar o compartir). Usa `zone.type: "cta"`. Varía la frase y la petición de comentario cada vez, y que tenga que ver con el tema (p. ej. "Comenta CAFÉ si es tu cigarro más difícil", "Guárdalo para mañana", "Mándaselo a quien lo esté dejando"). El caption también termina con una pregunta o petición para comentar.
- Cada guion: 6–8 escenas cortas (≤ 55 caracteres de voz cada una), 22–30 s, 350–450 caracteres de voz en total (cuidado con los créditos de ElevenLabs). Lo útil antes del segundo 8. Nunca dos escenas seguidas sin `zone`.

## Cuentas
- **calma** (`"account": "calma"`): mujeres 30–60 que quieren dejar de fumar; ya lo intentaron, miedo a engordar, a recaer, a que las juzguen, van a mil. Tono cálido, cercano, de apoyo, frases bonitas que inspiren. Voz Eva Dorado. Paleta crema/terracota/salvia.
- **oficial** (`"account": "oficial"`): protagonista chico joven que usa Valkyra en distintos momentos del día; consejos, inspiración y entretenimiento; tono informal y cercano, en primera persona ("tío", "a mí me pasaba"). Voz Carlos. Paleta oscura con ámbar. **Sin avatar ni personaje dibujado** (se retiró el 13-11-2026: quedaba infantil). Sitúa la historia con 1–2 etiquetas de momento del día (`zone.type: "moment"`, `"label": "08:10 · CAFÉ"`) y apóyate en las escenas de cine.

## Formato de script.json
```json
{"account":"calma|oficial","slot":"am|pm","topic":"...","pillar":"kit|emocion|proceso|truco|mito|apoyo|producto","series":"kit-anti-ganas-3 (opcional)","hook":"pregunta|frase-identificacion|contraintuitivo|error|lista|dato|pov","cta":"guardar|compartir|comentar|perfil",
 "scenes":[{"say":"texto que dice la voz","kicker":"frase pequeña con *acento en cursiva*","title":["LÍNEA 1","línea *acento*"],"zone":{...}}],
 "caption":"texto del post con emojis y pregunta final","hashtags":["#dejardefumar","..."],
 "cover":{"kicker":"frase pequeña","title":["2–3 líneas","con *acento*"]},
 "tiktok_title":"título corto","yt_title":"título de YouTube"}
```
- `*palabra*` = color de acento. Títulos: 1–3 líneas, máx. ~14 caracteres por línea (Anton grande).
- `zone.type`: `steps` (items `{n,t,s,at}`, máx. 3), `chips` (items `{t,at}`), `note` (`text`, `at`), `pendant` (collar), `vs` (items `{k:"no"|"si",t}`), `timer` (`from` en segundos, `label`), `big` (`text`, `sub`), `moment` (`label`: etiqueta del momento del día, p. ej. "23:10 · PLAY"), `cta` (items `{icon: follow|like|comment|save|share, t, at}`, 2–3 botones; `*palabra*` resalta).
- `cover` = texto de la portada: el gancho del vídeo en grande, que despierte curiosidad y se entienda solo (tiene que salir fumar/cigarro/piti/tabaco en el kicker o el título). Máx. ~12 caracteres por línea. Sin `zone` sale el collar. Puedes añadir `"bg"` a la portada (en oficial, si no hay `bg`, sale la noche).
- `at` = palabra exacta que dice la voz en esa escena; el elemento aparece justo ahí.

## Escenas de cine (estilo mixto, aprobado el 13-11-2026)
Cada vídeo mezcla nuestras escenas tipográficas con **2–3 escenas "de cine"**: fondo animado a pantalla completa + subtítulos palabra a palabra arriba (la palabra que se dice va enmarcada, las siguientes atenuadas) + título grande encima. Se activan con `"bg"` en la escena:
- `"bg": {"type": "smoke"}` humo de cigarro (ganchos, ganas, recaída) · `"night"` ciudad de noche con luna (noche, after-work, insomnio) · `"sunrise"` amanecer en el mar con sol y palmera (mañana, empezar, pequeñas victorias) · `"sunset"` atardecer (sobremesa, final del día) · `"rain"` lluvia con luces (estrés, días grises) · `"glow"` luces cálidas (calma, apoyo, el gesto con el collar) · `"space"` cielo estrellado (datos, "¿qué pasa en tu cuerpo…?"; opciones `"warp": true` para el efecto de velocidad al entrar y `"orb": true` para una bola de luz).
- Opciones: `"palm": false` quita la palmera; `"embers": false` quita la brasa del humo.
- Escenas seguidas con el mismo `bg` forman un solo plano continuo (la cámara sigue acercándose); entre fondos distintos hay fundido.
- En una escena de cine el `kicker` no se muestra (lo sustituyen los subtítulos): pon lo importante en el `title` y en la voz.
- Elige el fondo por el momento del que habla la escena. No pongas `bg` en la escena CTA. El gancho puede ser de cine (p. ej. `smoke`).
- `"captions": "all"` en el script pone subtítulos en todas las escenas; `"captions": false` los quita.
- No pongas texto en pantalla que no se entienda sin la voz.

## Motor
- `engine/tts.py`: voz por API con tiempos por carácter → `voice.mp3` + `timing.json`.
- `engine/cine.js`: fondos animados de las escenas de cine (canvas).
- `engine/render.js`: dibuja `engine/template.html` fotograma a fotograma con Playwright y monta con ffmpeg (-14 LUFS) → `final.mp4`.
- Nunca subas claves a este repositorio (es público).

## Análisis semanal (tarea de los lunes)
1. Lee `estrategia.md`, `aprendizajes.md` y los `script.json` de los últimos 14 días.
2. Saca de Metricool (`getAnalyticsDataByMetrics`) los últimos 14 días:
   - blogId 7738323: Instagram reels (`IGRE02,IGRE03,IGRE23,IGRE11,IGRE10,IGRE07,IGRE12,IGRE21,IGRE30`), TikTok @valkyra.oficial (`TKPO02,TKPO05,TKPO06,TKPO07,TKPO08,TKPO09,TKPO10,TKPO15`) y YouTube si hay datos.
   - blogId 7796202: TikTok @calma.valkyra (mismas métricas TKPO).
3. Empareja cada publicación con su episodio (fecha + hora 09:00/18:00 + caption) y guarda la tabla en `analytics/AAAA-MM-DD.csv` (episodio, red, pilar, gancho, cta, duración, visualizaciones, likes, comentarios, guardados, compartidos, salto 3 s / tiempo medio visto).
4. Compara por pilar, tipo de gancho, CTA, cuenta, slot y duración. Usa medianas, no medias (un viral distorsiona). Con menos de 3 vídeos por grupo, apúntalo como indicio, no como regla.
5. Reescribe `aprendizajes.md` (máx. ~40 líneas): reglas con su prueba, pruebas en curso y "Ajustes para esta semana" (qué pilar o gancho reforzar o abandonar, ideas de temas a partir de lo que mejor funcionó). NO cambies `estrategia.md` ni este archivo: si crees que hay que cambiarlos, propónlo en el resumen.
6. Commit + push. Termina con un resumen: mejor y peor vídeo de la semana (con números), qué ha aprendido y qué propone cambiar.
