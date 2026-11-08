// scripts/build.mjs — arma el sitio publicable en dist/
//
// Netlify lo corre en cada cambio del repo (ver netlify.toml):
//   1. Copia la landing, el contador y los assets tal cual.
//   2. Convierte cada articulos/*.md en /blog/<nombre>/index.html.
//   3. Genera /blog/, /blog/feed.xml, /sitemap.xml y /llms.txt.
//   4. Completa en index.html las preguntas frecuentes (texto + JSON-LD) y los
//      últimos artículos, para que buscadores e IA los lean sin JavaScript.
//
// Si un artículo tiene un error, el build falla con un mensaje claro y Netlify
// deja publicada la versión anterior: el sitio nunca queda roto.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'dist');
const POSTS_DIR = path.join(ROOT, 'articulos');

const SITE = 'https://elroldelosmedios.com';
const SITE_NAME = 'El Rol de los Medios';
const DEFAULT_AUTHOR = 'Cecilia Vitelli';
const GTM_ID = 'GTM-K76FQWTX';
const LOGO = `${SITE}/assets/logo-horizontal.svg`;

// Archivos del repo que no se publican.
const EXCLUDE = new Set([
  '.git', '.github', '.gitignore', '.DS_Store', 'node_modules', 'dist',
  'articulos', 'scripts', 'package.json', 'package-lock.json', 'netlify.toml',
  'sitemap.xml', 'llms.txt', // se generan
]);

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio',
  'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

// ───────────────────────── utilidades ─────────────────────────

class ArticleError extends Error {}
const fail = (file, msg) => { throw new ArticleError(`Error en articulos/${file}: ${msg}`); };

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const stripAccents = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const slugify = (s) => stripAccents(s).toLowerCase()
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

// JSON dentro de <script>: evita que un "</script>" en un texto corte el bloque.
const jsonLd = (obj) =>
  `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2).replace(/</g, '\\u003c')}\n</script>`;

const fechaLarga = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} de ${MESES[m - 1]} de ${y}`;
};

const rfc822 = (iso) => new Date(`${iso}T12:00:00-03:00`).toUTCString();

const isYes = (v) => ['si', 'sí', 'true', 'yes', '1'].includes(String(v || '').trim().toLowerCase());

const isRemote = (src) => /^https?:\/\//i.test(src);
// "assets/foto.jpg" o "./assets/foto.jpg" se interpretan como "/assets/foto.jpg".
const normalizeSrc = (src) => (isRemote(src) || src.startsWith('/') ? src : `/${src.replace(/^\.\//, '')}`);

const isVideo = (src) => /\.(mp4|webm)$/i.test(src.split(/[?#]/)[0]);
const localPath = (src) => path.join(ROOT, decodeURIComponent(src.split(/[?#]/)[0]).replace(/^\/+/, ''));

// Comprueba que una imagen o video local exista en el repo, con el nombre exacto.
function checkImage(file, src) {
  if (isRemote(src)) return;
  const what = isVideo(src) ? 'el video' : 'la imagen';
  const abs = localPath(src);
  if (fs.existsSync(abs)) {
    const mb = fs.statSync(abs).size / 1048576;
    if (/\.gif$/i.test(src) && mb > 2) {
      fail(file, `${what} "${src}" es un GIF de ${mb.toFixed(1)} MB y haría muy lenta la página. Exportalo como MP4 (desde Canva o en ezgif.com/gif-to-mp4) y usá el .mp4 con la misma escritura.`);
    }
    return { mb };
  }
  const dir = path.dirname(abs);
  const near = fs.existsSync(dir)
    ? fs.readdirSync(dir).find((f) => f.toLowerCase() === path.basename(abs).toLowerCase()) : null;
  fail(file, near
    ? `${what} "${src}" está subida como "${near}". El nombre tiene que coincidir exacto, con mayúsculas y minúsculas.`
    : `no encuentro ${what} "${src}". ¿La subiste a la carpeta assets? ¿El nombre está escrito igual?`);
}

// Portada de un video: una imagen con el mismo nombre (video.mp4 → video.jpg).
const posterFor = (src) => {
  if (isRemote(src)) return '';
  const base = src.split(/[?#]/)[0].replace(/\.[^.\/]+$/, '');
  return ['.jpg', '.jpeg', '.png', '.webp'].map((e) => base + e).find((p) => fs.existsSync(localPath(p))) || '';
};

// Lo que aparece en el texto de cada artículo (se completa al convertirlo).
let media = [];

// Imágenes y videos del texto: <figure> con epígrafe opcional
//   ![descripción](/assets/foto.jpg "Epígrafe")   o   ![descripción](/assets/video.mp4 "Epígrafe")
marked.use({
  renderer: {
    image({ href, title, text }) {
      const src = normalizeSrc(href);
      const alt = text || '';
      const caption = title ? `<figcaption>${esc(title)}</figcaption>` : '';
      if (isVideo(src)) {
        const poster = posterFor(src);
        media.push({ kind: 'video', src, alt, title: title || '', poster });
        // Como un GIF: arranca solo, sin sonido y en loop; con controles para pausarlo.
        return `<figure class="b-fig b-fig-video"><video src="${esc(src)}"${poster ? ` poster="${esc(poster)}"` : ''} autoplay muted loop playsinline controls preload="metadata" aria-label="${esc(alt)}"></video>${caption}</figure>`;
      }
      media.push({ kind: 'image', src, alt, title: title || '' });
      return `<figure class="b-fig"><img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async">${caption}</figure>`;
    },
  },
});

const write = (rel, content) => {
  const file = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
};

// ───────────────────────── artículos ─────────────────────────

function parseArticle(file) {
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8').replace(/^\uFEFF/, '');
  const m = raw.match(/^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)([\s\S]*)$/);
  if (!m) fail(file, 'falta el bloque de datos al principio. El archivo tiene que empezar con una línea "---", después titulo/descripcion/fecha y otra línea "---".');

  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const i = line.indexOf(':');
    if (i === -1) fail(file, `no entiendo esta línea de datos: "${line.trim()}". Cada línea tiene que ser "campo: valor".`);
    const key = stripAccents(line.slice(0, i).trim().toLowerCase());
    let val = line.slice(i + 1).trim();
    if (val.length > 1 && ((val[0] === '"' && val.at(-1) === '"') || (val[0] === "'" && val.at(-1) === "'"))) {
      val = val.slice(1, -1);
    }
    data[key] = val;
  }

  const titulo = data.titulo;
  const descripcion = data.descripcion;
  const fecha = data.fecha;
  if (!titulo) fail(file, 'falta "titulo:".');
  if (!descripcion) fail(file, 'falta "descripcion:" (una o dos oraciones; es lo que muestra Google).');
  if (!fecha) fail(file, 'falta "fecha:" (por ejemplo: fecha: 2026-11-08).');
  const isoOk = (v) => /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v));
  if (!isoOk(fecha)) fail(file, `la fecha "${fecha}" tiene que ir con formato año-mes-día, por ejemplo 2026-11-08.`);
  if (data.actualizado && !isoOk(data.actualizado)) {
    fail(file, `"actualizado: ${data.actualizado}" tiene que ir con formato año-mes-día, por ejemplo 2026-12-01.`);
  }

  const warnings = [];
  if (descripcion.length > 160) warnings.push(`la descripción tiene ${descripcion.length} caracteres; Google corta alrededor de 160.`);
  if (titulo.length > 70) warnings.push(`el título tiene ${titulo.length} caracteres; Google corta alrededor de 60-70.`);

  // Un solo <h1> por página (el título): si en el texto usaste "# ", baja a h2.
  // Una imagen sola en su línea queda como <figure> suelta, no dentro de un <p>.
  media = [];
  const html = marked.parse(m[2].trim())
    .replace(/<h1(\s|>)/g, '<h2$1').replace(/<\/h1>/g, '</h2>')
    .replace(/<p>\s*(<figure class="b-fig[^"]*">[\s\S]*?<\/figure>)\s*<\/p>/g, '$1');
  const words = m[2].replace(/[#*_>`\-\[\]()!]/g, ' ').split(/\s+/).filter(Boolean).length;
  const items = media;

  const imagen = data.imagen ? normalizeSrc(data.imagen) : '';
  if (imagen) {
    if (isVideo(imagen)) fail(file, `"imagen:" tiene que ser una foto (jpg, png o webp). Los videos van dentro del texto con ![descripción](${imagen}).`);
    checkImage(file, imagen);
  }
  for (const it of items) {
    const info = checkImage(file, it.src);
    const label = it.kind === 'video' ? 'el video' : 'la imagen';
    if (!it.alt.trim()) warnings.push(`${label} ${it.src} no tiene descripción entre los corchetes ![ ]; Google y los lectores de pantalla la usan.`);
    if (info && it.kind === 'image' && info.mb > 0.6) warnings.push(`la imagen ${it.src} pesa ${info.mb.toFixed(1)} MB; conviene achicarla a menos de 300 KB (squoosh.app).`);
    if (info && it.kind === 'video' && info.mb > 10) warnings.push(`el video ${it.src} pesa ${info.mb.toFixed(1)} MB; en el celular va a tardar en cargar.`);
    if (it.kind === 'video' && !it.poster) warnings.push(`el video ${it.src} no tiene portada: subí una imagen con el mismo nombre (por ejemplo ${it.src.replace(/\.[^.]+$/, '.jpg')}).`);
  }
  const firstImage = items.find((i) => i.kind === 'image')?.src;
  const firstVideo = items.find((i) => i.kind === 'video' && i.poster);

  return {
    file,
    slug: slugify(file.replace(/\.md$/i, '')),
    titulo,
    descripcion,
    fecha,
    actualizado: data.actualizado || fecha,
    resumen: data.resumen || '',
    imagen,
    // Para la vista previa en redes y Google: la portada o, si no hay, la primera
    // imagen del texto o la portada del primer video.
    imagenSocial: imagen || firstImage || firstVideo?.poster || '',
    video: firstVideo || null,
    autor: data.autor || DEFAULT_AUTHOR,
    borrador: isYes(data.borrador),
    html,
    words,
    warnings,
  };
}

function loadArticles() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR)
    .filter((f) => f.toLowerCase().endsWith('.md'))
    .filter((f) => !f.startsWith('_') && f.toLowerCase() !== 'readme.md');
  const posts = files.map(parseArticle).filter((p) => !p.borrador);
  const seen = new Map();
  for (const p of posts) {
    if (!p.slug) fail(p.file, 'el nombre del archivo tiene que tener letras o números.');
    if (seen.has(p.slug)) fail(p.file, `tiene la misma dirección que articulos/${seen.get(p.slug)}. Cambiale el nombre a uno de los dos.`);
    seen.set(p.slug, p.file);
  }
  return posts.sort((a, b) => b.fecha.localeCompare(a.fecha) || a.titulo.localeCompare(b.titulo));
}

// ───────────────────────── plantillas ─────────────────────────

const absUrl = (u) => (/^https?:\/\//.test(u) ? u : `${SITE}${u.startsWith('/') ? '' : '/'}${u}`);

function head({ title, description, canonical, ogType = 'website', image, extra = '' }) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${GTM_ID}');</script>
  <!-- End Google Tag Manager -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:site_name" content="${SITE_NAME}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:type" content="${ogType}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:locale" content="es_AR">
${image ? `  <meta property="og:image" content="${esc(absUrl(image))}">\n  <meta name="twitter:card" content="summary_large_image">` : '  <meta name="twitter:card" content="summary">'}
  <link rel="alternate" type="application/rss+xml" title="Blog de ${SITE_NAME}" href="${SITE}/blog/feed.xml">
  <link rel="icon" href="/assets/favicon.jpeg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700;800;900&family=Newsreader:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/colors_and_type.css">
  <link rel="stylesheet" href="/assets/blog.css">
${extra}
</head>
<body>
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <header class="b-hdr">
    <a href="/" aria-label="${SITE_NAME}"><img src="/assets/logo-horizontal.svg" alt="${SITE_NAME}" width="80" height="80"></a>
    <nav>
      <a href="/#que-es">Qué es</a>
      <a href="/#carta-dia">Carta del día</a>
      <a href="/#comunidad">Comunidad</a>
      <a href="/blog/" aria-current="page">Blog</a>
    </nav>
  </header>
`;
}

const footer = `
  <footer class="b-ftr">
    <a href="/">Inicio</a>
    <a href="/blog/">Blog</a>
    <a href="/contador.html">Contador</a>
    <a href="https://www.instagram.com/elroldelosmedios/" target="_blank" rel="noopener">Instagram</a>
  </footer>
</body>
</html>
`;

const card = (p) => `      <li>
        <a href="/blog/${p.slug}/">
          <h2>${esc(p.titulo)}</h2>
          <p>${esc(p.descripcion)}</p>
          <time datetime="${p.fecha}">${fechaLarga(p.fecha)}</time>
        </a>
      </li>`;

function articlePage(p, all) {
  const url = `${SITE}/blog/${p.slug}/`;
  const others = all.filter((o) => o.slug !== p.slug).slice(0, 3);
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: p.titulo,
      description: p.descripcion,
      datePublished: p.fecha,
      dateModified: p.actualizado,
      inLanguage: 'es',
      url,
      mainEntityOfPage: url,
      wordCount: p.words,
      ...(p.imagenSocial ? { image: absUrl(p.imagenSocial) } : {}),
      ...(p.video ? {
        video: {
          '@type': 'VideoObject',
          name: p.video.title || p.titulo,
          description: p.video.alt || p.descripcion,
          thumbnailUrl: absUrl(p.video.poster),
          contentUrl: absUrl(p.video.src),
          uploadDate: p.fecha,
        },
      } : {}),
      author: { '@type': 'Person', name: p.autor, url: `${SITE}/` },
      publisher: {
        '@type': 'Organization', name: SITE_NAME, url: `${SITE}/`,
        logo: { '@type': 'ImageObject', url: LOGO },
      },
      isPartOf: { '@type': 'Blog', name: `Blog de ${SITE_NAME}`, url: `${SITE}/blog/` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog/` },
        { '@type': 'ListItem', position: 3, name: p.titulo, item: url },
      ],
    },
  ];
  const updated = p.actualizado !== p.fecha
    ? ` · Actualizado el <time datetime="${p.actualizado}">${fechaLarga(p.actualizado)}</time>` : '';

  return head({
    title: p.titulo,
    description: p.descripcion,
    canonical: url,
    ogType: 'article',
    image: p.imagenSocial,
    extra: `  <meta property="article:published_time" content="${p.fecha}">\n  <meta property="article:modified_time" content="${p.actualizado}">\n  <meta name="author" content="${esc(p.autor)}">\n  ${schema.map(jsonLd).join('\n  ')}`,
  }) + `
  <main class="b-wrap">
    <nav class="b-crumbs" aria-label="Ruta"><a href="/">Inicio</a> <span aria-hidden="true">/</span> <a href="/blog/">Blog</a></nav>
    <article>
      <h1>${esc(p.titulo)}</h1>
      <p class="b-meta">Por ${esc(p.autor)}${p.autor === DEFAULT_AUTHOR ? `, creadora de ${SITE_NAME}` : ''} · <time datetime="${p.fecha}">${fechaLarga(p.fecha)}</time>${updated}</p>
${p.imagen ? `      <img class="b-cover" src="${esc(p.imagen)}" alt="${esc(p.titulo)}" fetchpriority="high">\n` : ''}${p.resumen ? `      <p class="b-summary"><strong>En pocas palabras:</strong> ${esc(p.resumen)}</p>\n` : ''}
      <div class="b-body">
${p.html}
      </div>

      <aside class="b-cta">
        <p><strong>¿Querés llevarlo al aula?</strong> El Rol de los Medios es un juego de cartas que convierte credibilidad, visibilidad y comunidad en decisiones. Se juega de a dos, en 20 minutos.</p>
        <p class="b-cta-btns">
          <a class="b-btn" href="/#conseguir">Quiero el juego</a>
          <a class="b-btn b-btn-alt" href="/contador.html">Probá el contador</a>
        </p>
      </aside>
    </article>
${others.length ? `
    <section class="b-more">
      <h2>Más artículos</h2>
      <ul class="b-list">
${others.map(card).join('\n')}
      </ul>
    </section>` : ''}
  </main>
` + footer;
}

function blogIndex(posts) {
  const url = `${SITE}/blog/`;
  const description = 'Artículos sobre enseñanza de medios, credibilidad, visibilidad y juegos de cartas para estudiantes y docentes de Comunicación.';
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `Blog de ${SITE_NAME}`,
    description,
    url,
    inLanguage: 'es',
    publisher: { '@type': 'Organization', name: SITE_NAME, url: `${SITE}/`, logo: { '@type': 'ImageObject', url: LOGO } },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting', headline: p.titulo, url: `${SITE}/blog/${p.slug}/`,
      datePublished: p.fecha, dateModified: p.actualizado, author: { '@type': 'Person', name: p.autor },
    })),
  };
  return head({
    title: `Blog | ${SITE_NAME}`,
    description,
    canonical: url,
    extra: `  ${jsonLd(schema)}`,
  }) + `
  <main class="b-wrap">
    <p class="b-kicker">Blog</p>
    <h1>Pensar los medios, jugando y leyendo</h1>
    <p class="b-lead">Notas sobre cómo enseñar teoría de medios, credibilidad y visibilidad en la universidad.</p>
${posts.length ? `    <ul class="b-list">\n${posts.map(card).join('\n')}\n    </ul>` : '    <p>Muy pronto, los primeros artículos.</p>'}
  </main>
` + footer;
}

// ───────────────────────── landing (index.html) ─────────────────────────

function readFaqs() {
  const src = fs.readFileSync(path.join(ROOT, 'faq.jsx'), 'utf8');
  const str = "'((?:\\\\.|[^'\\\\])*)'";
  const re = new RegExp(`q:\\s*${str},\\s*a:\\s*${str}`, 'g');
  const un = (s) => s.replace(/\\n/g, '\n').replace(/\\'/g, "'").replace(/\\"/g, '"');
  return [...src.matchAll(re)].map((m) => ({ q: un(m[1]), a: un(m[2]) }));
}

function buildIndex(posts) {
  let page = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const faqs = readFaqs();
  if (!faqs.length) console.warn('Aviso: no encontré preguntas en faq.jsx; la landing sale sin FAQ estático.');

  const faqSchema = faqs.length ? jsonLd({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  }) : '';
  const faqHtml = faqs.length
    ? `<h2>Preguntas frecuentes</h2>\n      ${faqs.map(({ q, a }) => `<h3>${esc(q)}</h3>${a.split(/\n{2,}/).filter((x) => x.trim()).map((x) => `<p>${esc(x.trim())}</p>`).join('')}`).join('\n      ')}`
    : '';
  const blogLinks = posts.slice(0, 5)
    .map((p) => `<li><a href="/blog/${p.slug}/">${esc(p.titulo)}</a></li>`).join('\n        ');

  for (const [marker, value] of [['FAQ_JSONLD', faqSchema], ['FAQ_HTML', faqHtml], ['BLOG_LINKS', blogLinks]]) {
    const tag = `<!-- BUILD:${marker} -->`;
    if (!page.includes(tag)) { console.warn(`Aviso: index.html no tiene ${tag}.`); continue; }
    page = page.replace(tag, value);
  }
  write('index.html', page);
  return faqs.length;
}

// ───────────────────────── sitemap, RSS, llms.txt ─────────────────────────

function sitemap(posts, today) {
  const urls = [
    { loc: `${SITE}/`, lastmod: today, priority: '1.0' },
    { loc: `${SITE}/blog/`, lastmod: posts[0]?.actualizado || today, priority: '0.8' },
    ...posts.map((p) => ({ loc: `${SITE}/blog/${p.slug}/`, lastmod: p.actualizado, priority: '0.7' })),
    { loc: `${SITE}/contador.html`, priority: '0.4' },
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}<priority>${u.priority}</priority></url>`).join('\n')}
</urlset>
`;
}

function rss(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Blog de ${SITE_NAME}</title>
  <link>${SITE}/blog/</link>
  <atom:link href="${SITE}/blog/feed.xml" rel="self" type="application/rss+xml"/>
  <description>Artículos sobre enseñanza de medios, credibilidad y visibilidad.</description>
  <language>es-ar</language>
${posts.map((p) => `  <item>
    <title>${esc(p.titulo)}</title>
    <link>${SITE}/blog/${p.slug}/</link>
    <guid isPermaLink="true">${SITE}/blog/${p.slug}/</guid>
    <pubDate>${rfc822(p.fecha)}</pubDate>
    <description>${esc(p.descripcion)}</description>
  </item>`).join('\n')}
</channel>
</rss>
`;
}

function llms(posts) {
  return `# ${SITE_NAME}

> Juego de cartas pedagógico sobre el ecosistema mediático para estudiantes y docentes universitarios de Comunicación. Cada jugador gestiona tres métricas: Credibilidad, Visibilidad y Comunidad; gana quien llega a 15 en cualquiera de ellas. Juego físico, para 2 jugadores, de unos 20 minutos por partida, con un contador de puntos web. Creado por ${DEFAULT_AUTHOR} como Trabajo Integrador Final de la Licenciatura en Ciencias de la Comunicación (UBA, 2026).

## Páginas principales

- [Inicio](${SITE}/): qué es el juego, cómo funciona, para quién es y preguntas frecuentes
- [Contador de puntos](${SITE}/contador.html): web app para llevar la partida desde el celular
- [Blog](${SITE}/blog/): artículos sobre enseñanza de medios, credibilidad y visibilidad
${posts.length ? `
## Artículos

${posts.map((p) => `- [${p.titulo}](${SITE}/blog/${p.slug}/): ${p.descripcion}`).join('\n')}
` : ''}`;
}

// ───────────────────────── main ─────────────────────────

function main() {
  const today = new Date().toISOString().slice(0, 10);
  const posts = loadArticles();

  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });
  for (const entry of fs.readdirSync(ROOT)) {
    if (EXCLUDE.has(entry) || entry.toLowerCase().endsWith('.md')) continue;
    fs.cpSync(path.join(ROOT, entry), path.join(OUT, entry), { recursive: true });
  }

  const faqCount = buildIndex(posts);
  write('blog/index.html', blogIndex(posts));
  for (const p of posts) write(`blog/${p.slug}/index.html`, articlePage(p, posts));
  write('blog/feed.xml', rss(posts));
  write('sitemap.xml', sitemap(posts, today));
  write('llms.txt', llms(posts));

  console.log(`Listo: ${posts.length} artículo(s) publicado(s), ${faqCount} preguntas frecuentes en la landing.`);
  for (const p of posts) {
    console.log(`  /blog/${p.slug}/  (${p.fecha})`);
    for (const w of p.warnings) console.warn(`  Aviso en articulos/${p.file}: ${w}`);
  }
}

try {
  main();
} catch (e) {
  if (e instanceof ArticleError) {
    console.error(`\n${e.message}\n\nNo se publicó nada nuevo: el sitio sigue como estaba hasta que lo corrijas.\n`);
    process.exit(1);
  }
  throw e;
}
