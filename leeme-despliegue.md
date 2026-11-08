# El Rol de los Medios — paquete listo para publicar

Esta carpeta es el sitio **listo para subir** a un hosting estático (Netlify, Cloudflare
Pages, GitHub Pages). No requiere compilar nada: el JSX se transpila en el navegador.

## Qué incluye
- `index.html` — landing page (9 secciones)
- `Contador.html` — contador de puntos (se abre desde el botón "Abrir contador")
- `*.jsx`, `kit.css`, `colors_and_type.css` — código y estilos de la landing
- `assets/` — logos, íconos y favicon

> Nota: se excluyeron los 3 SVG de "doodles" (~16 MB) porque la landing no los usa.
> Si en el futuro los necesitás, copialos a `assets/`.

## Pasos rápidos (Netlify, sin cuenta de programador)
1. Entrá a https://app.netlify.com/drop
2. Arrastrá ESTA carpeta entera (o el .zip descomprimido) al recuadro.
3. Netlify te da una URL `*.netlify.app`. Probá que todo funcione.
4. Site settings → Domain management → Add custom domain → `elroldelosmedios.com`.
5. En Hostinger, configurá el DNS que Netlify te indique (ver guía completa del chat).

## Verificaciones después de publicar
- **Contador:** el botón "Abrir contador" abre `Contador.html`.
- **Formularios:** "Sugerí una carta" y "Conseguí el juego" escriben en tu Google Sheet
  (vía Apps Script). Probá enviando uno y revisá la planilla.
- **GTM:** contenedor `GTM-K76FQWTX`. Tiene que estar **publicado** en tagmanager.google.com.
  Verificá con la extensión "Tag Assistant" o el modo Vista previa de GTM.
