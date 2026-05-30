import { useState, useEffect } from 'react';
import { Icon, Reveal, eur, smoothTo } from './lib';

const NAV = [
  { label: 'O nás', id: 'onas' },
  { label: 'Kolekcia', id: 'kolekcia' },
  { label: 'Shop', id: 'shop' },
  { label: 'Kontakt', id: 'kontakt' }
];

const IG_URL = 'https://www.instagram.com/cotyaboh/';

/* ----------------------------- Header ----------------------------- */
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
            <button onClick={() => smoothTo('shop')} className="nav-link">Shop</button>
            <button onClick={() => smoothTo('kontakt')} className="nav-link">Kontakt</button>
            <a href={IG_URL} target="_blank" rel="noopener" className="nav-link inline-flex items-center gap-1.5">
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

/* ----------------------------- Mobile menu ----------------------------- */
export function MobileMenu({ open, onClose }) {
  return (
    <div className={'fixed inset-0 z-50 md:hidden transition-all duration-500 ' + (
      open ? 'visible' : 'invisible')}>
      <div onClick={onClose}
        className={'absolute inset-0 bg-ink/30 transition-opacity duration-500 ' + (open ? 'opacity-100' : 'opacity-0')} />
      <div className={'absolute inset-y-0 left-0 w-[82%] max-w-sm bg-paper shadow-2xl flex flex-col transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] ' + (
        open ? 'translate-x-0' : '-translate-x-full')}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-line">
          <div className="flex items-center gap-2 text-ink">
            <span className="font-display text-lg">Čo ty a Boh?</span>
          </div>
          <button onClick={onClose} className="p-1 text-ink" aria-label="Zavrieť"><Icon name="x" size={22} /></button>
        </div>
        <nav className="flex flex-col px-6 py-8 gap-1">
          {NAV.map((n, i) =>
            <button key={n.id} onClick={() => { onClose(); setTimeout(() => smoothTo(n.id), 320); }}
              className="font-display text-3xl text-ink py-3 text-left border-b border-line/60">
              {n.label}
            </button>
          )}
        </nav>
        <div className="mt-auto px-6 py-7 border-t border-line">
          <a href={IG_URL} target="_blank" rel="noopener"
            className="inline-flex items-center gap-2 label text-[11px] text-ink-soft">
            <Icon name="instagram" size={16} /> @cotyaboh
          </a>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- Cart drawer ----------------------------- */
export function CartDrawer({ open, onClose, items, products, onQty }) {
  const lines = Object.keys(items).map((id) => ({ ...products.find((p) => p.id === id), qty: items[id] })).filter((l) => l.qty > 0);
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const freeFrom = 50;
  const pct = Math.min(100, subtotal / freeFrom * 100);

  return (
    <div className={'fixed inset-0 z-50 transition-all duration-500 ' + (open ? 'visible' : 'invisible')}>
      <div onClick={onClose}
        className={'absolute inset-0 bg-ink/40 transition-opacity duration-500 ' + (open ? 'opacity-100' : 'opacity-0')} />
      <aside className={'absolute inset-y-0 right-0 w-full max-w-[440px] bg-paper flex flex-col shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] ' + (
        open ? 'translate-x-0' : 'translate-x-full')}>
        <div className="flex items-center justify-between px-7 py-6 border-b border-line">
          <h2 className="font-display text-2xl text-ink">Košík <span className="text-ink-soft text-lg">({lines.reduce((s, l) => s + l.qty, 0)})</span></h2>
          <button onClick={onClose} className="p-1 text-ink hover:rotate-90 transition-transform duration-300" aria-label="Zavrieť"><Icon name="x" size={22} /></button>
        </div>

        {lines.length === 0 ?
          <div className="flex-1 flex flex-col items-center justify-center text-center px-10 gap-4">
            <Icon name="bag" size={40} className="text-clay" stroke={1.2} />
            <p className="font-display text-2xl text-ink">Váš košík je zatiaľ prázdny</p>
            <p className="text-sm text-ink-soft leading-relaxed">Každý kúsok je tvorený s úmyslom. Nájdite ten svoj.</p>
            <button onClick={onClose} className="mt-2 label text-[11px] text-ink cta-line">Pokračovať v nákupe</button>
          </div> :

          <>
            <div className="flex-1 overflow-y-auto px-7 py-6 flex flex-col gap-6">
              {lines.map((l) =>
                <div key={l.id} className="flex gap-4">
                  <div className="w-20 h-24 bg-sand rounded-sm overflow-hidden shrink-0">
                    <image-slot id={'cart-' + l.id} style={{ width: '100%', height: '100%' }} shape="rect" placeholder=""></image-slot>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between gap-3">
                      <div>
                        <p className="font-display text-xl text-ink leading-tight">{l.name}</p>
                        <p className="text-xs text-ink-soft mt-0.5">{l.tag}</p>
                      </div>
                      <p className="font-sans text-sm text-ink tabular-nums whitespace-nowrap">{eur(l.price * l.qty)}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-line rounded-full">
                        <button onClick={() => onQty(l.id, -1)} className="w-8 h-8 flex items-center justify-center text-ink hover:bg-sand rounded-l-full transition-colors"><Icon name="minus" size={14} /></button>
                        <span className="w-7 text-center text-sm tabular-nums">{l.qty}</span>
                        <button onClick={() => onQty(l.id, 1)} className="w-8 h-8 flex items-center justify-center text-ink hover:bg-sand rounded-r-full transition-colors"><Icon name="plus" size={14} /></button>
                      </div>
                      <button onClick={() => onQty(l.id, -l.qty)} className="text-[11px] label text-ink-soft hover:text-ink transition-colors">Odobrať</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-line px-7 py-6 bg-bone/60">
              <div className="mb-4">
                <div className="flex justify-between text-[11px] label text-ink-soft mb-2">
                  <span>{subtotal >= freeFrom ? 'Doprava zdarma odomknutá' : `Do dopravy zdarma ${eur(freeFrom - subtotal)}`}</span>
                </div>
                <div className="h-1 bg-clay/50 rounded-full overflow-hidden">
                  <div className="h-full bg-gold rounded-full transition-all duration-700" style={{ width: pct + '%' }} />
                </div>
              </div>
              <div className="flex justify-between items-baseline mb-5">
                <span className="label text-[11px] text-ink-soft">Medzisúčet</span>
                <span className="font-display text-2xl text-ink tabular-nums">{eur(subtotal)}</span>
              </div>
              <button className="w-full bg-ink text-bone py-4 label text-[11px] flex items-center justify-center gap-2 hover:bg-ink-soft transition-colors duration-300">
                Pokračovať k pokladni <Icon name="arrowRight" size={15} />
              </button>
            </div>
          </>
        }
      </aside>
    </div>
  );
}

/* ----------------------------- Newsletter + Footer ----------------------------- */
function Newsletter() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle');
  const submit = (e) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { setState('error'); return; }
    setState('done');
  };
  return (
    <form onSubmit={submit} className="w-full max-w-md">
      {state === 'done' ?
        <p className="flex items-center gap-2 font-display text-2xl text-bone">
          <Icon name="check" size={22} /> Ďakujeme — ste súčasťou príbehu.
        </p> :

        <>
          <div className="flex items-end gap-3 border-b border-bone/40 pb-2 focus-within:border-bone transition-colors">
            <input
              type="email" value={email}
              onChange={(e) => { setEmail(e.target.value); if (state === 'error') setState('idle'); }}
              placeholder="vas@email.sk"
              className="flex-1 bg-transparent text-bone placeholder-bone/40 font-sans text-base outline-none py-1" />

            <button type="submit" className="label text-[11px] text-bone whitespace-nowrap inline-flex items-center gap-1.5 hover:gap-2.5 transition-all">
              Odoberať <Icon name="arrowRight" size={14} />
            </button>
          </div>
          <p className={'text-xs mt-2 transition-colors ' + (state === 'error' ? 'text-gold' : 'text-bone/45')}>
            {state === 'error' ? 'Zadajte platnú e-mailovú adresu.' : 'Príbehy, nové kúsky a tiché pozvania. Žiadny spam.'}
          </p>
        </>
      }
    </form>
  );
}

export function Footer() {
  return (
    <footer id="kontakt" className="bg-ink text-bone pt-20 pb-10">
      <div className="max-w-shell mx-auto px-5 sm:px-8">
        <div className="grid md:grid-cols-12 gap-12 md:gap-8 pb-16 border-b border-bone/15">
          <div className="md:col-span-5">
            <Reveal>
              <p className="label text-[11px] text-bone/50 mb-4">Zostaňme v spojení</p>
              <h3 className="font-display text-3xl sm:text-4xl leading-[1.1] mb-6 max-w-sm">
                Pridajte sa k tým, ktorí sa pýtajú.
              </h3>
              <Newsletter />
            </Reveal>
          </div>
          <div className="md:col-span-2 md:col-start-8">
            <p className="label text-[11px] text-bone/50 mb-5">Obchod</p>
            <ul className="space-y-3 font-sans text-[15px] text-bone/80">
              <li><button onClick={() => smoothTo('shop')} className="hover:text-bone transition-colors">Tričko</button></li>
              <li><button onClick={() => smoothTo('shop')} className="hover:text-bone transition-colors">Čotky</button></li>
              <li><button onClick={() => smoothTo('shop')} className="hover:text-bone transition-colors">Všetky kúsky</button></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="label text-[11px] text-bone/50 mb-5">Značka</p>
            <ul className="space-y-3 font-sans text-[15px] text-bone/80">
              <li><button onClick={() => smoothTo('onas')} className="hover:text-bone transition-colors">O nás</button></li>
              <li><button onClick={() => smoothTo('kolekcia')} className="hover:text-bone transition-colors">Kolekcia</button></li>
              <li><button onClick={() => smoothTo('preco')} className="hover:text-bone transition-colors">Prečo to robíme</button></li>
              <li><a href={IG_URL} target="_blank" rel="noopener" className="hover:text-bone transition-colors inline-flex items-center gap-1.5">Instagram <Icon name="arrowUpRight" size={13} /></a></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 flex flex-col-reverse md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-bone/40 font-sans">© {new Date().getFullYear()} Čo ty a Boh? — ručne tvorené s úmyslom.</p>
          <div className="flex items-center gap-3 text-bone/60">
            <span className="font-display ital text-lg text-bone/70">Čo ty a Boh?</span>
          </div>
          <a href={IG_URL} target="_blank" rel="noopener" className="label text-[11px] text-bone/50 hover:text-bone transition-colors inline-flex items-center gap-2">
            <Icon name="instagram" size={16} /> @cotyaboh
          </a>
        </div>
      </div>
    </footer>
  );
}
