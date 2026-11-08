// Hero — sand bg, display headline, single CTA anchoring to S9
function Hero() {
  return (
    <section id="top" className="bg-sand" style={{ paddingTop: 48, paddingBottom: 72, position: 'relative', overflow: 'hidden' }}>
      <div className="container hero-grid" style={{
        display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: 48, alignItems: 'center', minHeight: 560
      }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>Juego de cartas</div>
          <h1 className="display">¿Qué papel<br/>juegan los<br/>medios?</h1>
          <p className="lead" style={{ marginTop: 24, maxWidth: '38ch' }}>
            Un juego de cartas pedagógico que convierte los procesos del ecosistema mediático
            en decisiones concretas.
          </p>
          <div style={{ marginTop: 36 }}>
            <a href="#conseguir" className="btn btn-accent" style={{ textDecoration: 'none' }}>Quiero el juego</a>
          </div>
        </div>
        <div className="hero-cards" aria-hidden="true" style={{ position: 'relative', height: 360 }}>
          <HeroCard color="var(--paper)" rot={-8} x={0} y={30} z={1}
            kicker="Actor" metric="VIS" metricCol="var(--vis)"
            name="La Activista Transmedia"
            mechanic="Multiplicá tu alcance en dos plataformas simultáneas." />
          <HeroCard color="var(--cred-soft)" rot={5} x={130} y={-10} z={2}
            kicker="Plataforma" metric="CRED" metricCol="var(--cred)"
            name="El Algoritmo"
            mechanic="Silenciá una carta de Actor durante 2 turnos." />
          <HeroCard color="var(--green)" dark rot={-3} x={255} y={70} z={3}
            kicker="Condición" metric="COM" metricCol="var(--com)"
            name="El Ingeniero del Caos"
            mechanic="Repartí −2 CRED a todos los actores en juego." />
        </div>
      </div>
    </section>
  );
}

function HeroCard({ color, dark, rot, x, y, z, kicker, metric, metricCol, name, mechanic }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y, zIndex: z,
      width: 192, height: 264,
      background: color, color: dark ? 'var(--paper)' : 'var(--ink)',
      border: '2px solid var(--ink)', borderRadius: 16, padding: '18px 16px',
      boxShadow: '5px 5px 0 var(--ink)', transform: `rotate(${rot}deg)`,
      display: 'flex', flexDirection: 'column', gap: 0
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 700, fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase',
          color: dark ? 'rgba(255,250,239,.6)' : 'var(--stone-500)' }}>{kicker}</span>
        <span style={{ fontWeight: 800, fontSize: 11, color: metricCol, background: dark ? 'rgba(0,0,0,.2)' : 'rgba(255,255,255,.6)',
          padding: '2px 7px', borderRadius: 999 }}>{metric}</span>
      </div>
      <div style={{ fontWeight: 900, fontSize: 18, lineHeight: 1.1, letterSpacing: '-.01em', marginTop: 14 }}>{name}</div>
      <div style={{ fontSize: 12.5, lineHeight: 1.5, marginTop: 'auto',
        color: dark ? '#c5d9cb' : 'var(--stone-700)', paddingTop: 12, borderTop: `1px solid ${dark ? 'rgba(255,255,255,.15)' : 'var(--hairline)'}` }}>
        {mechanic}
      </div>
    </div>
  );
}
window.Hero = Hero;
