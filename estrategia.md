# Estrategia de contenido orgánico · Valkyra

> **Actualizado el 24-11-2026 con la "Guía para que despeguen las redes" (v2, en el proyecto Marketing machine: `claude/valkyra-guia-redes-v2.md`).** Lo de esta sección manda sobre el resto del archivo cuando haya conflicto.

## Formatos que funcionan (base: 2 vídeos orgánicos de IG que rompieron techo)
Patrón común: **empieza en un momento que el espectador reconoce** (nunca en el producto) → habla en **segunda persona y con calma** ("tú", "te pasa", "no tienes que resolverlo todo de golpe") → **Valkyra llega al final, en 1–2 frases, como respuesta suave**. Acompañar, no sermonear. Es la mejor hipótesis que tenemos, no una ley: los datos de los lunes la confirman o la corrigen.
Ojo: el reel de 135.323 del 06/11 fue **pagado**; no cuenta como prueba orgánica.

### Formato A · Pausa guiada (`"format": "A"`)
1. Gancho (0–3 s): el momento. "Cuando vuelven las ganas después de una discusión…"
2. Validar (3–8 s): "Parece que no va a pasar. Es normal."
3. Pausa guiada (8–20 s): "No tienes que resolverlo todo ahora. Respira despacio. Suelta los hombros. Vuelve a elegir." (Aquí SÍ se permite la respiración: es el corazón del formato.)
4. Cierre suave (20–25 s): "Guárdalo para ese momento, o mándaselo a quien lo esté intentando. Y si quieres algo que te acompañe mientras cambias el gesto, Valkyra está en mi perfil."
5. Pregunta (pantalla + caption): "¿Qué momento del día se te hace más difícil? Te leo."
Momentos para variar: después de una discusión, a las 3 de la madrugada sin dormir, en un atasco, al salir del trabajo, el domingo por la tarde, después de una mala noticia, una boda o cena con fumadores, el primer día sin tabaco, el café de las 11, la sobremesa.

### Formato B · Manifiesto (`"format": "B"`)
1. Gancho: "Todo el mundo te dice [X]. Casi nadie te dice [Y]."
2. Lista de momentos: frases cortas, una por línea en pantalla ("Después del café. Cuando necesitas una pausa. Después de un día complicado.").
3. Giro: "No es solo una decisión. Es un gesto que llevas años repitiendo."
4. Producto como respuesta: "Ahí entra Valkyra: algo físico que te recuerda por qué empezaste. No es magia. Es otra opción cuando llega ese momento."
Ganchos: "…que lo dejes. Nadie te dice qué hacer con las manos." · "…cuántos días llevas. Nadie te pregunta cómo estás." · "…de la fuerza de voluntad. Nadie habla del café de las 11." · "…celebra el día 1. Nadie te avisa del día 4." (y nuevos del mismo tipo).

### Prueba (`"format": "prueba"`)
Un formato o tema distinto (relato en 1ª persona, mito, proceso, apoyo, kit con tiempos…). **Obligatorio** escribir en script.json `"hypothesis"`: qué se prueba, contra qué formato y qué resultado la daría por buena (p. ej. "relato 1ª persona vs B; vale si supera la mediana de B en guardados/1.000"). La antigua plantilla de consejos (gancho + 3 trucos + dato NHS + "comenta X") solo puede ir aquí y como máximo 1 vez por semana.

## Calendario (1 vídeo al día, 18:00)
| Día | Formato | Ejemplo |
|---|---|---|
| Lunes | A · Pausa guiada | Después de una discusión |
| Martes | B · Manifiesto | "Nadie te dice qué hacer con las manos" |
| Miércoles | A · Pausa guiada | A las 3 de la madrugada |
| Jueves | Prueba | Formato o tema nuevo, con hipótesis |
| Viernes | B · Manifiesto | "Nadie te avisa del día 4" |
| Sábado | A · Pausa guiada | Cena o fiesta con fumadores |
| Domingo | Prueba | Consejos prácticos (la antigua plantilla, como mucho aquí) |

## Normas fijas
- **Estilo visual: cómic** (`"style": "comic"`, engine/comic; decisión del usuario del 27-11-2026, sustituye a la alternancia cine/collage). Dentro del cómic, cada vídeo cambia poses, fondos, objetos y composición respecto al anterior. Rota también la duración (20–40 s).
- **El dato "las ganas fuertes duran unos 15 minutos" (NHS): como mucho en 1 de cada 5 vídeos.** Compruébalo con grep en los 4 vídeos anteriores antes de usarlo.
- **Nunca abrir con el producto** ("Valkyra es un collar…", "esta cosita de aquí…"): son los que peor funcionan (190 visualizaciones).
- **No prometer de más:** nada de "me curó" ni "cero ganas". Valkyra da otra opción en el momento difícil.
- **Ortografía revisada** en voz, pantalla y caption ("propia", "acompañarte", "encontrarás", "discusión", "a mil").
- **Pedir el envío**, no solo el guardado: "mándaselo a quien lo esté intentando".
- **Reaprovechar ganadores:** cada vídeo ORGÁNICO que pase de 10.000 visualizaciones tiene al menos 5 variaciones con otros momentos (apuntarlo en aprendizajes.md como "ganador" con su id).

## Checklist antes de programar
- [ ] Los 3 primeros segundos muestran un momento reconocible, no el producto.
- [ ] Habla en segunda persona y con calma.
- [ ] Valkyra aparece solo al final, en una o dos frases.
- [ ] Da un motivo para guardarlo o mandarlo a alguien.
- [ ] No repite el dato de los 15 minutos si ya salió en los 4 vídeos anteriores.
- [ ] Estilo cómic, con poses, fondos y objetos distintos a los del vídeo anterior.
- [ ] Sin faltas de ortografía en texto ni subtítulos.

---

# (Anterior al 24-11-2026: sigue valiendo para temas, ganchos y medición, salvo donde choque con lo de arriba)


**Objetivo:** vender sin vender. Cada vídeo tiene que ser lo más útil que esa persona vea hoy sobre dejar de fumar: algo que pueda aplicar esta misma tarde, que le quite culpa o miedo, o que le explique qué le está pasando. Si no lo guardaría o no se lo mandaría a alguien, no vale. Primero confianza, luego venta (desde la bio).

**La pregunta antes de escribir cada guion:** ¿qué se lleva quien lo ve? Tiene que poder decirse en una frase ("qué hacer en los 15 minutos de ganas", "por qué el tercer día es el peor", "qué decir cuando te ofrecen un cigarro").

## Pilares (cada script.json lleva `"pillar"`)
| Pilar | Qué es | Peso |
|---|---|---|
| `kit` | Herramientas para EL momento de las ganas: qué hacer en los próximos 15 minutos, plan de emergencia, frases para decir que no, qué tener preparado. Para guardar. | ~25 % |
| `emocion` | Recaída, culpa, miedo a engordar, miedo a fracasar otra vez, sentirse sola, pequeñas victorias. Quitar peso, nunca sermón. **Es lo que mejor ha funcionado.** | ~20 % |
| `proceso` | Qué está pasando en tu cuerpo y tu cabeza: primeras 72 horas, primera semana, por qué tienes más hambre o duermes peor, qué mejora y cuándo (solo con `datos.md`). | ~15 % |
| `truco` | 3 pasos concretos para UN momento que tenga casi todo el mundo (café, primer cigarro, sobremesa, estrés, alcohol, coche, noche). Evitar momentos de nicho (gimnasio, Play, salir del cole): rinden la mitad. | ~20 % |
| `mito` | Mito o verdad: fuerza de voluntad, "fumo poco", "uno no pasa nada", engordar, vapeador. Solo datos de `datos.md`. | ~10 % |
| `apoyo` | Para quien acompaña: cómo ayudar a tu pareja, madre o amigo a dejarlo y qué no decirle. Hecho para compartir. | ~5 % |
| `producto` | El gesto en uso real, "¿por qué un collar?", "¿es un vapeador? No". CTA al enlace del perfil. Sin precio ni promesas. | 1 por cuenta y semana |

`situacion` ya no es un pilar propio: describir el momento es solo la apertura de un `truco`, `kit` o `emocion`. Nunca un vídeo que solo describe y no da nada.

## Calendario semanal antiguo (SUSTITUIDO por el de arriba)
| Día | am (09:00) | pm (18:00) |
|---|---|---|
| Lunes | `truco` (empezar la semana) | `emocion` |
| Martes | `proceso` | `kit` |
| Miércoles | `mito` | `emocion` |
| Jueves | `kit` | `producto` |
| Viernes | `proceso` | `kit` (finde: alcohol, planes, fiestas) |
| Sábado | `apoyo` | `emocion` |
| Domingo | `emocion` (pequeñas victorias de la semana) | `truco` (preparar el lunes) |

Si `aprendizajes.md` dice que un pilar rinde mucho mejor, puede sustituir hasta 2 huecos semanales de otro pilar (nunca el de `producto`).

## Series (para que vuelvan y nos sigan)
Repite formatos reconocibles con nombre propio en el kicker de la primera escena y en la portada:
- calma: "Kit anti-ganas #N" (`kit`), "Tu cuerpo sin tabaco: día N" (`proceso`), "Si hoy has fumado…" (`emocion`).
- oficial: "Lo que nadie te cuenta de dejar el piti #N" (`mito`), "Plan para [momento]" (`kit`).
Lleva el número de la serie en `"series": "kit-anti-ganas-3"` y súbelo cada vez.

## Ganchos (rotar el tipo; guardar `"hook"` en script.json)
El gancho es la primera escena y se ve completa desde el primer fotograma. Nombra el tabaco y promete algo concreto. Nada de "Si estás dejando de fumar:" en todos los vídeos: cada gancho es distinto.
- `pregunta`: "¿Te has fumado uno y te sientes fatal?"
- `frase-identificacion`: "Si el cigarro que más te cuesta es el del café…"
- `contraintuitivo`: "Dejar de fumar no va de fuerza de voluntad."
- `error`: "El error que te hace volver al cigarro el tercer día."
- `lista`: "3 cosas que hacer cuando te dan ganas de fumar."
- `dato`: "A las 12 horas sin fumar tu sangre ya…" (solo con `datos.md`)
- ~~`pov`~~: NO usar (decisión del usuario, 24-11-2026: no más vídeos POV en @valkyra.oficial).

## CTA (siempre seguirnos + UNA acción; rotar)
- `guardar`: por defecto en `kit`, `truco` y `proceso` ("Guárdalo para cuando lleguen las ganas").
- `compartir`: en `emocion` y `apoyo` ("Mándaselo a quien lo esté dejando"). TikTok casi no da compartidos todavía: pídelo solo cuando el vídeo de verdad sea para otra persona.
- `comentar`: palabra concreta ligada al tema ("Comenta DÍA y tu número de días sin fumar").
- `perfil`: solo en `producto`.

## Ritmo (retención)
- 22–30 s. Escenas cortas: cada una ≤ 4 s de voz (unos 55 caracteres). 6–8 escenas.
- La información útil llega antes del segundo 8 (la gente se va de media a los 7–10 s).
- Cada escena cambia algo en pantalla (lista que avanza, número, nota, personaje). Nada de 2 escenas seguidas solo con título.

## Qué medimos (en orden de importancia)
1. **Salto en los 3 primeros segundos** (IG skip rate) y tiempo medio visto. Mide el gancho y el ritmo.
2. **Guardados y compartidos por 1.000 visualizaciones.** Miden valor real.
3. **Comentarios.** Miden conexión y nos dan temas para `comunidad`.
4. **Seguidores ganados.**
5. **Visitas al perfil / clics en la bio y ventas.**

## Fidelización (pendiente de decidir con el equipo)
- Regalo gratuito (guía "Tu primera semana sin tabaco") a cambio de email o WhatsApp.
- Códigos de descuento distintos por red para saber qué canal vende.
- Responder comentarios a diario (hoy no está automatizado).
