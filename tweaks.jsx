// Tweaks.jsx — expressive design controls for El Rol de los Medios
// Three controls that reshape the feel of the whole page, not individual pixels.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "registro": "Periódico",
  "paleta": ["#004929", "#eadfcb", "#e76488"],
  "tarjetas": "Suave"
}/*EDITMODE-END*/;

function applyLandingTweaks(t) {
  const root = document.documentElement;

  // ── 1. PALETA ────────────────────────────────────────────────────────────
  // Three brand tokens cascade through every inline var() reference on the page.
  const [primary, warm, accent] = Array.isArray(t.paleta)
    ? t.paleta : ['#004929', '#eadfcb', '#e76488'];

  root.style.setProperty('--green', primary);
  root.style.setProperty('--sand',  warm);
  root.style.setProperty('--pink',  accent);
  // bg-sand sections use --sand; eyebrow + buttons use --pink; accents use --green.
  // --ink, --paper, --yellow stay untouched so dark sections remain readable.

  // ── 2. REGISTRO tipográfico ──────────────────────────────────────────────
  // A body class drives the CSS override block below.
  document.body.classList.remove('t-periodico', 't-revista', 't-manifiesto');
  document.body.classList.add(
    { 'Periódico': 't-periodico', 'Revista': 't-revista', 'Manifiesto': 't-manifiesto' }
    [t.registro] || 't-periodico'
  );

  // ── 3. TARJETAS ──────────────────────────────────────────────────────────
  const round = t.tarjetas === 'Suave';
  // Override the radius tokens — all components that use var(--r-lg), var(--r-md) respond.
  root.style.setProperty('--r-lg', round ? '20px' : '0px');
  root.style.setProperty('--r-md', round ? '12px' : '0px');
  root.style.setProperty('--r-sm', round ? '6px'  : '0px');

  // Inject style for elements that hardcode radii in inline React styles
  let st = document.getElementById('__tweak-cards');
  if (!st) { st = document.createElement('style'); st.id = '__tweak-cards'; document.head.appendChild(st); }
  if (round) {
    st.textContent = `
      /* Suave — soft edges everywhere */
      .input, .select, .textarea { border-radius: 10px !important; }
      .faq-accordion details         { border-radius: 14px !important; }
    `;
  } else {
    st.textContent = `
      /* Cortado — sharp, editorial */
      .btn          { border-radius: 0 !important; }
      .input, .select, .textarea { border-radius: 0 !important; }
      .faq-accordion details     { border-radius: 0 !important; }
      .chip         { border-radius: 0 !important; }
    `;
  }
}

function LandingTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply on every change + on first mount
  React.useEffect(() => { applyLandingTweaks(t); }, [t.registro, t.tarjetas, JSON.stringify(t.paleta)]);

  return (
    <TweaksPanel>
      <TweakSection label="Registro tipográfico" />
      <TweakRadio
        label="Estilo"
        value={t.registro}
        options={['Periódico', 'Revista', 'Manifiesto']}
        onChange={v => setTweak('registro', v)}
      />

      <TweakSection label="Paleta de color" />
      <TweakColor
        label="Tema"
        value={t.paleta}
        options={[
          ['#004929', '#eadfcb', '#e76488'],   /* Verde editorial (default) */
          ['#2a1200', '#f0e6d4', '#e05a1c'],   /* Tinta caliente             */
          ['#0a2a4a', '#deeaf5', '#1a9a7a'],   /* Noche azul                 */
        ]}
        onChange={v => setTweak('paleta', v)}
      />

      <TweakSection label="Forma" />
      <TweakRadio
        label="Tarjetas"
        value={t.tarjetas}
        options={['Cortado', 'Suave']}
        onChange={v => setTweak('tarjetas', v)}
      />
    </TweaksPanel>
  );
}

window.LandingTweaks = LandingTweaks;
