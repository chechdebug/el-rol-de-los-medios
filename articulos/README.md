# Cómo publicar un artículo en el blog

Cada archivo `.md` de esta carpeta es un artículo. Cuando creás o cambiás uno acá en GitHub, Netlify arma la página y la publica sola en uno o dos minutos en `elroldelosmedios.com/blog/`. También actualiza el índice del blog, el sitemap para Google, el feed y el archivo para asistentes de IA. No tenés que tocar HTML.

## Publicar un artículo nuevo

1. Abrí `_plantilla.md` (en esta carpeta) y copiá todo su contenido con el botón **Copy raw file**.
2. Volvé a la carpeta `articulos` y hacé clic en **Add file → Create new file**.
3. Escribí el nombre del archivo: en minúsculas, con guiones en lugar de espacios y terminado en `.md`. Ese nombre es la dirección del artículo:
   - `10-ideas-periodismo-critico.md` → `elroldelosmedios.com/blog/10-ideas-periodismo-critico/`
4. Pegá la plantilla y reemplazá los datos de arriba y el texto.
5. Hacé clic en **Commit changes…** y después en **Commit changes**.
6. Listo. En uno o dos minutos está publicado. Lo podés seguir en Netlify, en la pestaña **Deploys**.

## Los datos de arriba de cada artículo

El bloque entre las dos líneas `---` tiene estos campos:

| Campo | ¿Obligatorio? | Para qué sirve |
|---|---|---|
| `titulo:` | Sí | El título de la página. Hasta unos 60 caracteres para que Google no lo corte. |
| `descripcion:` | Sí | Lo que muestra Google debajo del título. Hasta 160 caracteres. |
| `fecha:` | Sí | Fecha de publicación, con formato año-mes-día: `2026-11-08`. |
| `resumen:` | Recomendado | La respuesta corta, en 2 o 3 oraciones. Aparece en un recuadro al principio y es lo que más leen las IA. |
| `actualizado:` | No | Si después cambiás algo importante, poné la fecha del cambio. Google valora el contenido actualizado. |
| `imagen:` | No | Imagen de portada y de vista previa en redes, por ejemplo `/assets/partida.jpg`. |
| `borrador:` | No | Poné `borrador: si` para guardarlo sin publicarlo. |
| `autor:` | No | Si lo escribe otra persona. Si no ponés nada, firma Cecilia Vitelli. |

Los archivos que empiezan con `_` (como la plantilla) nunca se publican.

## Cómo se escribe el texto

| Escribís | Se ve |
|---|---|
| `## Subtítulo` | Subtítulo grande |
| `### Subtítulo chico` | Subtítulo chico |
| `**negrita**` | **negrita** |
| `*cursiva*` | *cursiva* |
| `[texto del enlace](https://...)` | un enlace |
| `- elemento` | lista con viñetas |
| `1. elemento` | lista numerada |
| `> cita` | cita destacada |
| `![descripción](/assets/foto.jpg "epígrafe")` | una imagen con epígrafe (ver abajo) |

Dejá una línea en blanco entre párrafos. No uses `#` solo (un numeral): el título ya lo pone el campo `titulo:`.

## Imágenes

**1. Subí la imagen.** Entrá a la carpeta `assets` del repo, hacé clic en **Add file → Upload files**, arrastrá la imagen y hacé commit. Conviene que tenga:

- un nombre en minúsculas, sin espacios ni tildes: `partida-en-clase.jpg`;
- entre 1200 y 1600 píxeles de ancho (Google la usa en resultados y vistas previas desde 1200);
- menos de 300 KB, en JPG o WebP. Si pesa más, achicala gratis en [squoosh.app](https://squoosh.app).

**2. Ponela en el texto**, en su propia línea, donde quieras que aparezca:

```
![Estudiantes jugando una partida en clase](/assets/partida-en-clase.jpg "Primera partida de prueba, junio de 2026.")
```

- Entre corchetes va la **descripción**: qué se ve en la imagen. No se muestra, pero la leen Google, las IA y las personas que usan lectores de pantalla. Es obligatoria en la práctica: si falta, el build avisa.
- Entre comillas, después de la dirección, va el **epígrafe** (opcional): el texto que aparece debajo de la imagen.

**3. Portada (opcional).** Si agregás `imagen: /assets/partida-en-clase.jpg` en los datos de arriba, esa imagen aparece arriba del artículo y es la que se ve cuando alguien comparte el enlace en WhatsApp, Instagram o LinkedIn. Si no ponés portada, para compartir se usa la primera imagen del texto.

Si escribís mal el nombre de una imagen, o no la subiste, Netlify no publica y te dice cuál falta. Así nunca queda una imagen rota en el sitio.

## Videos y GIFs

Un GIF animado pesa muchísimo (un reel de 45 segundos puede pasar los 100 MB) y GitHub no acepta archivos de más de 25 MB desde la web. Por eso, **las animaciones van como video MP4**: se ven igual que un GIF y pesan veinte o cuarenta veces menos.

1. **Exportá en MP4.** Si lo hiciste en Canva, descargalo como *MP4* en lugar de *GIF*. Si ya tenés el GIF, convertilo en [ezgif.com/gif-to-mp4](https://ezgif.com/gif-to-mp4). Que pese menos de 10 MB.
2. **Subí el video a `assets`** y, si querés una portada (recomendado), una imagen con **el mismo nombre**: `mi-video.mp4` y `mi-video.jpg`. La portada se ve mientras carga y es la imagen que aparece al compartir el artículo.
3. **Ponelo en el texto** igual que una imagen:

```
![Qué se ve en el video](/assets/mi-video.mp4 "Epígrafe opcional")
```

El video arranca solo, sin sonido y en loop, como un GIF, y tiene controles para pausarlo. Si es vertical, se ajusta para no ocupar más que la pantalla.

Si alguien intenta usar un GIF de más de 2 MB, Netlify no publica y avisa que hay que pasarlo a MP4.

## Editar, ocultar o borrar

- **Editar:** abrí el archivo, tocá el lápiz, cambiá lo que quieras y hacé commit. Si el cambio es importante, actualizá `actualizado:`.
- **Ocultar sin borrar:** agregá `borrador: si` en los datos de arriba.
- **Borrar:** abrí el archivo, menú `···` → **Delete file** y commit.

## Para que Google y las IA lo encuentren y lo citen

- Un tema por artículo, pensado como la pregunta que alguien escribiría en Google.
- Respondé esa pregunta en el `resumen:` y en la primera oración de cada sección.
- Escribí los subtítulos como preguntas concretas.
- Usá datos propios: lo que pasó en los playtests, cómo reaccionaron los estudiantes. Nadie más los tiene, y es lo que más citan los buscadores y las IA.
- Citá con APA y enlazá las fuentes cuando estén en línea.
- Enlazá a otro artículo del blog y al juego.
- No publiques texto generado por IA sin reescribirlo ni verificar cada dato.

## Si algo sale mal

Si un artículo tiene un error (por ejemplo, una fecha mal escrita), Netlify no publica nada nuevo y **el sitio sigue como estaba**. En Netlify → **Deploys** vas a ver el intento fallido en rojo. Abrilo y al final del registro aparece qué pasó, por ejemplo:

```
Error en articulos/mi-articulo.md: la fecha "8/11/2026" tiene que ir con formato año-mes-día, por ejemplo 2026-11-08.
```

Corregí el archivo, hacé commit y se publica.
