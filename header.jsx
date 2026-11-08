// Header — sticky slim bar with horizontal wordmark + nav + CTA
function Header({ onCTA }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const el = document.querySelector('.kit-scroll') || window;
    const t = el === window ? window : el;
    const fn = () => setScrolled((el === window ? window.scrollY : el.scrollTop) > 12);
    t.addEventListener('scroll', fn); fn();
    return () => t.removeEventListener('scroll', fn);
  }, []);
  const links = [['Qué es', '#que-es'], ['Carta del día', '#carta-dia'], ['Comunidad', '#comunidad'], ['Blog', '/blog/']];
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'rgba(234,223,203,.88)' : 'transparent',
      backdropFilter: scrolled ? 'saturate(140%) blur(8px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--hairline)' : '1px solid transparent',
      transition: 'all .2s var(--ease)'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 90 }}>
        <a href="#top" aria-label="El Rol de los Medios">
          <img src="assets/logo-horizontal.svg" alt="El Rol de los Medios" style={{ width: 80, height: 80 }} />
        </a>
        <nav className="hdr-nav" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {links.map(([t, h]) => (
            <a key={t} href={h} style={{ fontWeight: 600, fontSize: 15 }} className="hdr-link">{t}</a>
          ))}
          <button className="btn btn-accent btn-sm" onClick={onCTA}>Conseguir el juego</button>
        </nav>
      </div>
    </header>
  );
}
window.Header = Header;
