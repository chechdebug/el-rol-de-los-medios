// S — Sugerí una carta (sugerencias → Sheet) + Conseguir el juego (pre-registro → Sheet)

// ────────────────────────────────────────────────────────────
// CONFIG — Google Sheets via Apps Script
const SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycby0zSy3locOHwHO0SKHzUvMbeZ8Kw79RRnHHPRR3NwNIEa1OlSKWMyhx8EL2lj_erJx_g/exec";
// ────────────────────────────────────────────────────────────

function pushDL(event, params) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(Object.assign({ event }, params || {}));
}

async function sendToSheet(formType, data) {
  if (!SHEET_ENDPOINT) return true; // demo mode
  try {
    const body = new URLSearchParams(Object.assign({ formType }, data));
    await fetch(SHEET_ENDPOINT, {
      method: 'POST', mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body
    });
    return true;
  } catch (e) { return true; } // no-cors → respuesta opaca
}

function Sugeri() {
  const [tipo, setTipo] = React.useState('Plataforma');
  const [sent, setSent] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const tipos = ['Plataforma', 'Actor', 'Condición', 'Evento'];

  const onSubmit = async e => {
    e.preventDefault();
    const f = e.target;
    const data = {
      nombre: f.nombre.value, email: f.email.value,
      carta: f.carta.value, tipo,
      efecto: f.efecto.value, base: f.base.value,
      fecha: new Date().toISOString(),
    };
    setBusy(true);
    pushDL('submit_sugerencia', { tipo_carta: tipo });
    await sendToSheet('sugerencia', data);
    setBusy(false);
    setSent(true);
  };

  return (
    <section className="bg-paper">
      <div className="container sugeri-grid" style={{ display: 'grid', gridTemplateColumns: '.9fr 1.1fr', gap: 56, alignItems: 'start' }}>
        <div>
          <KickerRow icon="blob">Comunidad</KickerRow>
          <h2 className="h1">El mazo no<br/>está cerrado.</h2>
          <p className="body" style={{ marginTop: 20, maxWidth: '36ch' }}>
            El ecosistema mediático cambia todo el tiempo, y el juego también. Si hay un autor,
            un fenómeno o una lógica que sentís que falta en el mazo, podés proponerla acá.
          </p>
          <p className="body" style={{ marginTop: 12, maxWidth: '36ch', color: 'var(--stone-500)' }}>
            Una vez por mes, la comunidad vota entre las propuestas más interesantes. La carta
            que gana entra en producción y se agrega al juego.
          </p>
        </div>
        <form onSubmit={onSubmit}
          style={{ background: 'var(--paper)', border: '2px solid var(--ink)', borderRadius: 20,
            padding: '28px 26px', boxShadow: '5px 5px 0 var(--ink)' }}>
          {sent ? (
            <div style={{ padding: '24px 4px', textAlign: 'center' }}>
              <img src="assets/icon-spark.svg" alt="" style={{ width: 40, height: 40, margin: '0 auto 14px' }} />
              <h3 className="h3">¡Muchas gracias por tu propuesta! 😊</h3>
              <p className="body" style={{ marginTop: 8, maxWidth: '34ch', margin: '10px auto 0' }}>
                Una vez al mes en comunidad votamos las próximas cartas.
              </p>
            </div>
          ) : (<>
            <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--stone-500)', marginBottom: 14 }}>
              Tus datos
            </div>
            <div className="forms-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 22 }}>
              <div className="field">
                <label>Tu nombre</label>
                <input className="input" name="nombre" placeholder="Nombre y apellido" required />
              </div>
              <div className="field">
                <label>Tu email</label>
                <input className="input" type="email" name="email" placeholder="vos@correo.com" required />
              </div>
            </div>
            <div style={{ height: 1, background: 'var(--hairline)', margin: '0 0 22px' }}></div>
            <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--stone-500)', marginBottom: 14 }}>
              La carta que proponés
            </div>
            <div className="field" style={{ marginBottom: 18 }}>
              <label>¿Cómo se llamaría?</label>
              <input className="input" name="carta" placeholder="Ej: Fake News Viral" required />
            </div>
            <div className="field" style={{ marginBottom: 18 }}>
              <label>¿Qué tipo de carta sería?</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
                {tipos.map(t => (
                  <button type="button" key={t} onClick={() => setTipo(t)}
                    style={{
                      fontFamily: 'inherit', fontWeight: 700, fontSize: 13,
                      padding: '7px 14px', borderRadius: 999, cursor: 'pointer',
                      border: '2px solid var(--ink)',
                      background: tipo === t ? 'var(--ink)' : 'transparent',
                      color: tipo === t ? 'var(--paper)' : 'var(--stone-700)',
                      transition: 'all .12s'
                    }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="field" style={{ marginBottom: 18 }}>
              <label>¿Qué haría en el juego?</label>
              <input className="input" name="efecto" placeholder="Ej: +2 VIS, −1 CRED por turno" required />
            </div>
            <div className="field" style={{ marginBottom: 22 }}>
              <label>¿En qué concepto, autor o caso real se basa?</label>
              <textarea className="textarea" name="base" placeholder="Texto libre" required></textarea>
            </div>
            <button className="btn btn-primary" type="submit" disabled={busy} style={{ width: '100%', justifyContent: 'center', opacity: busy ? .6 : 1 }}>
              {busy ? 'Enviando…' : 'Proponer carta'}
            </button>
          </>)}
        </form>
      </div>
    </section>
  );
}

function Conseguir() {
  const [sent, setSent] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [role, setRole] = React.useState('Docente');

  const onSubmit = async e => {
    e.preventDefault();
    const f = e.target;
    const data = {
      nombre: f.nombre.value, email: f.email.value, rol: role,
      fecha: new Date().toISOString(),
    };
    setBusy(true);
    pushDL('submit_preregistro', { rol: role });
    await sendToSheet('preregistro', data);
    setBusy(false);
    setSent(true);
  };

  return (
    <section id="conseguir" className="bg-ink">
      <div className="container" style={{ maxWidth: 620 }}>
        <div style={{ textAlign: 'center' }}>
          <div className="eyebrow on-ink">Pre-registro</div>
          <h2 className="display" style={{ color: 'var(--paper)', marginTop: 14 }}>Conseguí<br/>el juego</h2>
          <p className="lead on-ink" style={{ marginTop: 18, maxWidth: '40ch', marginInline: 'auto' }}>
            Estamos imprimiendo la primera tirada. Dejá tu correo y te avisamos apenas esté
            disponible, con un cupón de descuento por pre-registrarte.
          </p>
        </div>

        {sent ? (
          <div style={{ marginTop: 36, background: '#1b1e20', border: '2px solid #2a2d2f',
            borderRadius: 18, padding: '32px 28px', textAlign: 'center' }}>
            <img src="assets/icon-spark.svg" alt="" style={{ width: 44, height: 44, margin: '0 auto 14px', filter: 'invert(1)' }} />
            <h3 className="h3" style={{ color: 'var(--paper)' }}>¡Muchas gracias por tu interés! 😊</h3>
            <p className="body" style={{ marginTop: 8, color: 'var(--on-ink-mute)' }}>
              Pronto nos pondremos en contacto con vos.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit}
            style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="forms-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div className="field">
                <label style={{ color: 'var(--paper)' }}>Nombre</label>
                <input className="input" name="nombre" placeholder="Tu nombre" required />
              </div>
              <div className="field">
                <label style={{ color: 'var(--paper)' }}>Email</label>
                <input className="input" name="email" type="email" placeholder="vos@universidad.edu" required />
              </div>
            </div>
            <div className="field">
              <label style={{ color: 'var(--paper)' }}>Soy</label>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 4 }}>
                {['Docente', 'Estudiante', 'Institución'].map(r => (
                  <button type="button" key={r} onClick={() => setRole(r)}
                    className="btn btn-sm"
                    style={role === r
                      ? { background: 'var(--yellow)', color: 'var(--ink)', borderColor: 'var(--yellow)', boxShadow: 'none' }
                      : { background: 'transparent', color: 'var(--paper)', borderColor: '#2a2d2f', boxShadow: 'none' }}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <button className="btn btn-accent" type="submit" disabled={busy}
              style={{ justifyContent: 'center', marginTop: 6, opacity: busy ? .6 : 1 }}>
              {busy ? 'Enviando…' : 'Quiero pre-registrarme'}
            </button>
            <p style={{ fontSize: 12.5, color: 'var(--on-ink-mute)', textAlign: 'center', lineHeight: 1.5 }}>
              Sin spam — solo el aviso de lanzamiento y tu cupón de descuento.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
window.Sugeri = Sugeri; window.Conseguir = Conseguir; window.pushDL = pushDL;
