// S — Contador (herramienta, ref "Jugá sin papel" + CONTADOR EN VIVO) + Testimonios (Comunidad)

// ── Contador de puntos ──────────────────────────────────────
function Contador() {
  const rows = [
    { label: 'Credibilidad', score: 1,  pct: 12, col: 'var(--cred)' },
    { label: 'Visibilidad',  score: 6,  pct: 55, col: 'var(--vis)'  },
    { label: 'Comunidad',    score: 8,  pct: 72, col: 'var(--com)'  },
  ];
  return (
    <section className="bg-sand">
      <div className="container contador-grid" style={{ display: 'grid', gridTemplateColumns: '1fr .82fr', gap: 72, alignItems: 'center' }}>
        {/* LEFT */}
        <div>
          <h2 className="display" style={{ fontSize: 'clamp(2.6rem,7vw,4.6rem)' }}>Jugá sin papel.</h2>
          <p className="body" style={{ marginTop: 24, fontSize: 18.5, lineHeight: 1.6, maxWidth: '42ch' }}>
            Contador de puntos optimizado para celular. Llevá las métricas Credibilidad, Visibilidad y Comunidad en la palma de tu mano durante la partida, sin lápices ni cuentas mentales.
          </p>
          <a className="btn btn-primary" href="contador.html" target="_blank" rel="noopener"
            onClick={() => { pushDL('click_contador', { section: 'contador' }); }}
            style={{ marginTop: 38, borderRadius: 0, textDecoration: 'none', letterSpacing: '.04em', textTransform: 'uppercase', fontSize: 14 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/>
              <line x1="8" y1="10" x2="8" y2="10"/><line x1="12" y1="10" x2="12" y2="10"/><line x1="16" y1="10" x2="16" y2="10"/>
              <line x1="8" y1="14" x2="8" y2="14"/><line x1="12" y1="14" x2="12" y2="14"/><line x1="16" y1="14" x2="16" y2="18"/>
              <line x1="8" y1="18" x2="12" y2="18"/>
            </svg>
            Abrir contador
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 2 }}>
              <path d="M7 17 17 7"/><path d="M8 7h9v9"/>
            </svg>
          </a>
        </div>
        {/* RIGHT — CONTADOR EN VIVO card */}
        <div style={{ position: 'relative' }}>
          <div style={{
            background: 'var(--paper)', border: '2px solid var(--ink)',
            boxShadow: '12px 12px 0 var(--ink)', padding: '34px 34px 40px'
          }}>
            <div style={{ textAlign: 'center', fontWeight: 800, fontSize: 13, letterSpacing: '.2em',
              textTransform: 'uppercase', color: 'var(--stone-500)', marginBottom: 34 }}>
              Contador en vivo
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
              {rows.map(r => (
                <div key={r.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
                    <span style={{ fontWeight: 800, fontSize: 14.5, letterSpacing: '.12em', textTransform: 'uppercase', color: r.col }}>{r.label}</span>
                    <span style={{ fontWeight: 900, fontSize: 40, lineHeight: 1, letterSpacing: '-.02em', color: 'var(--ink)' }}>{r.score}</span>
                  </div>
                  <div style={{ height: 5, background: 'var(--stone-300)', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: r.pct + '%', background: r.col, borderRadius: 999 }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Testimonios (Comunidad) ─────────────────────────────────
function Testimonios() {
  const quotes = [
    { q: 'Mis estudiantes discutieron temas de medios como nunca antes. Y se rieron.', who: 'Lucía M., Docente UBA' },
    { q: 'Lo usamos en un taller. Salió un debate de dos horas sin agenda forzada.', who: 'Pablo G., Comunicador' },
    { q: 'Convierte conceptos densos en jugadas concretas. Un golazo pedagógico.', who: 'Romina S., Periodista' },
  ];
  const iconLink = {
    width: 46, height: 46, borderRadius: 'var(--r-md)', border: '2px solid rgba(231,223,211,.4)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--paper)', transition: 'all .15s'
  };
  const hoverIn = e => { e.currentTarget.style.borderColor = 'var(--pink)'; e.currentTarget.style.color = 'var(--pink-soft)'; };
  const hoverOut = e => { e.currentTarget.style.borderColor = 'rgba(231,223,211,.4)'; e.currentTarget.style.color = 'var(--paper)'; };
  return (
    <section id="comunidad" style={{ background: '#10301c', color: 'var(--paper)' }}>
      <div className="container testi-grid" style={{ display: 'grid', gridTemplateColumns: '.85fr 1.15fr', gap: 64, alignItems: 'start' }}>
        {/* LEFT */}
        <div>
          <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--yellow)', marginBottom: 24 }}>
            Comunidad
          </div>
          <h2 className="h1" style={{ color: 'var(--pink-soft)' }}>
            <span style={{ color: '#fffaef' }}>Sumate a quienes</span><br/><span style={{ color: '#fffaef' }}>ya están</span> <span style={{ color: '#fffaef', position: 'relative', whiteSpace: 'nowrap' }}>jugándolo.
              <svg viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true"
                style={{ position: 'absolute', left: 0, right: 0, bottom: '-.16em', width: '100%', height: '.4em' }}>
                <path d="M2 7 Q 25 1, 50 6 T 100 6 T 150 6 T 198 5" stroke="var(--pink)" strokeWidth="3" fill="none" strokeLinecap="round"/>
              </svg>
            </span>
          </h2>
          <p className="lead" style={{ marginTop: 26, color: 'rgba(231,223,211,.8)', maxWidth: '26ch' }}>
            Compartí partidas, recursos y reflexiones con docentes, estudiantes y comunicadores.
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 36 }}>
            <a href="https://www.instagram.com/elroldelosmedios/" target="_blank" rel="noopener" aria-label="Instagram"
              style={iconLink} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a href="mailto:chechu.uba@gmail.com" aria-label="Escribinos un correo"
              style={iconLink} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M3 7l9 6 9-6"/>
              </svg>
            </a>
          </div>
        </div>
        {/* RIGHT — testimonial cards */}
        <div className="testi-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {quotes.map(t => (
            <figure key={t.who} style={{
              border: '1.5px solid rgba(231,223,211,.22)', borderRadius: 'var(--r-lg)', padding: '26px 22px 24px',
              display: 'flex', flexDirection: 'column', minHeight: 280, background: 'rgba(255,250,239,.03)'
            }}>
              <blockquote style={{ fontWeight: 500, fontSize: 18, lineHeight: 1.45, color: 'var(--paper)', flex: 1, textWrap: 'pretty' }}>
                “{t.q}”
              </blockquote>
              <figcaption style={{ marginTop: 22, fontWeight: 700, fontSize: 12.5, letterSpacing: '.08em',
                textTransform: 'uppercase', color: 'rgba(207,224,214,.6)', lineHeight: 1.4 }}>
                {t.who}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Contador = Contador;
window.Testimonios = Testimonios;
