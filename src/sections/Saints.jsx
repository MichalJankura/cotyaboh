import { useEffect, useRef, useState } from 'react';

const GOLD = '#C9A96E';
const BONE = '#F2EBDD';
const DARK = '#0E0C0A';

function useReveal(options = {}) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); io.unobserve(el); } },
      { threshold: options.threshold ?? 0.08, rootMargin: options.margin ?? '0px 0px -4% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, vis];
}

function SlideIn({ from = 'left', className = '', style = {}, children }) {
  const [ref, vis] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transition: 'opacity 1.4s cubic-bezier(.16,1,.3,1), transform 1.6s cubic-bezier(.16,1,.3,1)',
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateX(0)' : `translateX(${from === 'left' ? '-110px' : '110px'})`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}

function FadeUp({ delay = 0, className = '', style = {}, children }) {
  const [ref, vis] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transition: `opacity 1.1s cubic-bezier(.16,1,.3,1) ${delay}ms, transform 1.2s cubic-bezier(.16,1,.3,1) ${delay}ms`,
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(28px)',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}

const SAINTS = [
  {
    id: 'michal',
    name: 'Svätý Michal',
    subtitle: 'Archanjel',
    image: '/michal_1.png',
    imageFrom: 'left',
    tag: 'Knieža nebeských vojsk',
    verse: 'Kto je ako Boh?',
    verseRef: 'Zj 12, 7',
    bio: 'Veliteľ nebeských vojsk. Porazil Lucifera. Ochranca Cirkvi, duší v hodine smrti a všetkých, čo volajú jeho meno.',
    merchQuote: 'Kto nosí merch ako Boh?',
    quoteAttr: 'Svätý Michal Archanjel, pravdepodobne',
  },
  {
    id: 'johanka',
    name: 'Svätá Johanka',
    subtitle: 'z Arku',
    image: '/johanka.png',
    imageFrom: 'right',
    tag: 'Panna Orleánska',
    verse: 'Neboj sa, lebo ja som s tebou; nehľaď ustrašene, lebo ja som tvoj Boh.',
    verseRef: 'Iz 41, 10',
    bio: 'Sedemnásťročné dievča z dedinky Domrémy. Hlasy, brnenie, bitky. Oslobodila Orléans, zmenila históriu Francúzska — a skončila na hranici, lebo si zvolila poslúchnuť Boha skôr než biskupov.',
    merchQuote: 'Mne hovorili hlasy z neba. Tebe nech hovorí nápis na chrbte.',
    quoteAttr: 'Svätá Johanka z Arku, pravdepodobne',
  },

];

function DecorativePlaceholder({ initial }) {
  return (
    <div className="w-full h-full flex items-center justify-center relative select-none">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 500"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <circle cx="200" cy="250" r="165" stroke={GOLD} strokeWidth="0.6" strokeDasharray="4 8" opacity="0.22" />
        <circle cx="200" cy="250" r="138" stroke={GOLD} strokeWidth="0.4" opacity="0.12" />
        <line x1="200" y1="78" x2="200" y2="126" stroke={GOLD} strokeWidth="0.6" opacity="0.28" />
        <line x1="200" y1="374" x2="200" y2="422" stroke={GOLD} strokeWidth="0.6" opacity="0.28" />
        <line x1="28" y1="250" x2="76" y2="250" stroke={GOLD} strokeWidth="0.6" opacity="0.28" />
        <line x1="324" y1="250" x2="372" y2="250" stroke={GOLD} strokeWidth="0.6" opacity="0.28" />
        <circle cx="200" cy="78" r="3.5" fill={GOLD} opacity="0.35" />
        <circle cx="200" cy="422" r="3.5" fill={GOLD} opacity="0.35" />
        <circle cx="28" cy="250" r="3.5" fill={GOLD} opacity="0.35" />
        <circle cx="372" cy="250" r="3.5" fill={GOLD} opacity="0.35" />
        <ellipse cx="200" cy="85" rx="22" ry="10" stroke={GOLD} strokeWidth="0.6" opacity="0.18" />
      </svg>
      <span
        className="font-display ital relative z-10"
        style={{
          fontSize: 'clamp(8rem, 18vw, 12rem)',
          lineHeight: 1,
          color: GOLD,
          opacity: 0.4,
          textShadow: `0 0 80px rgba(201,169,110,0.2)`,
          letterSpacing: '-0.02em',
        }}
      >
        {initial}
      </span>
    </div>
  );
}

function SaintTextContent({ saint, isLeft }) {
  return (
    <div className="w-full" style={{ maxWidth: '520px' }}>
      {/* Tag */}
      <p
        className="label"
        style={{ fontSize: '10px', letterSpacing: '0.35em', color: GOLD, marginBottom: '18px' }}
      >
        {saint.tag}
      </p>

      {/* Name */}
      <h3
        className="font-display"
        style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.5rem)', lineHeight: 1.04, color: BONE, marginBottom: '4px' }}
      >
        {saint.name}
      </h3>
      <p
        className="font-display ital"
        style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)', color: `${GOLD}AA`, marginBottom: '28px' }}
      >
        {saint.subtitle}
      </p>

      {/* Bio */}
      <p
        className="font-sans"
        style={{ fontSize: '14.5px', lineHeight: 1.75, color: 'rgba(242,235,221,0.42)', marginBottom: '30px', maxWidth: '40ch' }}
      >
        {saint.bio}
      </p>

      {/* Bible verse */}
      <div style={{ borderLeft: `2px solid ${GOLD}55`, paddingLeft: '20px', marginBottom: '32px' }}>
        <p
          className="font-display ital"
          style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', lineHeight: 1.5, color: BONE }}
        >
          „{saint.verse}"
        </p>
        <p
          className="label"
          style={{ fontSize: '10px', letterSpacing: '0.28em', color: `${GOLD}88`, marginTop: '8px' }}
        >
          {saint.verseRef}
        </p>
      </div>

      {/* Merch quote box */}
      <div
        style={{
          position: 'relative',
          padding: '22px 24px 22px 28px',
          background: 'rgba(201,169,110,0.05)',
          border: '1px solid rgba(201,169,110,0.14)',
        }}
      >
        <span
          className="font-display"
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-22px',
            left: '18px',
            fontSize: '5rem',
            lineHeight: 1,
            color: `${GOLD}33`,
            userSelect: 'none',
          }}
        >
          "
        </span>
        <p
          className="font-display ital"
          style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)', lineHeight: 1.65, color: 'rgba(242,235,221,0.82)', position: 'relative', zIndex: 1 }}
        >
          {saint.merchQuote}
        </p>
        <p
          className="label"
          style={{ fontSize: '9px', letterSpacing: '0.22em', color: `${GOLD}66`, marginTop: '12px' }}
        >
          — {saint.quoteAttr}
        </p>
      </div>
    </div>
  );
}

function SaintRow({ saint }) {
  const isLeft = saint.imageFrom === 'left';

  return (
    <div style={{ borderTop: '1px solid rgba(201,169,110,0.1)' }}>
      <div className="flex flex-col lg:flex-row items-stretch">

        {/* ── Image column ── */}
        <SlideIn
          from={isLeft ? 'left' : 'right'}
          className={`relative w-full lg:w-[42%] flex items-end justify-center overflow-hidden ${isLeft ? 'lg:order-1' : 'lg:order-2'}`}
          style={{ minHeight: 'clamp(340px, 48vh, 560px)' }}
        >
          {/* Edge vignette */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none z-[2]"
            style={{
              background: isLeft
                ? `linear-gradient(to right, ${DARK} 0%, transparent 18%), linear-gradient(to top, ${DARK} 0%, transparent 25%)`
                : `linear-gradient(to left, ${DARK} 0%, transparent 18%), linear-gradient(to top, ${DARK} 0%, transparent 25%)`,
            }}
          />
          <div className="relative z-[1] w-full max-w-[380px] mx-auto h-[340px] sm:h-[440px] lg:h-full px-6 pt-8">
            {saint.image ? (
              <img
                src={saint.image}
                alt={`${saint.name} ${saint.subtitle}`}
                className="w-full h-full object-contain object-bottom select-none pointer-events-none"
                style={{
                  filter: 'drop-shadow(0 0 48px rgba(201,169,110,0.12)) drop-shadow(0 20px 40px rgba(0,0,0,0.6))',
                }}
              />
            ) : (
              <DecorativePlaceholder initial={saint.initial} />
            )}
          </div>
        </SlideIn>

        {/* ── Text column ── */}
        <FadeUp
          delay={220}
          className={`relative w-full lg:flex-1 flex items-center px-7 sm:px-12 lg:px-16 xl:px-20 py-12 lg:py-16 ${isLeft ? 'lg:order-2' : 'lg:order-1'}`}
        >
          {/* Vertical separator (desktop only) */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 hidden lg:block"
            style={{
              [isLeft ? 'left' : 'right']: 0,
              width: '1px',
              background: 'linear-gradient(to bottom, transparent, rgba(201,169,110,0.18) 20%, rgba(201,169,110,0.18) 80%, transparent)',
            }}
          />
          <SaintTextContent saint={saint} isLeft={isLeft} />
        </FadeUp>

      </div>
    </div>
  );
}

export function Saints() {
  const [ref, vis] = useReveal({ threshold: 0.1 });

  return (
    <section id="svatci" style={{ background: DARK }}>
      {/* Top gradient bridge from bone */}
      <div
        aria-hidden="true"
        style={{ height: '72px', background: `linear-gradient(to bottom, #F2EBDD, ${DARK})`, marginTop: '-1px' }}
      />

      {/* Section header */}
      <div className="px-5 sm:px-8" style={{ padding: 'clamp(44px, 7vw, 88px) clamp(20px, 5vw, 40px) clamp(32px, 4vw, 60px)', textAlign: 'center' }}>
        <div
          ref={ref}
          style={{
            transition: 'opacity 1.1s cubic-bezier(.16,1,.3,1), transform 1.2s cubic-bezier(.16,1,.3,1)',
            opacity: vis ? 1 : 0,
            transform: vis ? 'translateY(0)' : 'translateY(24px)',
            willChange: 'opacity, transform',
          }}
        >
          <p className="label" style={{ fontSize: '11px', letterSpacing: '0.38em', color: GOLD, marginBottom: '20px' }}>
            Nebeský poradný zbor
          </p>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(3rem, 6.5vw, 5.8rem)', lineHeight: 1.0, color: BONE }}
          >
            Čo by povedali{' '}
            <em className="ital" style={{ color: GOLD, fontStyle: 'italic' }}>oni?</em>
          </h2>
          <p
            className="font-sans"
            style={{
              fontSize: 'clamp(15px, 1.6vw, 17px)',
              lineHeight: 1.75,
              color: 'rgba(242,235,221,0.38)',
              maxWidth: '48ch',
              margin: '20px auto 0',
            }}
          >
            Svätci netweetovali. Ale keby mohli — možno by to vyzeralo nejako takto.
          </p>
          <div
            aria-hidden="true"
            style={{ width: '44px', height: '1px', background: `${GOLD}66`, margin: '32px auto 0' }}
          />
        </div>
      </div>

      {/* Saints rows */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', borderTop: '1px solid rgba(201,169,110,0.1)' }}>
        {SAINTS.map((saint) => (
          <SaintRow key={saint.id} saint={saint} />
        ))}
      </div>

      {/* Bottom gradient bridge to bone */}
      <div
        aria-hidden="true"
        style={{ height: '72px', background: `linear-gradient(to bottom, ${DARK}, #F2EBDD)` }}
      />
    </section>
  );
}
