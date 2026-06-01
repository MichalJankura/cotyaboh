import { useState, useEffect } from 'react';
import { Header, MobileMenu, CartDrawer, Footer } from './chrome';
import { Hero, Marquee, ONas, Desatoro, Why, Saints, ClosingBand, Shop, Reviews } from './sections';
import { smoothTo, makeKey, parseKey, MAX_QTY } from './lib';
import './index.css';

export const PRODUCTS = [
  {
    id: 'hoodie',
    name: 'Mikina — Čo ty a Boh?',
    price: 45.0,
    tag: 'Bavlna · fleece · ručná potlač',
    badge: 'Nové',
    desc: 'Váha na ramenách, ktorá nezaťaží. Mäkká mikina s výraznou grafikou na chrbte a tichým logom na hrudi. Na každý deň — aj ten ťažší.',
    hasSizes: true,
    sizes: ['S', 'M', 'L', 'XL'],
    hasColors: true,
    colors: [
      { id: 'black', label: 'Čierna', hex: '#1C1A18' },
      { id: 'white', label: 'Biela', hex: '#F5F0E8' },
    ],
    images: {
      black: { front: '/mikina_black.png', back: null },
      white: { front: '/mikina_white.png', back: null },
    },
    defaultColor: 'black',
  },
  {
    id: 'tee',
    name: 'Tričko — Čo ty a Boh?',
    price: 25.0,
    tag: 'Bavlna · ručná potlač',
    badge: 'Edícia',
    desc: 'Jemná potlač na hrudi, výrazná typografická grafika na chrbte. Čisté rukávy, mäkká bavlna, strih na každý deň.',
    hasSizes: true,
    sizes: ['S', 'M', 'L', 'XL'],
    hasColors: true,
    colors: [
      { id: 'black', label: 'Čierna', hex: '#1C1A18' },
      { id: 'white', label: 'Biela', hex: '#F5F0E8' },
    ],
    images: {
      black: { front: '/tshirt_black.png', back: null },
      white: { front: '/tshirt_white.png', back: null },
    },
    defaultColor: 'black',
  },
  {
    id: 'cotky',
    name: 'Čotky',
    price: 10.0,
    tag: 'Modlitebný prevazok · ručne viazané',
    badge: 'Ručná práca',
    desc: 'Tradičný modlitebný prevazok, viazaný uzol po uzle. Drží v dlani, pripomína v tichu. Každý kus je originál.',
    hasSizes: false,
    sizes: [],
    hasColors: false,
    colors: [],
    images: {
      default: { front: null, back: null },
    },
    defaultColor: 'default',
  },
];

const SECTION_IDS = ['hero', 'onas', 'kolekcia', 'preco', 'svatci', 'shop', 'kontakt'];

function App() {
  const [items, setItems] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const addItem = (id, color = '', size = '') => {
    const product = PRODUCTS.find((p) => p.id === id);
    if (!product) return;
    if (product.hasColors && !product.colors.some((c) => c.id === color)) return;
    if (product.hasSizes && !product.sizes.includes(size)) return;
    const key = makeKey(id, color, size);
    setItems((prev) => {
      const current = prev[key] || 0;
      if (current >= MAX_QTY) return prev;
      return { ...prev, [key]: current + 1 };
    });
    setCartOpen(true);
  };

  const changeQty = (key, delta) => {
    setItems((prev) => {
      const { id } = parseKey(key);
      if (!PRODUCTS.some((p) => p.id === id)) return prev;
      const next = { ...prev };
      const v = Math.min(MAX_QTY, (next[key] || 0) + delta);
      if (v <= 0) delete next[key]; else next[key] = v;
      return next;
    });
  };

  const cartCount = Object.values(items).reduce((s, n) => s + n, 0);
  const cartTotal = Object.keys(items).reduce((s, key) => {
    const { id } = parseKey(key);
    const p = PRODUCTS.find((x) => x.id === id);
    return s + (p ? p.price * items[key] : 0);
  }, 0);

  useEffect(() => {
    const lock = cartOpen || menuOpen;
    document.body.style.overflow = lock ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [cartOpen, menuOpen]);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const timer = setTimeout(() => smoothTo(hash), 300);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    let raf = null;
    const update = () => {
      const vh = window.innerHeight;
      let activeId = '';
      let maxVisible = 0;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const visible = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0));
        if (visible > maxVisible) { maxVisible = visible; activeId = id; }
      }
      if (activeId) {
        const newHash = activeId === 'hero' ? '' : `#${activeId}`;
        if (window.location.hash !== newHash)
          window.history.replaceState(null, '', newHash || window.location.pathname);
      }
      raf = null;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <Header
        cartCount={cartCount}
        cartTotal={cartTotal}
        onCartOpen={() => setCartOpen(true)}
        onMenuOpen={() => setMenuOpen(true)}
      />
      <main>
        <Hero onShop={() => smoothTo('shop')} />
        <Marquee />
        <ONas />
        <Desatoro />
        <Why />
        <Saints />
        <Shop products={PRODUCTS} onAdd={addItem} />
        <Reviews />
        <ClosingBand onShop={() => smoothTo('shop')} />
      </main>
      <Footer />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={items}
        products={PRODUCTS}
        onQty={changeQty}
      />
    </>
  );
}

export default App;
