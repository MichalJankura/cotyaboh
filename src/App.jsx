import { useState, useEffect } from 'react';
import { Header, MobileMenu, CartDrawer, Footer } from './chrome';
import { Hero, Marquee, ONas, Desatoro, Why, ClosingBand, Shop } from './sections';
import { smoothTo } from './lib';
import './index.css';

const PRODUCTS = [
  {
    id: 'tee',
    name: 'Tričko — Čo ty a Boh?',
    price: 25.0,
    tag: 'Bavlna · ručná potlač',
    badge: 'Edícia',
    desc: 'Jemná potlač na hrudi, výrazná typografická grafika na chrbte. Čisté rukávy, mäkká bavlna, strih na každý deň.',
    slotFront: 'prod-tee-front',
    slotBack: 'prod-tee-back',
    placeholderFront: 'Tričko — predná strana',
    placeholderBack: 'Tričko — zadná strana',
    backSrc: '/mikina.png',
    zoomSrc: '/mikina.png',
    zoomAlt: 'Tričko — zadná strana',
    showBackByDefault: true,
  },
  {
    id: 'cotky',
    name: 'Čotky',
    price: 10.0,
    tag: 'Modlitebný prevazok · ručne viazané',
    badge: 'Ručná práca',
    desc: 'Tradičný modlitebný prevazok, viazaný uzol po uzle. Drží v dlani, pripomína v tichu. Každý kus je originál.',
    slotFront: 'prod-cotky',
    slotBack: null,
    placeholderFront: 'Čotky — modlitebný prevazok',
    placeholderBack: '',
  },
];

function App() {
  const [items, setItems] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const addItem = (id) => {
    setItems((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setCartOpen(true);
  };

  const changeQty = (id, delta) => {
    setItems((prev) => {
      const next = { ...prev };
      const v = (next[id] || 0) + delta;
      if (v <= 0) delete next[id]; else next[id] = v;
      return next;
    });
  };

  const cartCount = Object.values(items).reduce((s, n) => s + n, 0);
  const cartTotal = Object.keys(items).reduce((s, id) => {
    const p = PRODUCTS.find((x) => x.id === id);
    return s + (p ? p.price * items[id] : 0);
  }, 0);

  useEffect(() => {
    const lock = cartOpen || menuOpen;
    document.body.style.overflow = lock ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [cartOpen, menuOpen]);

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
        <Shop products={PRODUCTS} onAdd={addItem} />
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
