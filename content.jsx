// Content sections: Qué es (S2), Cómo funciona / Métricas (S3), Para quién es (S6)

function KickerRow({ icon, children, onInk }) {
  return (
    <div className="kicker-row">
      {icon && <img src={`assets/icon-${icon}.svg`} alt="" className="ic"
        style={onInk ? { filter: 'invert(1)' } : null} />}
      <span className={'eyebrow' + (onInk ? ' on-ink' : '')}>{children}</span>
    </div>
  );
}

// S2 — Qué es
function QueEs() {
  return (
    <section id="que-es" className="bg-paper">
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
        <div>
          <KickerRow icon="spark">El ecosistema mediático</KickerRow>
          <h2 className="h1" style={{ maxWidth: '20ch' }}>Los medios no te dicen qué pensar. Te dicen sobre qué pensar.</h2>
        </div>
        <div>
          <p className="body" style={{ fontSize: 18, lineHeight: 1.7 }}>
            El problema no es entender la teoría, es que la teoría rara vez se experimenta.
            <strong style={{ color: 'var(--ink)', fontWeight: 700 }}> El Rol de los Medios</strong> es
            un juego de cartas pedagógico que convierte los procesos del ecosistema mediático en
            decisiones concretas: qué publicar, qué amplificar, a quién silenciar.
          </p>
          <p className="body" style={{ marginTop: 18 }}>
            Diseñado para el aula universitaria. Jugable en 20 minutos. Construido sobre autores
            y sucesos del ecosistema mediático contemporáneo.
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 28, flexWrap: 'wrap' }}>
            <span className="chip chip-navy" style={{ fontWeight: 700, fontSize: 13 }}>Teoría de la Comunicación</span>
            <span className="chip chip-green" style={{ fontWeight: 700, fontSize: 13 }}>Periodismo</span>
            <span className="chip chip-pink" style={{ fontWeight: 700, fontSize: 13 }}>Comunicación Digital</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// S3 — Cómo funciona: las tres métricas
function ComoFunciona() {
  const metrics = [
    {
      key: 'CRED', name: 'Credibilidad', color: '#378ADD', soft: '#d0e5f7',
      desc: 'Mide qué tan confiable perciben tu medio los otros jugadores.',
      detail: 'Cae rápido con decisiones oportunistas. Sube despacio con consistencia editorial. La base de todo lo demás.'
    },
    {
      key: 'VIS', name: 'Visibilidad', color: '#EF9F27', soft: '#fce7be',
      desc: 'Representa el alcance de tus publicaciones en el ecosistema.',
      detail: 'Alta visibilidad no garantiza credibilidad — y viceversa. Dominar las dos a la vez es el desafío central.'
    },
    {
      key: 'COM', name: 'Comunidad', color: '#1D9E75', soft: '#c4e8dc',
      desc: 'Indica la solidez de tu red de aliados y audiencia fiel.',
      detail: 'Tu escudo ante las crisis. Un actor con comunidad fuerte resiste ataques que destruirían a otros.'
    },
  ];

  return (
    <section className="bg-sand">
      <div className="container">
        <KickerRow icon="list">Mecánica central</KickerRow>
        <h2 className="h1" style={{ maxWidth: '18ch', marginBottom: 48 }}>Tres métricas. Un ecosistema.</h2>
        <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {metrics.map(m => (
            <div key={m.key} style={{
              background: 'var(--paper)', border: '2px solid var(--ink)', borderRadius: 18,
              padding: '28px 24px', boxShadow: '5px 5px 0 var(--ink)', display: 'flex', flexDirection: 'column', gap: 0
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                <div style={{ background: m.color, color: '#fff', fontWeight: 900, fontSize: 15,
                  letterSpacing: '.06em', padding: '6px 14px', borderRadius: 999, border: '2px solid var(--ink)' }}>
                  {m.key}
                </div>
                <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: '-.01em' }}>{m.name}</span>
              </div>
              <p style={{ fontWeight: 600, fontSize: 16, lineHeight: 1.4, color: 'var(--ink)', marginBottom: 12 }}>
                {m.desc}
              </p>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--stone-700)', marginTop: 'auto' }}>
                {m.detail}
              </p>
              <div style={{ marginTop: 20, height: 6, borderRadius: 999, background: m.soft, border: `2px solid ${m.color}`, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: m.key === 'CRED' ? '58%' : m.key === 'VIS' ? '76%' : '42%', background: m.color, borderRadius: 999 }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// S6 — Para quién es
function ParaQuien() {
  const cols = [
    {
      title: 'Para quienes\nenseñan comunicación',
      color: 'var(--green)',
      body: 'Una herramienta para hacer visible lo que los textos describen. El juego modela la agenda setting, la viralidad, la credibilidad y la lógica algorítmica sin que nadie tenga que explicarlos: los jugadores los viven.',
      note: 'Incluye manual docente con marco teórico, glosario de mecánicas y preguntas disparadoras para el cierre.',
      benefits: ['Lista para usar en el aula, sin preparación extra', 'Compatible con Teoría de la Comunicación, Periodismo y Comunicación Digital'],
      cta: 'Quiero el kit docente',
    },
    {
      title: 'Para quienes estudian\n(y cuestionan) los medios',
      color: 'var(--navy)',
      body: '¿Qué pasa cuando el algoritmo amplifica todo menos la credibilidad? ¿Cuánto cuesta construir comunidad? El Rol de los Medios pone esas preguntas en tus manos, literalmente.',
      note: 'No hace falta saber de juegos de cartas. Hace falta querer jugar con las ideas.',
      benefits: ['Aprendizaje activo: teoría en forma de decisiones reales', 'Cartas basadas en autores de programas de estudios (Verón, Peirce, McCombs, Han, Da Empoli, Jenkins)', 'Se juega de a dos, en menos de media hora'],
      cta: 'Quiero jugar',
    },
  ];
  return (
    <section id="para-quien" className="bg-paper">
      <div className="container">
        <KickerRow icon="people">Para quién es</KickerRow>
        <h2 className="h1" style={{ maxWidth: '18ch', marginBottom: 44 }}>Pensado para los dos lados del aula</h2>
        <div className="quien-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {cols.map(col => (
            <div key={col.title} style={{ border: '2px solid var(--ink)', borderRadius: 18, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ background: col.color, color: '#fff', padding: '22px 26px' }}>
                <h3 style={{ fontWeight: 900, fontSize: 22, letterSpacing: '-.01em', lineHeight: 1.15, whiteSpace: 'pre-line' }}>{col.title}</h3>
              </div>
              <div style={{ padding: '22px 26px', flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <p className="body">{col.body}</p>
                <p className="body" style={{ fontStyle: 'italic', color: 'var(--stone-500)', fontSize: 15 }}>{col.note}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
                  {col.benefits.map(b => (
                    <li key={b} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 15, lineHeight: 1.45 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: col.color, flex: 'none', marginTop: 5 }}></span>
                      {b}
                    </li>
                  ))}
                </ul>
                <a href="#conseguir" className="btn btn-ghost btn-sm" style={{ alignSelf: 'flex-start', marginTop: 8, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>{col.cta}</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.QueEs = QueEs; window.ComoFunciona = ComoFunciona; window.ParaQuien = ParaQuien; window.KickerRow = KickerRow;
