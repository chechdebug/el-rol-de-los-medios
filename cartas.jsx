// S — Carta del Día: featured deck card that rotates daily through the 15 real cards.
// Data sourced from DOXA_Mazo (1).xlsx.

const MAZO = [
  { num: 1, nombre: 'Diario / Revista', categoria: 'Plataforma', cred: '+2', vis: '0', com: '0',
    concepto: 'Contrato de Lectura y Género Producto', autores: 'Eliseo Verón / Amparo Rocha Alonso',
    cita: 'En un soporte de prensa, todo contenido es tomado a cargo por una estructura enunciativa que constituye su contrato de lectura.', fuente: 'Eliseo Verón' },
  { num: 2, nombre: 'Canal de TV', categoria: 'Plataforma', cred: '0', vis: '+3', com: '0',
    concepto: 'Eje O-O y Régimen Indicial', autores: 'Eliseo Verón / Lila Luchessi',
    cita: 'La mirada que el conductor dirige al ojo vacío de la cámara hace que yo me sienta mirado: «está ahí, lo veo, me habla».', fuente: 'Eliseo Verón' },
  { num: 3, nombre: 'Canal de Streaming', categoria: 'Plataforma', cred: '0', vis: '+1', com: '+2',
    concepto: 'Hipermediaciones y Modelo Networking', autores: 'Carlos Scolari',
    cita: 'Pasamos de la fascinación por los objetos a los procesos de hipermediación: una red de usuarios interactuando entre sí.', fuente: 'Carlos Scolari' },
  { num: 4, nombre: 'Newsletter', categoria: 'Plataforma', cred: '+2', vis: '0', com: '0',
    concepto: 'Sistema Push y Curaduría de Autor', autores: 'Michael Bhaskar / João Canavilhas',
    cita: 'Frente a la infoxicación, curar es el acto humano de seleccionar, filtrar y dar sentido. Es criterio contra el caos algorítmico.', fuente: 'Michael Bhaskar' },
  { num: 5, nombre: 'Red Social Algorítmica', categoria: 'Plataforma', cred: '0', vis: '+2', com: '+1',
    concepto: 'Capitalismo de Plataformas y Cámaras de Eco', autores: 'Nick Srnicek / Ernesto Calvo',
    cita: 'En el espacio virtual, los individuos que piensan igual retuitean juntos. La red social educa y coordina para que actúen igual.', fuente: 'Ernesto Calvo' },
  { num: 6, nombre: 'El Ingeniero del Caos', categoria: 'Actor', cred: '-2', vis: '+3', com: '0',
    concepto: 'Propaganda Algorítmica y Microsegmentación', autores: 'Giuliano da Empoli / Shoshana Zuboff',
    cita: 'Las campañas electorales se están convirtiendo en verdaderas guerras de software. Su único objetivo es el engagement, no la verdad.', fuente: 'Giuliano da Empoli' },
  { num: 7, nombre: 'Mamá Chewbacca', categoria: 'Actor', cred: '—', vis: '+2', com: '—',
    concepto: 'La Noticia Viral y Cultura Snack', autores: 'Lila Luchessi / Aníbal Ford / Carlos Scolari',
    cita: 'En apenas cuatro minutos, una ciudadana quebró todos los récords y se convirtió en la más famosa de la red, consumiendo el oxígeno del debate real.', fuente: 'Lila Luchessi' },
  { num: 8, nombre: 'El Conductor Estrella', categoria: 'Actor', cred: '-1', vis: '+2', com: '+2',
    concepto: 'La Falsa Simetría y el Meta-Enunciador', autores: 'Eliseo Verón',
    cita: 'Haciendo simétrica su relación con el destinatario, el conductor moderno abandona la neutralidad para crear confianza y contacto.', fuente: 'Eliseo Verón' },
  { num: 9, nombre: 'Periodista Independiente', categoria: 'Actor', cred: '+2', vis: '0', com: '+1',
    concepto: 'Verticalización Profesional y Curaduría', autores: 'Ramón Salaverría / Michael Bhaskar',
    cita: 'El comunicador asume un protagonismo total en la producción informativa, convirtiéndose él mismo en la marca de legitimidad.', fuente: 'Ramón Salaverría' },
  { num: 10, nombre: 'La Influencer', categoria: 'Actor', cred: '-1', vis: '+1', com: '+2',
    concepto: 'Capitalismo de la Emoción y Cadena Metonímica', autores: 'Byung-Chul Han / Ariel Gurevich',
    cita: 'El capitalismo del consumo introduce las emociones como recursos de productividad. La afectividad reemplaza a la argumentación.', fuente: 'Byung-Chul Han' },
  { num: 11, nombre: 'Sobreinformación Estéril', categoria: 'Condición', cred: '-1', vis: '-1', com: '-1',
    concepto: 'Infoxicación y Parálisis por Exceso', autores: 'Byung-Chul Han / Carlos Scolari',
    cita: 'La hiperinformación impide el saber. Nada se fija, todo se disuelve. Produce parálisis ante el exceso.', fuente: 'Byung-Chul Han' },
  { num: 12, nombre: 'Agenda Setting', categoria: 'Condición', cred: '—', vis: '+2', com: '—',
    concepto: 'Fijación de Agenda y Transferencia de Saliencia', autores: 'Maxwell McCombs / Donald Shaw',
    cita: 'Los medios estructuran el espacio mental de lo discutible: deciden sobre qué vamos a pensar hoy.', fuente: 'McCombs & Shaw' },
  { num: 13, nombre: 'Las 3V del Caos', categoria: 'Evento', cred: '-2', vis: '+2', com: '-1',
    concepto: 'Big Data y Datificación Acelerada', autores: 'Walter Sosa Escudero',
    cita: 'No se trata solo de muchos datos, se trata de cuán rápido, diverso e inestable es todo lo que circula.', fuente: 'Walter Sosa Escudero' },
  { num: 14, nombre: 'Patrulla de Trolls', categoria: 'Evento', cred: '—', vis: '+2', com: '-1',
    concepto: 'Cibertropas, Shitstorm y Polarización', autores: 'Luciano Galup / Byung-Chul Han',
    cita: 'Bombardear y silenciar: rompen el debate democrático llenándolo de ruido y agresiones coordinadas.', fuente: 'Luciano Galup' },
  { num: 15, nombre: 'Censura / Carpetazo', categoria: 'Evento', cred: '—', vis: '+2', com: '—',
    concepto: 'Dictadura de la Transparencia', autores: 'Byung-Chul Han',
    cita: 'La transparencia se exige no para la política, sino para desnudar a los adversarios y convertirlos en objeto de escándalo.', fuente: 'Byung-Chul Han' },
];

// category → brand color coding from the deck (Tipo/Color)
const CAT_COLOR = {
  'Plataforma': { bg: 'var(--navy)',  label: 'PLATAFORMA' },
  'Actor':      { bg: 'var(--green)', label: 'ACTOR' },
  'Condición':  { bg: 'var(--yellow)',label: 'CONDICIÓN', dark: true },
  'Evento':     { bg: 'var(--pink)',  label: 'EVENTO' },
};

const METRIC = {
  cred: { key: 'CRED', soft: 'var(--cred-soft)', col: '#1f5fa3' },
  vis:  { key: 'VIS',  soft: 'var(--vis-soft)',  col: '#8a5d00' },
  com:  { key: 'COM',  soft: 'var(--com-soft)',  col: '#0c6e4f' },
};

function metricVal(raw) {
  if (!raw) return null;
  const m = String(raw).match(/^[+\-]?\d+/);
  if (!m) return null;
  if (m[0] === '0') return null;
  const n = m[0].startsWith('-') || m[0].startsWith('+') ? m[0] : '+' + m[0];
  return n;
}

function CartaDia() {
  // rotates once per day (local) through the deck
  const dayIndex = Math.floor(Date.now() / 86400000) % MAZO.length;
  const card = MAZO[dayIndex];
  const [copied, setCopied] = React.useState(false);

  // fecha de hoy, en español: "31 de mayo de 2026"
  const fechaHoy = new Date().toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });

  const chips = [
    ['cred', metricVal(card.cred)],
    ['vis',  metricVal(card.vis)],
    ['com',  metricVal(card.com)],
  ].filter(([, v]) => v);

  const cat = CAT_COLOR[card.categoria] || CAT_COLOR['Actor'];

  const share = async () => {
    const text = `Carta del día — ${card.nombre}: «${card.cita}» (${card.fuente}). El Rol de los Medios.`;
    try {
      if (navigator.share) { await navigator.share({ title: 'Carta del día — ' + card.nombre, text }); return; }
      await navigator.clipboard.writeText(text);
      setCopied(true); setTimeout(() => setCopied(false), 1800);
    } catch (e) { /* user cancelled */ }
  };

  return (
    <section id="carta-dia" className="bg-sand">
      <div className="container cartadia-grid" style={{ display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: 64, alignItems: 'center' }}>
        {/* LEFT — editorial */}
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
            <span className="eyebrow">Carta del día</span>
            <span style={{ fontWeight: 600, fontSize: 13, letterSpacing: '.04em', color: 'var(--stone-500)', textTransform: 'capitalize' }}>· {fechaHoy}</span>
          </div>
          <h2 className="h1" style={{ maxWidth: '14ch' }}>{card.nombre}</h2>
          <blockquote style={{ marginTop: 30, paddingLeft: 22, borderLeft: '4px solid var(--pink)' }}>
            <p style={{ fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(1.2rem,2.5vw,1.55rem)', lineHeight: 1.45, color: 'var(--stone-700)', textWrap: 'pretty' }}>
              “{card.cita}”
            </p>
          </blockquote>
          <p className="body" style={{ marginTop: 18, fontWeight: 600, color: 'var(--stone-700)' }}>— {card.fuente}</p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
            {chips.map(([k, v]) => {
              const mt = METRIC[k];
              return (
                <span key={k} style={{
                  fontWeight: 800, fontSize: 15, letterSpacing: '.02em',
                  padding: '11px 16px', borderRadius: 'var(--r-pill)',
                  background: mt.soft, color: mt.col
                }}>{v} {mt.key}</span>
              );
            })}
            <button onClick={share} className="btn btn-ghost btn-sm" type="button"
              style={{ marginLeft: 4, gap: 9 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.6" y1="13.5" x2="15.4" y2="17.5"/><line x1="15.4" y1="6.5" x2="8.6" y2="10.5"/>
              </svg>
              {copied ? '¡Copiado!' : 'Compartir'}
            </button>
          </div>
        </div>

        {/* RIGHT — featured card, design-system rounded card (como las cartas del hero) */}
        <div className="cartadia-stage" style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: '100%', maxWidth: 400,
            background: 'var(--paper)', color: 'var(--ink)',
            border: '2px solid var(--ink)', borderRadius: 'var(--r-lg)',
            boxShadow: '8px 8px 0 var(--ink)', padding: '30px 30px 32px'
          }}>
            <div className="eyebrow" style={{ color: 'var(--green)', marginBottom: 20 }}>Carta destacada</div>
            <span style={{
              display: 'inline-block', fontWeight: 800, fontSize: 12.5, letterSpacing: '.1em',
              padding: '7px 16px', borderRadius: 'var(--r-pill)',
              color: cat.dark ? 'var(--ink)' : '#fff', background: cat.bg, border: '2px solid var(--ink)'
            }}>{cat.label}</span>
            <h3 style={{ fontWeight: 900, fontSize: 'clamp(1.6rem,3vw,2rem)', lineHeight: 1.05, letterSpacing: '-.015em', marginTop: 18, color: 'var(--ink)' }}>
              {card.nombre}
            </h3>
            <div style={{ borderTop: '1px solid var(--hairline)', marginTop: 18, paddingTop: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--stone-500)', marginBottom: 6 }}>Concepto</div>
              <p className="body" style={{ fontSize: 15.5, color: 'var(--stone-700)', lineHeight: 1.5 }}>
                {card.concepto}.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 18, flexWrap: 'wrap' }}>
              {chips.map(([k, v]) => {
                const mt = METRIC[k];
                return (
                  <span key={k} style={{
                    fontWeight: 800, fontSize: 13, padding: '6px 13px', borderRadius: 'var(--r-pill)',
                    background: mt.soft, color: mt.col
                  }}>{v} {mt.key}</span>
                );
              })}
            </div>
            <div style={{ marginTop: 24 }}>
              <span style={{
                display: 'inline-block', fontWeight: 800, fontSize: 12.5, letterSpacing: '.06em',
                textTransform: 'uppercase', padding: '8px 16px', borderRadius: 'var(--r-pill)',
                background: 'var(--yellow)', color: 'var(--ink)'
              }}>{card.fuente}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.CartaDia = CartaDia;
