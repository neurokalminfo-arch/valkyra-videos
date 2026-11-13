# Estrategia de contenido orgánico · Valkyra

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

## Calendario semanal (por cuenta)
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
- oficial: "POV: llevas N días sin fumar y…" (`proceso`/`emocion`), "Lo que nadie te cuenta de dejar el piti #N" (`mito`), "Plan para [momento]" (`kit`).
Lleva el número de la serie en `"series": "kit-anti-ganas-3"` y súbelo cada vez.

## Ganchos (rotar el tipo; guardar `"hook"` en script.json)
El gancho es la primera escena y se ve completa desde el primer fotograma. Nombra el tabaco y promete algo concreto. Nada de "Si estás dejando de fumar:" en todos los vídeos: cada gancho es distinto.
- `pregunta`: "¿Te has fumado uno y te sientes fatal?"
- `frase-identificacion`: "Si el cigarro que más te cuesta es el del café…"
- `contraintuitivo`: "Dejar de fumar no va de fuerza de voluntad."
- `error`: "El error que te hace volver al cigarro el tercer día."
- `lista`: "3 cosas que hacer cuando te dan ganas de fumar."
- `dato`: "A las 12 horas sin fumar tu sangre ya…" (solo con `datos.md`)
- `pov` (oficial): "POV: llevas 3 días sin fumar y todo te molesta."

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
