import { useState, useEffect, useRef } from 'react';

/* ----------------------------- Icons (Lucide-derived, MIT) ----------------------------- */
const ICON_PATHS = {
  bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  instagram: '<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>',
  arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  arrowUpRight: '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
  arrowDown: '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  minus: '<path d="M5 12h14"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  menu: '<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  scissors: '<circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/>',
};

export function Icon({ name, size = 22, stroke = 1.6, className = '', style }) {
  return (
    <svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24"
         fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round"
         strokeLinejoin="round" aria-hidden="true"
         dangerouslySetInnerHTML={{ __html: Object.hasOwn(ICON_PATHS, name) ? ICON_PATHS[name] : '' }} />
  );
}

/* ----------------------------- Brand mark (minimal crown) ----------------------------- */
export function CrownMark({ size = 26, className = '', style }) {
  return (
    <svg width={size} height={size * 0.72} viewBox="0 0 50 36" fill="none"
         className={className} style={style} aria-hidden="true">
      <path d="M3 31 L7 9 L17.5 21 L25 5 L32.5 21 L43 9 L47 31 Z"
            stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />
      <line x1="3" y1="31" x2="47" y2="31" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="7" cy="9" r="2.1" fill="currentColor" />
      <circle cx="25" cy="5" r="2.4" fill="currentColor" />
      <circle cx="43" cy="9" r="2.1" fill="currentColor" />
    </svg>
  );
}

/* ----------------------------- Scroll reveal ----------------------------- */
export function Reveal({ children, as = 'div', delay = 0, y = 30, once = true, className = '', style = {}, ...rest }) {
  const Tag = as;
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const inView = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight || 0;
      return r.top < vh * 0.95 && r.bottom > 0;
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { setVis(true); if (once) io.unobserve(el); }
        else if (!once) setVis(false);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    io.observe(el);
    const t = setTimeout(() => { if (inView()) setVis(true); }, 500);
    return () => { io.disconnect(); clearTimeout(t); };
  }, [once]);
  const merged = {
    ...style,
    transition: 'opacity 1s cubic-bezier(.16,1,.3,1), transform 1.15s cubic-bezier(.16,1,.3,1)',
    transitionDelay: `${delay}ms`,
    opacity: vis ? 1 : 0,
    transform: vis ? 'translateY(0)' : `translateY(${y}px)`,
    willChange: 'opacity, transform',
  };
  return <Tag ref={ref} className={className} style={merged} {...rest}>{children}</Tag>;
}

/* Reveal lines with a staggered fade-up (used for the hero headline) */
export function RevealLines({ lines = [], className = '', lineClassName = '', baseDelay = 0, step = 120 }) {
  return (
    <span className={className} style={{ display: 'block' }}>
      {lines.map((ln, i) => (
        <Reveal key={i} as="span" delay={baseDelay + i * step} y={44}
                style={{ display: 'block', whiteSpace: 'nowrap' }} className={lineClassName}>
          {ln}
        </Reveal>
      ))}
    </span>
  );
}

/* ----------------------------- Parallax (transform only) ----------------------------- */
export function useParallax(speed = 0.12) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = null;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const center = rect.top + rect.height / 2;
      const offset = (center - vh / 2) * -speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
      raf = null;
    };
    const onScroll = () => { if (raf == null) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);
  return ref;
}

/* ----------------------------- Helpers ----------------------------- */
export const eur = (n) => n.toFixed(2).replace('.', ',') + '\u00A0€';

export function smoothTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 76;
  window.scrollTo({ top, behavior: 'matchMedia' in window && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  window.history.pushState(null, '', `#${id}`);
}

export const MAX_QTY = 99;

export const makeKey = (id, color = '', size = '') => `${id}:${color}:${size}`;
export const parseKey = (key) => {
  const [id, color = '', size = ''] = key.split(':');
  return { id, color, size };
};
