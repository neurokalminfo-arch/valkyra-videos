---
name: valkyra-collage
description: Estilo visual "collage" para los vídeos cortos de Valkyra (TikTok, Instagram Reels, YouTube Shorts) sobre dejar de fumar. Úsala al crear cualquier vídeo nuevo de @calma.valkyra, @neurokalm o @valkyra.oficial con el motor del repositorio valkyra-videos. Es un zine de papel recortado con tramas de puntos, tipografía que golpea, rotulador a mano y una banda sonora hecha por código. Todo se dibuja con código: sin Higgsfield ni otros generadores de imagen o vídeo por IA.
---

# Valkyra · estilo COLLAGE

Objetivo: que no parezca contenido genérico hecho con IA. Es un fanzine de papel animado en stop-motion. Cada escena es una hoja de color distinta y la tipografía cae con golpe.
**Prohibido usar Higgsfield** u otros generadores de imagen o vídeo. Todo lo visual lo dibuja el código de `engine/collage/template.html`. La música y los efectos los sintetiza `engine/collage/audio.py`.

## Lenguaje visual (no inventar otro)
- **Hojas de color**: cada escena cambia de papel. Colores: `terra`, `paper`, `sage`, `mustard` e `ink`. No repitas el mismo color dos escenas seguidas. El papel tiene grano que se mueve a 12 fps.
- **Dos ritmos a la vez**: los recortes y el papel se mueven a 12 fps (stop-motion, se pegan en 3 pasos). La tipografía va a 30 fps, fluida, y entra con golpe (escala 1,5 → 1, easing exponencial).
- **Pegatinas con trama de puntos**: objetos dibujados con código en trama a 45°, con borde blanco de pegatina y sombra. Hay 7 objetos: cigarro, reloj, huellas, vaso, libreta y collar (este sin trama, en dorado; es Valkyra). El séptimo, `roto`, es el cigarro partido en dos.
- **4 tipografías combinadas**: Anton (cartel), Permanent Marker (rotulador a mano), Special Elite (máquina de escribir y etiquetas) y la cursiva serif de la marca.
- **Risografía**: los textos grandes llevan una copia desplazada en otro color.
- **Rotulador**: los garabatos se dibujan en vivo (círculo, subrayado, flechas, check, palotes, tachado) sobre la palabra que dice la voz.
- **Hilo de la serie**: la regla de 0 a 15 minutos de arriba avanza con el vídeo. Sirve en cualquier "kit" que vaya por pasos o tiempo.
- **Subtítulos tipo rotuladora**: cinta negra, máquina de escribir, la palabra que suena resaltada en mostaza. Van en y≈1470, encima de la interfaz de Instagram y TikTok.
- **Transiciones**: corte seco con un golpe de papel. Las escenas impares entran como una hoja que sube desde abajo. Hay **un solo "momento wow"** por vídeo (`"transition": "tear"`): la página se rasga en dos. Justo antes, la música se calla 1 tiempo.
- **Sonido**: base lo-fi a 92 BPM (La menor), crepitar de vinilo y efectos de cinta, golpe, rotulador, pegatina, sello, chasquido, desgarro y burbuja. Todo va sincronizado con los eventos de la plantilla, baja sola cuando habla la voz y se normaliza a −14 LUFS.

## Estructura de cada vídeo (30–45 s, 7–8 escenas)
1. **Gancho (0–4 s)**: se ve completo desde el fotograma 0. Lleva un dato o promesa gigante, un objeto pegatina y un garabato que aparece con la palabra clave.
2. **Contexto o fuente (4–9 s)**: la fuente de `datos.md` en etiqueta de máquina de escribir y el objetivo concreto.
3–5. **Pasos**: número en pegatina redonda, verbo gigante, objeto animado y nota a rotulador. Un paso por escena.
6. **Momento wow** con `"transition": "tear"`: es la recompensa (el cigarro se parte, "ya ha bajado").
7. **Refuerzo emocional**: un sello que cae con golpe (VICTORIA, HOY SÍ…) y palotes o tachado.
8. **CTA**: botones de papel (seguir + guardar/compartir/comentar) y una flecha a rotulador hacia los botones de la app.

## Formato del `script.json`
`"style": "collage"` activa este motor (sin él, sale el estilo anterior). Cada escena tiene `say`, `bg`, opcionales `min` (regla de minutos), `transition: "tear"`, `cta: true`, `captions: false`, y `els` (lista de elementos con coordenadas en el lienzo de 1080×1920):
- `strip` · tira de papel rasgado: `text` (con `*acento*`), `x,y,rot,size`, `color` (paper|ink|terra|mustard) y `strike` (palabra en la que se tacha).
- `big` · tipografía gigante: `text,x,y,size,rot,color`.
- `note` · rotulador que se escribe solo: `text,x,y,rot,size,color`.
- `tag` · etiqueta de máquina de escribir (fuentes): `text,x,y,rot`.
- `num` · número de paso en pegatina: `text,x,y,rot`.
- `stamp` · sello que golpea: `text,x,y,rot`.
- `sticker` · `obj` (cigarro|reloj|huellas|vaso|libreta|collar|roto), `x,y,s,rot`.
- `scribble` · `shape` (circle|underline|arrow-down|arrow-right|check|tally), `x,y,w,h,color,dur`.
- `cta` · `items:[{icon: follow|save, text, at}]`, `x,y`.
- `at` = palabra de la voz en la que aparece. Sin `at`, aparece al empezar la escena (en la escena 0 ya está desde el fotograma 0).

Zona segura: x 60–940 (a la derecha están los botones de TikTok) e y 230–1380. La franja de 1400 a 1540 es para los subtítulos.

## Flujo
1. Guion según `CLAUDE.md`, `estrategia.md`, `datos.md` y `aprendizajes.md`, con `"style": "collage"`. Para vídeos de hasta 45 s se permiten hasta ~60 caracteres de voz por escena.
2. `python3 engine/tts.py <ep>`
3. `node engine/render.js <ep> --preview 0,3,8,…`: mira un fotograma por escena. Comprueba que no hay textos montados ni nada fuera de la zona segura, y que lo que sale se entiende sin la voz.
4. `node engine/render.js <ep>` genera la voz, la música y los efectos y saca `final.mp4`. `--cover` saca `cover.jpg` (el gancho en el segundo 3,6).
5. Para añadir objetos nuevos, dibújalos en grises dentro de `build()` con `sticker(w,h,draw,colorFn)`. La trama y el borde salen solos.
