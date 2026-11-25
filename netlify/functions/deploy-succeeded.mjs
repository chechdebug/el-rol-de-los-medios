// Avisa a Bing (y a los demás buscadores que usan IndexNow) qué páginas
// cambiaron, para que las vuelvan a leer enseguida.
// Netlify la ejecuta sola cada vez que termina de publicar el sitio:
// no hay que hacer nada a mano.
//
// Manda las páginas del sitemap con fecha (lastmod) de los últimos 3 días.
// La clave está en el archivo /530bca5294a7e5c60af233c544e72ac3.txt de la raíz del repo: si la cambiás,
// cambiá los dos lugares.

const SITE = 'https://elroldelosmedios.com';
const KEY = '530bca5294a7e5c60af233c544e72ac3';
const DIAS = 3;

export const handler = async () => {
  try {
    const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
    const desde = new Date(Date.now() - DIAS * 864e5).toISOString().slice(0, 10);
    const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc><lastmod>([^<]+)<\/lastmod>/g)]
      .filter(([, , lastmod]) => lastmod >= desde)
      .map(([, loc]) => loc);

    if (!urlList.length) {
      console.log('IndexNow: no hay páginas nuevas o cambiadas.');
      return { statusCode: 200 };
    }

    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: new URL(SITE).host,
        key: KEY,
        keyLocation: `${SITE}/${KEY}.txt`,
        urlList,
      }),
    });
    console.log(`IndexNow: respuesta ${res.status} para ${urlList.length} página(s):`, urlList.join(', '));
  } catch (e) {
    // Si falla el aviso, el sitio igual queda publicado.
    console.error('IndexNow: no se pudo avisar.', e);
  }
  return { statusCode: 200 };
};
