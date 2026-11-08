// FAQ — Preguntas Frecuentes optimizado para SEO
// Acordeón custom con CSS Grid trick para animación suave de altura

function FAQItem({ item, idx, open, onToggle }) {
  const isOpen = open === idx;

  return (
    <div
      style={{
        border: '1.5px solid var(--hairline)',
        borderRadius: 'var(--r-md)',
        overflow: 'hidden',
        background: isOpen ? 'var(--paper)' : 'transparent',
        transition: 'background .25s var(--ease), border-color .25s var(--ease)',
        borderColor: isOpen ? 'var(--green)' : 'var(--hairline)',
      }}
    >
      {/* Trigger */}
      <button
        onClick={() => onToggle(idx)}
        aria-expanded={isOpen}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 24px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: 16,
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          fontSize: 16,
          lineHeight: 1.4,
          color: 'var(--ink)',
          transition: 'color .2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = 'var(--green)'; }}
        onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink)'; }}
      >
        <span>{item.q}</span>
        {/* Chevron — rota 180° cuando está abierto */}
        <svg
          width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{
            flexShrink: 0,
            transition: 'transform .35s cubic-bezier(.4,0,.2,1)',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            color: isOpen ? 'var(--green)' : 'currentColor',
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Contenido — CSS Grid trick: 0fr → 1fr anima la altura suavemente */}
      <div
        style={{
          display: 'grid',
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          transition: 'grid-template-rows .35s cubic-bezier(.4,0,.2,1)',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div
            style={{
              padding: '0 24px 24px',
              borderTop: '1px solid var(--hairline)',
              fontSize: 15.5,
              lineHeight: 1.75,
              color: 'var(--stone-600)',
              whiteSpace: 'pre-line',
              paddingTop: 18,
            }}
          >
            {item.a}
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = React.useState(-1);

  const handleToggle = (idx) => {
    setOpen(prev => prev === idx ? -1 : idx);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'faq_toggle', faq_index: idx });
  };

  const faqs = [
    {
      q: '¿Por qué "El Rol de los Medios"?',
      a: 'El nombre tiene un doble significado que resume la propuesta del juego. Por un lado, hace referencia al papel que cumplen los medios de comunicación en la construcción de la realidad social y producción de sentido. Los medios no solo transmiten información: seleccionan qué temas se vuelven visibles, qué voces ganan legitimidad y qué narrativas terminan formando parte del sentido común. En otras palabras, influyen en aquello que una sociedad considera importante, creíble o verdadero.\n\nPor otro lado, el nombre funciona como un guiño a los juegos de rol. Durante la partida, cada jugador asume el lugar de actores que participan de la circulación de la información y debe tomar decisiones similares a las que enfrentan los medios reales: ¿priorizar la credibilidad o el alcance? ¿Construir comunidad o maximizar la visibilidad? ¿Informar, persuadir o competir por la atención?\n\nDe esta manera, El Rol de los Medios no solo habla sobre los medios: invita a experimentar su lógica desde adentro. A través del juego, se invita a descubrir cómo construyen las narrativas públicas y cómo las tensiones entre credibilidad, visibilidad y comunidad influyen en la formación de la opinión colectiva.'
    },
    {
      q: '¿Cuántas personas pueden jugar?',
      a: 'El juego está diseñado para 2 jugadores, pero se puede adaptar para equipos de hasta 4 personas (2 vs 2).'
    },
    {
      q: '¿Cuánto dura una partida?',
      a: 'Una partida dura unos 20 minutos. Ideal para usar en clase sin ocupar toda la hora.'
    },
    {
      q: '¿Cómo se gana una partida?',
      a: 'El objetivo principal es lograr que tu medio alcance los 15 puntos en cualquiera de las tres métricas clave: Credibilidad, Visibilidad o Comunidad. Pero cuidado: también podés ganar si lográs, entre tantas otras jugadas, que la métrica de tu rival caiga a 0 por una crisis de reputación.'
    },
    {
      q: '¿Necesito conocer la teoría antes de jugar?',
      a: 'No. El juego introduce los conceptos de forma progresiva. Después de jugar, los conceptos teóricos cobran mucho más sentido.'
    },
    {
      q: '¿Tengo que sumar y restar puntos mentalmente todo el tiempo?',
      a: 'No. Entendemos que el ecosistema mediático ya es bastante ruidoso, por lo que el juego físico viene acompañado de una WebApp (un contador digital) que hace toda la matemática por vos. Así, podés concentrarte en la estrategia y el debate.'
    },
    {
      q: '¿El juego refleja fenómenos actuales de internet?',
      a: 'Absolutamente. El mazo de 30 cartas recrea el ecosistema mediático contemporáneo. Vas a poder jugar y defenderte de conceptos como "Patrulla de Trolls", "Canal de Streaming", "Infoxicación" y la influencia de los algoritmos.'
    },
    {
      q: '¿Viene con material para docentes?',
      a: 'Sí. Incluye un manual docente con marco teórico, glosario de mecánicas y preguntas disparadoras para el debate posterior.'
    },
    {
      q: '¿Se puede usar en secundaria?',
      a: 'Está diseñado para nivel universitario, pero se ha usado con éxito en los últimos años de secundaria, especialmente en materias de comunicación o ciudadanía.'
    },
    {
      q: '¿Cómo consigo el juego?',
      a: 'Podés pre-registrarte dejando tu email más abajo. Te avisaremos cuando esté disponible y recibirás un cupón de descuento.'
    },
    {
      q: '¿Es digital o físico?',
      a: 'El juego es físico (cartas impresas). Además incluye acceso al contador de puntos web para usar durante las partidas.'
    },
    {
      q: '¿Quién está detrás del proyecto?',
      a: 'El Rol de los Medios es un Trabajo Integrador Final de la Licenciatura en Ciencias de la Comunicación, UBA, 2026. Cátedra Burgos. Producido por Cecilia Vitelli.'
    },
    {
      q: '¿Se necesita conocer juegos de cartas tipo Magic o Pokémon para jugar?',
      a: 'No. A diferencia de los juegos de cartas coleccionables complejos, aquí jugás solo una carta por turno. Las decisiones pasan por tu estrategia editorial y tu capacidad para leer el "clima" de la mesa, no por recordar combos rebuscados.'
    },
    {
      q: '¿Si no leí a los autores teóricos voy a entender qué estoy jugando?',
      a: 'Totalmente. Dinámicas como la "patrulla de trolls", la "infoxicación" o la "viralidad efímera" son intuitivas porque las experimentamos a diario en las plataformas digitales. El marco teórico sostiene el diseño del motor lúdico, pero la jugabilidad es un reflejo de la vida cotidiana en internet y en medios de comunicación.'
    },
    {
      q: '¿Cómo sé si una carta me afecta a mí o a mi oponente?',
      a: 'El juego utiliza una gramática visual muy intuitiva en cada carta. Con solo leer una palabra clave sabés qué hacer: AUTO (el efecto te beneficia o perjudica a vos), ATAQUE (elegís a qué rival impactar) o GLOBAL (cambia el clima de la mesa para todos los jugadores).'
    },
    {
      q: '¿Tengo que juntar "maná" o fichas de recursos para poder jugar mis cartas?',
      a: 'No. El sistema de juego es directo y sin fricciones: en tu turno simplemente robás una carta y jugás una carta. Esto mantiene el ritmo ágil de 20 minutos y evita que la partida se estanque o se vuelva pesada.'
    }
  ];

  // El JSON-LD FAQPage y la versión estática de estas preguntas los genera
  // scripts/build.mjs a partir de esta misma lista (así buscadores e IA los leen
  // sin ejecutar JavaScript). Para cambiar una pregunta, editala solo acá.

  return (
    <>

      <section id="faq" className="bg-paper">
        <div className="container" style={{ maxWidth: 720 }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="eyebrow">Preguntas Frecuentes</div>
            <h2 className="display" style={{ marginTop: 14, fontSize: 'clamp(2rem, 6vw, 3.8rem)' }}>
              Todas tus dudas resueltas.
            </h2>
          </div>

          <div className="faq-accordion" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {faqs.map((item, idx) => (
              <FAQItem key={idx} item={item} idx={idx} open={open} onToggle={handleToggle} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

window.FAQ = FAQ;
