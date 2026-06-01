import { useState, useEffect } from 'react';
import { Icon, eur, smoothTo } from '../lib';

const NAV = [
  { label: 'O nás', id: 'onas' },
  { label: 'Svätci', id: 'svatci' },
  { label: 'Kolekcia', id: 'kolekcia' },
  { label: 'Shop', id: 'shop' },
  { label: 'Kontakt', id: 'kontakt' },
];

const IG_URL = 'https://www.instagram.com/cotyaboh/';

export function Header({ cartCount, cartTotal, onCartOpen, onMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={'fixed top-0 inset-x-0 z-40 transition-all duration-500 ' + (
      scrolled ? 'bg-bone/90 backdrop-blur-md border-b border-line/70 py-3' : 'bg-transparent py-5')}>
      <div className="max-w-shell mx-auto px-5 sm:px-8 flex items-center justify-between gap-4">
        {/* left — mobile menu / desktop nav */}
        <div className="flex-1 flex items-center">
          <button onClick={onMenuOpen} className="md:hidden -ml-1 p-1 text-ink" aria-label="Menu">
            <Icon name="menu" size={24} />
          </button>
          <nav className="hidden md:flex items-center gap-8 label text-[11px] text-ink">
            {NAV.slice(0, 2).map((n) =>
              <button key={n.id} onClick={() => smoothTo(n.id)} className="nav-link">{n.label}</button>
            )}
          </nav>
        </div>

        {/* center — logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex flex-col items-center gap-1 group shrink-0">
          <span className="font-display text-[19px] sm:text-[22px] leading-none text-ink tracking-tight">
            Čo ty a Boh?
          </span>
        </button>

        {/* right — nav + cart */}
        <div className="flex-1 flex items-center justify-end gap-6">
          <nav className="hidden md:flex items-center gap-8 label text-[11px] text-ink">
            {NAV.slice(2).map((n) =>
              <button key={n.id} onClick={() => smoothTo(n.id)} className="nav-link">{n.label}</button>
            )}
            <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="nav-link inline-flex items-center gap-1.5">
              <Icon name="instagram" size={15} />
            </a>
          </nav>
          <button onClick={onCartOpen} className="flex items-center gap-2 text-ink group" aria-label="Košík">
            <span className="hidden sm:inline label text-[11px] tabular-nums">{eur(cartTotal)}</span>
            <span className="relative">
              <Icon name="bag" size={22} className="transition-transform duration-300 group-hover:scale-110" />
              {cartCount > 0 &&
                <span className="absolute -top-2 -right-2 min-w-[17px] h-[17px] px-1 rounded-full bg-ink text-bone text-[10px] font-sans font-semibold flex items-center justify-center tabular-nums">
                  {cartCount}
                </span>
              }
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
