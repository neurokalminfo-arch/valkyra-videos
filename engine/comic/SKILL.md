---
name: valkyra-comic
description: Estilo "cómic" para los vídeos de la cuenta calma (Instagram @neurokalm, TikTok @valkyra.oficial y @neurokalm.oficial). Viñetas en blanco y negro con trama de puntos, acento dorado, una chica de pelo negro y el cigarro como personaje. Todo se dibuja con código (engine/comic/template.html); sin generadores de imagen ni vídeo.
---

# Valkyra · estilo CÓMIC (desde el 27-11-2026, decisión del usuario)

Referencia que pidió el usuario: viñetas de cómic sobre papel crema, línea negra gruesa, trama de puntos para las sombras y **un solo color de acento: dorado**. Arriba, una caja de texto blanca con borde negro que **se escribe palabra a palabra al ritmo de la voz** (las palabras clave van en recuadro dorado; `~palabra~` se tacha en dorado). Debajo, 1–3 viñetas que entran deslizando o con zoom.

## Personajes (no inventar otros)
- **Ella** (`chica`): pelo negro largo con flequillo, blusa blanca con cuello en V, pantalón negro. Es quien está dejando de fumar. Poses (`pose`): `stand`, `hips` (manos en la cintura, decidida), `think` (mano en la barbilla), `worry` (mano en la cabeza), `head2` (las dos manos en la cabeza, agobio), `shock` (manos en la cara), `cover` (se tapa los ojos), `palms` (mira sus manos), `hold` (sujeta el colgante de Valkyra, con brillo), `point` (señala a la derecha), `wave` (saluda), `stop`. Caras (`face`): `neutral`, `smile`, `happy`, `calm` (ojos cerrados), `worry` (con gota de sudor), `sad`, `surprise`, `determined`, `angry`. `collar: true` le pone el colgante al cuello. `flip: true` la gira. `look: -1|1` mueve la mirada.
- **El cigarro** (`cig`): cigarro con cara, brasa encendida, humo y bracitos. Es la tentación: listo, simpático y un poco pillo, nunca da miedo. `face`: `sly` (pillo), `happy`, `scared`, `angry`, `bored`; `arms`: `up`, `down`, `wave`, `hips`, `shrug`. Acciones: `exit: "palabra"` (sale disparado a la derecha), `snap: "palabra"` (se parte en dos), `enter: "palabra"`, `walk: true`, `hop: true`.

## Formato del `script.json`
`"style": "comic"`. Cada escena:
- `say`: lo que dice la voz. `caption`: el texto de la caja (por defecto, `say`). Mejor que sea igual que `say` (así cada palabra aparece cuando se dice). `*palabra*` = recuadro dorado; `~palabra~` = tachado. Máx. 2 líneas (la caja reduce la letra sola).
- `layout`: `full` (1 viñeta), `split` (2 en vertical, lado a lado), `stack` (arriba 470 px + abajo 650 px), `stack2` (al revés), `L` (2 arriba + 1 abajo), `three` (1 arriba + 2 abajo). O `box: [x, y, w, h]` en cada viñeta.
- `panels`: lista de viñetas `{bg, at, from, els}`. `bg`: `white`, `dots` (trama en los bordes), `speed` (líneas cinéticas; `cx`, `cy` = centro de 0 a 1), `dark` (noche/ansiedad), `gold` (momento Valkyra), `sky` (amanecer con sol; `rise: true` lo hace salir, `sx`, `hy`). `from`: `left`, `right`, `down`, `zoom`. `at`: palabra en la que entra la viñeta (si no, entra al empezar la escena). `push`: zoom lento (0,05 por defecto).
- `els` (coordenadas dentro de la viñeta, origen arriba a la izquierda; la chica y el cigarro se anclan por los pies):
  - `chica` · `x, y, s, pose, face` (s≈1–1,25 para plano medio con los pies fuera de la viñeta: y ≈ alto de la viñeta + 400).
  - `cig` · `x, y, s, face, arms` (+ `exit`, `snap`…).
  - `bubble` · bocadillo `text` (con `\n`), `x, y, w, h`, `tail: [dx, dy]` (punta, relativa al centro), `kind: "thought"` para pensamiento.
  - `burst` · onomatopeya en estrella (`¡PARA!`, `¡FIUU!`, `¡AH!`): `text, x, y, size, rot, color: "red"|"gold", fill: "gold"`.
  - `label` · cartel dorado (o `fill: "white"`): `text, x, y, size, rot, font` (p. ej. "08:10 · CAFÉ" para situar el momento).
  - `mark` · `?` o `!` grande. `arrow` · flecha dorada (`len, rot, w`). `hand` · mano dorada de "para" (`s`).
  - `checks` · cuadrícula de días tachados (`cols, rows, n` hechos, `crack` índice que se rompe en `crackAt`). `cal` · calendario (`text: "HOY"`, `flip: "MAÑANA"`, `flipAt`). `flag` · bandera (`text`). `cup` · taza de café humeante. `eyes` · ojos en la oscuridad (en `bg: "dark"`). `pendant` · el colgante de Valkyra suelto, con brillo. `text` · texto suelto.
  - `cta` · botones finales: `items: [{icon: follow|like|comment|save|share, text, at}]`, `x, y, w`.
  - `at` = palabra de la voz en la que aparece. Sin `at`, los personajes y objetos entran con su viñeta y los bocadillos, carteles y onomatopeyas saltan justo después.

## Reglas
- Escena 0 = el gancho, completo desde el fotograma 0 (la caja de la escena 0 sale ya escrita) y con fumar/cigarro/tabaco en la caja. La portada es ese fotograma (`cover.t` para elegir otro segundo, si en él sale fumar/cigarro).
- Zona segura: lo importante entre y=230 y y=1380 del lienzo (las viñetas pueden seguir más abajo, como decorado). Nada pegado al borde derecho (x > 960) en la viñeta de la CTA.
- Valkyra solo al final: la chica con `pose: "hold"` y `bg: "gold"`, o el `pendant`. Nunca de gancho.
- El cigarro es la voz de la tentación ("¿Uno con el café?"), no un monstruo. Cuando ella elige otra cosa, el cigarro se va (`exit`) o se parte (`snap`).
- Cambia en cada vídeo las poses, los fondos y al menos 2 objetos respecto al anterior. Si el tema pide un objeto nuevo, dibújalo en `template.html` (función con contorno negro `ol()` y sombra de trama) y añádelo aquí.
- Sonido: el mismo de collage (`engine/collage/audio.py`), con teclas de máquina al escribirse la caja, golpes en las onomatopeyas y "pop" en bocadillos.

## Flujo
1. `python3 engine/tts.py <ep>` → `timing.json`.
2. `node engine/render.js <ep> --preview t1,t2,…` con un fotograma al final de cada escena (cuando la caja ya está escrita) y míralos todos: nada cortado, bocadillos sin tapar caras, caja sin pisar la viñeta.
3. `node engine/render.js <ep>` → `final.mp4`; `node engine/render.js <ep> --cover` → `cover.jpg`.
Ejemplo completo: `episodes/2026-11-27-manos-pm/script.json`.
