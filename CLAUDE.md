# Fábrica diaria de vídeos Valkyra

**Desde el 25-11-2026 (guía v2):** cada ejecución crea **1 vídeo corto** (1080x1920, 20–40 s) con el formato que toca hoy según `estrategia.md` (A pausa guiada, B manifiesto o prueba) y lo deja programado en Metricool a las **18:00** en las 3 cuentas:
- Instagram **@neurokalm** (Reel) · TikTok **@valkyra.oficial** · TikTok **@neurokalm.oficial**.
- **Prueba de 2 semanas (25-11 al 08-12-2026): el mismo vídeo en Instagram y en los dos TikTok.** Después se decide con datos si se mantiene o se vuelve a guiones por red. (YouTube Shorts: NO se publica, decisión del usuario del 19-11-2026.)

## Pasos de cada ejecución (slot `pm` = 18:00, hora de Madrid)
0. Lee `estrategia.md` (sobre todo la sección de arriba: formatos A/B/prueba, calendario, normas fijas y checklist), `datos.md` (los únicos números permitidos) y `aprendizajes.md`. Mira qué formato toca hoy.
1. Lee lo ya publicado: `grep -h '"topic"\|"format"\|"style"\|"hook"' episodes/*/script.json | tail -40`. No repitas momento ni gancho de los últimos 30 días. **Estilo visual: siempre `"style": "comic"` (decisión del usuario del 27-11-2026: los vídeos de calma, con este estilo).** Varía dentro del cómic: poses, fondos de viñeta, objetos y composición distintos a los del último episodio. Si el dato de los 15 minutos salió en alguno de los 4 últimos episodios (`grep -l "15 minutos" episodes/*/script.json`), hoy no se usa.
2. Escribe `episodes/AAAA-MM-DD-<momento-corto>-pm/script.json` con `"format"`, `"style"` y, si es prueba, `"hypothesis"` (formato abajo). Voz Eva Dorado (cuenta `calma`) salvo que la prueba diga otra cosa.
3. Con `"style": "comic"`, sigue `engine/comic/SKILL.md` (voz con `engine/tts.py`, fotogramas de prueba, render y portada). (Estilos anteriores, ya no se usan salvo que el usuario lo pida: `collage` → `engine/collage/SKILL.md`; `cine`: `python3 engine/tts.py <ep>` (necesita `ELEVENLABS_API_KEY`), `node engine/render.js <ep> --preview t1,t2,t3`, mira los fotogramas (texto completo, nada cortado, nada fuera de la zona segura), corrige, `node engine/render.js <ep>` y la portada `node engine/render.js <ep> --cover` → `cover.jpg`.)
4. **Repasa el checklist de `estrategia.md`** y la ortografía de voz, pantalla y caption. Si algo no cumple, corrígelo antes de seguir.
5. `git add -A && git commit && git push origin main`. URL pública: `https://raw.githubusercontent.com/neurokalminfo-arch/valkyra-videos/main/episodes/<id>/final.mp4` y `.../cover.jpg` (comprueba con curl que dan 200).
6. Programa en Metricool (`createScheduledPost`, `draft: false`, `autoPublish: true`, zona `Europe/Madrid`, hoy 18:00; si ya son más de las 17:50, 15 minutos después de ahora), con `videoThumbnailUrl` = URL de `cover.jpg` en todos:
   - blogId **7738323** · providers `[instagram]` · `instagramData: {type: REEL, showReelOnFeed: true, isAiGenerated: true}`.
   - blogId **7738323** · providers `[tiktok]` (@valkyra.oficial) · `tiktokData.title` · `isAigc: true`.
   - blogId **7796202** · providers `[tiktok]` (@neurokalm.oficial) · `tiktokData.title` · `isAigc: true`.
   - Si Metricool rechaza la portada (`VIDEO_THUMBNAIL_NOT_APPLICABLE`), vuelve a crear ese post sin `videoThumbnailUrl`. Si da "internal error while storing the media", reintenta tras unos segundos.
   - Comprueba con `getScheduledPosts` que los 3 quedan con `draft: false`.
   - NO toques las marcas Fetbull, Airnaze ni La Gran Pregunta.

> Las secciones de abajo siguen valiendo, pero si chocan con la guía v2 (formatos A/B, producto solo al final, segunda persona y calma, respiración permitida en el formato A), manda la guía v2.

## Reglas de contenido (obligatorias)
- Se tiene que entender A LA PRIMERA que hablamos de **dejar de fumar** (cigarro, tabaco, piti). Nombrarlo en el texto en pantalla y en la voz. Nada de mensajes vagos.
- Contenido educativo, que aporte valor y conecte: situaciones concretas del día ("esto me pasa a mí"), trucos prácticos, mitos, recaídas, miedo a engordar, ansiedad, entorno, café, alcohol, estrés, después de comer, al despertar, en el coche, pausas del trabajo, noche, fines de semana, culpa, pequeñas victorias.
- **Muy poco** de respiración consciente fuera del formato A (en el formato A la pausa guiada es el centro del vídeo).
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
- **oficial** (`"account": "oficial"`): protagonista chico joven que usa Valkyra en distintos momentos del día; consejos, inspiración y entretenimiento; tono informal y cercano, en primera persona ("tío", "a mí me pasaba"). Voz Carlos. Paleta oscura con ámbar. **Sin avatar ni personaje dibujado** (se retiró el 13-11-2026: quedaba infantil). **Nada de vídeos POV** (ni gancho `pov` ni serie "POV: llevas N días…"; decisión del usuario, 24-11-2026). Sitúa la historia con 1–2 etiquetas de momento del día (`zone.type: "moment"`, `"label": "08:10 · CAFÉ"`) y apóyate en las escenas de cine.

## Formato de script.json
```json
{"account":"calma|oficial","slot":"am|pm","format":"A|B|prueba","style":"cine|collage","hypothesis":"solo en prueba","topic":"...","pillar":"kit|emocion|proceso|truco|mito|apoyo|producto","series":"kit-anti-ganas-3 (opcional)","hook":"pregunta|frase-identificacion|contraintuitivo|error|lista|dato","cta":"guardar|compartir|comentar|perfil",
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
   - blogId 7796202: TikTok @neurokalm.oficial (mismas métricas TKPO).
3. Empareja cada publicación con su episodio (fecha + hora 09:00/18:00 + caption) y guarda la tabla en `analytics/AAAA-MM-DD.csv` (episodio, red, **pagado/orgánico** (si un post se promocionó, márcalo y sácalo de las medianas orgánicas), formato, estilo, pilar, gancho, cta, duración, visualizaciones, likes, comentarios, guardados, compartidos, salto 3 s / tiempo medio visto).
4. Compara por formato (A/B/prueba), estilo visual, red (IG vs cada TikTok con el mismo vídeo), pilar, tipo de gancho, CTA y duración. Calcula guardados y compartidos por 1.000 visualizaciones y seguidores ganados. Marca como "ganador" todo vídeo orgánico de >10.000 visualizaciones (necesita 5 variaciones). Usa medianas, no medias (un viral distorsiona). Con menos de 3 vídeos por grupo, apúntalo como indicio, no como regla.
5. Reescribe `aprendizajes.md` (máx. ~40 líneas): reglas con su prueba, pruebas en curso y "Ajustes para esta semana" (qué pilar o gancho reforzar o abandonar, ideas de temas a partir de lo que mejor funcionó). NO cambies `estrategia.md` ni este archivo: si crees que hay que cambiarlos, propónlo en el resumen.
6. Commit + push. Termina con un resumen: mejor y peor vídeo de la semana (con números), qué ha aprendido y qué propone cambiar.
