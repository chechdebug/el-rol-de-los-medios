# Cómo se publica el sitio

El sitio se publica solo: cada cambio que se guarda (commit) en este repo de GitHub dispara una publicación en Netlify. No hace falta arrastrar carpetas.

## Qué hace Netlify en cada publicación

Corre `npm run build` (configurado en `netlify.toml`), que ejecuta `scripts/build.mjs` y arma la carpeta `dist/` con:

- la landing (`index.html` + `*.jsx` + estilos), con las preguntas frecuentes y los últimos artículos agregados en texto plano para buscadores e IA;
- el contador (`contador.html`);
- el blog, a partir de los archivos de `articulos/`;
- `sitemap.xml`, `blog/feed.xml` y `llms.txt`, generados de nuevo cada vez.

## Estructura

| Carpeta o archivo | Qué es |
|---|---|
| `articulos/` | Los artículos del blog en Markdown. Ver `articulos/README.md`. |
| `index.html`, `*.jsx`, `kit.css`, `colors_and_type.css` | La landing. |
| `contador.html` | El contador de puntos. |
| `assets/` | Logos, íconos, estilos del blog e imágenes. |
| `robots.txt` | Indica a los buscadores dónde está el sitemap. |
| `scripts/build.mjs` | El script que arma el sitio. |
| `netlify.toml`, `package.json` | Configuración de la publicación. |

## Si una publicación falla

Netlify mantiene publicada la última versión que funcionó. En Netlify → Deploys aparece el error; si es de un artículo, el mensaje dice cuál y qué corregir. Para volver a una versión anterior: Deploys → elegir una publicación vieja → **Publish deploy**.

## Verificaciones

- **Formularios:** "Sugerí una carta" y "Conseguí el juego" escriben en la Google Sheet vía Apps Script.
- **GTM:** contenedor `GTM-K76FQWTX`, también incluido en las páginas del blog.
