import { useState } from 'react';
import { Icon, Reveal, RevealLines, useParallax, eur, smoothTo } from './lib';

/* ============================ HERO ============================ */
export function Hero({ onShop }) {
  const imgRef = useParallax(0.08);
  return (
    <section className="relative min-h-[100svh] flex items-center pt-28 pb-16 overflow-hidden">
      <div className="max-w-shell mx-auto w-full px-5 sm:px-8 grid md:grid-cols-12 gap-10 md:gap-8 lg:gap-6 items-center relative">
        {/* text */}
        <div className="md:col-span-7 lg:col-span-6 order-2 md:order-1">
          <Reveal delay={80}>
            <p className="label text-[11px] text-gold mb-7 flex items-center gap-3">
              <span className="w-9 h-px bg-gold inline-block" /> Kresťanský merch · evanjelizácia · gen Z+Y
            </p>
          </Reveal>

          <h1 className="font-display text-ink leading-[0.94] text-[clamp(3.2rem,7.6vw,6.2rem)] tracking-[-0.01em]">
            <RevealLines lines={["Čo ty"]} baseDelay={160} />
            <span className="block pt-2">
              <RevealLines lines={["a Boh?"]} baseDelay={300} lineClassName="ital text-gold" />
            </span>
          </h1>

          <Reveal delay={540}>
            <p className="mt-7 font-display ital text-2xl sm:text-[1.7rem] text-ink leading-snug max-w-md">
              Otázka, na ktorú len ty poznáš odpoveď.
            </p>
          </Reveal>

          <Reveal delay={620}>
            <p className="mt-5 text-ink-soft text-[17px] leading-relaxed max-w-md font-sans">
              Vitaj. Sme radi, že si tu — aj keby to bola náhoda, ktorá možno
              náhodou nie je.
            </p>
          </Reveal>

          <Reveal delay={720}>
            <div className="mt-9 flex flex-wrap items-center gap-7">
              <button onClick={onShop}
                className="group bg-ink text-bone px-9 py-4 label text-[11px] inline-flex items-center gap-3 hover:bg-ink-soft transition-colors duration-300">
                Vstúpiť do shopu
                <Icon name="arrowRight" size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button onClick={() => smoothTo('kolekcia')} className="label text-[11px] text-ink cta-line">
                Čo ty a desatoro?
              </button>
            </div>
          </Reveal>
        </div>

        {/* image */}
        <div className="md:col-span-5 lg:col-span-6 order-1 md:order-2 relative">
          <Reveal y={48} delay={120}>
            <div className="relative md:translate-x-4 lg:translate-x-6 xl:translate-x-12">
              <div className="relative overflow-hidden bg-sand rounded-[2px] aspect-[4/5] max-h-[54vh] md:aspect-auto md:max-h-[640px] md:h-[72vh] lg:h-[78vh] lg:max-h-[760px]">
                <div ref={imgRef} className="absolute -inset-y-[10%] inset-x-0">
                  <img
                    className="logo w-full h-full object-contain p-10"
                    src="/logo.png"
                    alt="Čo ty a Boh logo"
                  />
                </div>
              </div>
              {/* overlapping caption card */}
              <Reveal delay={520} y={24}>
                <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-paper shadow-xl px-6 py-5 max-w-[240px]">
                  <p className="font-display ital text-2xl text-ink leading-tight">„Desatoro&#8220;</p>
                  <p className="text-xs text-ink-soft mt-1.5 font-sans">Prvá kolekcia · 10 otázok</p>
                </div>
              </Reveal>
            </div>
          </Reveal>
        </div>
      </div>

      {/* scroll cue */}
      <button onClick={() => smoothTo('onas')}
        className="absolute bottom-7 left-5 sm:left-8 hidden sm:flex items-center gap-2 text-ink-soft hover:text-ink transition-colors">
        <Icon name="arrowDown" size={16} className="animate-bounce" />
        <span className="label text-[10px]">Nadol</span>
      </button>
    </section>
  );
}

/* ============================ MARQUEE BAND ============================ */
export function Marquee() {
  const words = ['merch s myšlienkou', 'evanjelizácia', 'humor', 'hĺbka', 'gen Z + Y', 'čo ty a Boh?','merch s myšlienkou', 'evanjelizácia', 'humor', 'hĺbka', 'gen Z + Y', 'čo ty a Boh?'];
  const run = [...words, ...words];
  return (
    <div className="bg-ink text-bone py-5 overflow-hidden select-none">
      <div className="flex w-max marquee-track">
        {run.map((w, i) =>
          <span key={i} className="flex items-center">
            <span className="font-display ital text-2xl sm:text-3xl px-7 whitespace-nowrap text-bone/90">{w}</span>
            <span className="text-gold">✦</span>
          </span>
        )}
      </div>
    </div>
  );
}

/* ============================ O NÁS ============================ */
export function ONas() {
  const tags = ['trendy dizajn', 'jasné myšlienky', 'trocha humoru', 'poriadna hĺbka', 'evanjelizácia'];
  const imgRef = useParallax(0.08);
  return (
    <section id="onas" className="py-24 sm:py-32 bg-bone">
      <div className="max-w-shell mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* text */}
        <div className="lg:col-span-6 order-2 lg:order-1">
          <Reveal>
            <p className="label text-[11px] text-gold mb-5">O nás</p>
            <h2 className="font-display text-ink text-[clamp(2.6rem,5vw,4.2rem)] leading-[1.02] mb-10">
              Merch s myšlienkou. <span className="block ital text-gold">A s úsmevom.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="space-y-5 text-ink-soft text-[17px] leading-[1.75] font-sans max-w-xl">
              <p>Nechceme kázať. Nechceme poučovať. Chceme jednoducho — aby si sa raz zastavil pred zrkadlom, pozrel na svoju mikinu a v hlave sa niečo pohlo.</p>
              <p><span className="text-ink font-medium">Viera nie je nudná. Boh nie je abstrakcia.</span> A ty si viac, než len náhodný okoloidúci.</p>
              <p>Preto tvoríme oblečenie, ktoré je nositeľné, trendy a pritom hovorí viac, ako by si čakal. Polopate. S nadhľadom. Bez patetiky. <span className="text-ink/55 ital">(Dobre, možno trochu patetiky — ale len keď to naozaj treba.)</span></p>
            </div>
          </Reveal>
          {/* <Reveal delay={220}>
            <div className="mt-9 flex flex-wrap gap-2.5">
              {tags.map((t) =>
                <span key={t} className="label text-[10px] text-ink border border-line rounded-full px-4 py-2 bg-paper/60">{t}</span>
              )}
            </div>
          </Reveal> */}
        </div>
        {/* image + quote */}
        <div className="lg:col-span-6 order-1 lg:order-2">
          <Reveal y={48}>
            <div className="relative">
              <div className="relative overflow-hidden bg-sand rounded-[2px] aspect-[4/5] lg:aspect-[4/4.4]">
                <div ref={imgRef} className="absolute -inset-y-[10%] inset-x-0">
                  <img
                    src="/mikelandzelo.jpg"
                    alt="Michelangelovo stvorenie — detail rúk"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <Reveal delay={300} y={24}>
                <div className="absolute -bottom-7 left-4 right-8 sm:-left-8 sm:right-auto sm:max-w-[320px] bg-ink text-bone shadow-2xl px-7 py-6">
                  <p className="font-display ital text-xl sm:text-2xl leading-snug">„Evanjelizácia nemusí byť hovorenie. Niekedy stačí obliecť si správne tričko."</p>
                </div>
              </Reveal>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================ DESATORO ============================ */
const DESATORO = [
  { q: 'Čo ty a láska?', s: 'Miluješ to, čo si myslíš, že miluješ?' },
  { q: 'Čo ty a meno Božie?', s: 'Hovoríš ho — alebo ho len hovoríš?' },
  { q: 'Čo ty a sviatok?', s: 'Kedy si si naposledy dovolil zastaviť?' },
  { q: 'Čo ty a rodičia?', s: 'Ťažká otázka. Vieš prečo.' },
  { q: 'Čo ty a sebaovládanie?', s: 'Kto vlastne velí — ty, alebo tvoj telefón?' },
  { q: 'Čo ty a cudnosť?', s: 'Zaujímavé slovo do dnešnej doby.' },
  { q: 'Čo ty a bezúhonnosť?', s: 'Čo robíš, keď ťa nikto nevidí?' },
  { q: 'Čo ty a pravda?', s: 'Aj tá nepríjemná?' },
  { q: 'Čo ty a vernosť?', s: 'V malom i vo veľkom.' },
  { q: 'Čo ty a skromnosť?', s: 'Chceš viac. Ale potrebuješ?' }
];

export function Desatoro() {
  return (
    <section id="kolekcia" className="py-24 sm:py-32 bg-ink text-bone overflow-hidden">
      <div className="max-w-shell mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="max-w-2xl mb-16 sm:mb-24">
            <p className="label text-[11px] text-gold mb-5">Prvá kolekcia</p>
            <h2 className="font-display text-[clamp(2.8rem,6.5vw,5.2rem)] leading-[0.98] mb-7">
              Čo ty a <span className="ital text-gold">desatoro?</span>
            </h2>
            <p className="text-bone/70 text-[17px] leading-[1.7] font-sans">
              Desať prikázaní. Desať otázok. A každá z nich namierená priamo na teba.
              Nie ako obžaloba — ale ako úprimné: <span className="ital text-bone">tak, čo teda?</span> Naša
              prvá kolekcia berie desatoro nie ako historický text pod sklom, ale ako
              živú výzvu. Jednoduchú. Konkrétnu. Niekedy nepríjemne presnú.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-x-14">
          {DESATORO.map((d, i) =>
            <Reveal key={i} delay={i % 2 * 70} y={26}>
              <div className="group flex items-baseline gap-5 sm:gap-7 py-7 border-t border-bone/15">
                <span className="font-display text-3xl sm:text-4xl text-gold/80 tabular-nums shrink-0 w-11">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-display text-3xl sm:text-[2.3rem] leading-tight group-hover:text-gold transition-colors duration-500">{d.q}</h3>
                  <p className="text-bone/55 text-[15px] mt-1.5 font-sans ital">{d.s}</p>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

/* ============================ PREČO ============================ */
export function Why() {
  return (
    <section id="preco" className="py-24 sm:py-32 bg-bone">
      <div className="max-w-shell mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="label text-[11px] text-gold mb-5">Myšlienka projektu</p>
            <h2 className="font-display text-ink text-[clamp(2.4rem,4.5vw,3.8rem)] leading-[1.02]">
              Prečo to <span className="ital">robíme?</span>
            </h2>
          </Reveal>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <Reveal delay={120}>
            <div className="space-y-6 text-ink-soft text-[18px] sm:text-[19px] leading-[1.7] font-sans">
              <p><span className="font-display ital text-ink text-2xl sm:text-3xl">Pretože viera nie je záležitosť nedeľného rána.</span> Je to niečo, čo buď žiješ — alebo nežiješ.</p>
              <p>A my veríme, že aj mikina, tričko či taška môžu byť malým semienkom otázky. Pre teba. Pre niekoho, kto si ťa len tak zbehne pohľadom na ulici. Pre kamaráta, ktorý sa spýta: <span className="ital text-ink">„Počkaj, čo to máš na sebe?"</span></p>
              <p className="text-ink font-medium text-xl sm:text-2xl font-display ital">To je evanjelizácia dneška. Nie hlasná. Ale presná.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================ ZÁVER ============================ */
export function ClosingBand({ onShop }) {
  return (
    <section className="py-28 sm:py-40 bg-paper border-t border-line/60 text-center relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 relative">
        <Reveal>
          <h2 className="font-display text-ink text-[clamp(3rem,8vw,6.5rem)] leading-[0.95]">
            Čo ty <span className="ital text-gold">a Boh?</span>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-7 font-display ital text-2xl sm:text-3xl text-ink/80">Otázka zostáva otvorená. Odpoveď je tvoja.</p>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-4 text-ink-soft text-[17px] font-sans">Sme tu — s oblečením, ktoré sa pýta.</p>
        </Reveal>
        <Reveal delay={340}>
          <button onClick={onShop}
            className="group mt-10 bg-ink text-bone px-10 py-4 label text-[11px] inline-flex items-center gap-3 hover:bg-ink-soft transition-colors duration-300">
            Vstúpiť do shopu <Icon name="arrowRight" size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ SHOP ============================ */
function ImageZoomModal({ open, src, alt, onClose }) {
  if (!open) return null;

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--zoom-x', `${x}%`);
    e.currentTarget.style.setProperty('--zoom-y', `${y}%`);
  };

  const handleLeave = (e) => {
    e.currentTarget.style.setProperty('--zoom-x', '50%');
    e.currentTarget.style.setProperty('--zoom-y', '50%');
  };

  return (
    <div
      className="fixed inset-0 z-[70] bg-ink/70 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-paper rounded-[2px] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-bone/90 text-ink label text-[9px] px-3 py-2 rounded-[2px] hover:bg-bone"
        >
          Zavrieť
        </button>
        <div className="zoom-frame overflow-hidden bg-bone h-[70vh] max-h-[80vh] sm:h-[75vh]" onMouseMove={handleMove} onMouseLeave={handleLeave}>
          <img
            src={src}
            alt={alt}
            className="zoom-image w-full h-full object-contain select-none"
            draggable="false"
          />
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, onAdd, delay, onZoom }) {
  const [added, setAdded] = useState(false);
  const handle = () => { onAdd(product.id); setAdded(true); setTimeout(() => setAdded(false), 1400); };
  const handleZoom = (e) => {
    if (!product.zoomSrc || !onZoom) return;
    e.preventDefault();
    e.stopPropagation();
    onZoom(product);
  };
  return (
    <Reveal delay={delay} y={40}>
      <article className={'group' + (product.showBackByDefault ? ' show-back' : '')}>
        <div className="relative overflow-hidden bg-sand rounded-[2px] aspect-[4/5]">
          {/* front / back */}
          <div className="swap-front absolute inset-0 transition-transform duration-[1100ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]">
            <image-slot id={product.slotFront} style={{ width: '100%', height: '100%' }} shape="rect"
              placeholder={product.placeholderFront}></image-slot>
          </div>
          {product.slotBack &&
            <div className="swap-back absolute inset-0 transition-transform duration-[1100ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]">
              <image-slot id={product.slotBack} style={{ width: '100%', height: '100%' }} shape="rect"
                placeholder={product.placeholderBack} src={product.backSrc}></image-slot>
              {product.zoomSrc &&
                <button
                  type="button"
                  className="zoom-hit absolute inset-0"
                  aria-label={`Zväčšiť ${product.zoomAlt || product.name}`}
                  onClick={handleZoom}
                />
              }
            </div>
          }

          {/* tag */}
          <span className="absolute top-4 left-4 label text-[10px] text-ink bg-paper/85 backdrop-blur px-3 py-1.5">{product.badge}</span>
          {product.slotBack &&
            <span className="absolute top-4 right-4 label text-[9px] text-bone bg-ink/45 backdrop-blur px-2.5 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">Zadná strana</span>
          }

          {/* add to cart reveal */}
          <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] z-20">
            <button onClick={handle}
              className={'w-full py-3.5 label text-[11px] flex items-center justify-center gap-2 transition-colors duration-300 ' + (
                added ? 'bg-gold text-bone' : 'bg-ink text-bone hover:bg-ink-soft')}>
              {added ? <><Icon name="check" size={15} /> Pridané</> : <>Pridať do košíka · {eur(product.price)}</>}
            </button>
          </div>
        </div>

        {/* meta */}
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl sm:text-[1.7rem] text-ink leading-tight">{product.name}</h3>
            <p className="text-sm text-ink-soft mt-1 font-sans">{product.tag}</p>
          </div>
          <p className="font-display text-2xl text-ink tabular-nums whitespace-nowrap pt-1">{eur(product.price)}</p>
        </div>
        <p className="mt-3 text-[15px] text-ink-soft/90 leading-relaxed font-sans max-w-md">{product.desc}</p>
      </article>
    </Reveal>
  );
}

export function Shop({ products, onAdd }) {
  const [zoom, setZoom] = useState(null);
  const openZoom = (product) => setZoom({ src: product.zoomSrc, alt: product.zoomAlt || product.name });
  const closeZoom = () => setZoom(null);
  return (
    <section id="shop" className="py-24 sm:py-32 bg-paper border-t border-line/60">
      <div className="max-w-shell mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <p className="label text-[11px] text-gold mb-5">Obchod</p>
              <h2 className="font-display text-ink text-[clamp(2.6rem,5.5vw,4.5rem)] leading-[1.02]">
                Nájdite svoj <span className="ital">kúsok</span>
              </h2>
            </div>
            <p className="text-ink-soft max-w-xs text-[15px] leading-relaxed font-sans">
              Malé série, veľká pozornosť detailu. Skladom len to, čo stihneme spraviť poctivo.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-10 sm:gap-12 max-w-4xl mx-auto">
          {products.map((p, i) =>
            <ProductCard key={p.id} product={p} onAdd={onAdd} delay={i * 120} onZoom={openZoom} />
          )}
        </div>

        <Reveal delay={200}>
          <div className="mt-20 flex items-center justify-center gap-3 text-ink-soft">
            <span className="w-10 h-px bg-line" />
            <Icon name="scissors" size={16} className="text-gold" />
            <span className="font-display ital text-lg">tvorené v malom, s úmyslom rozosmiať a zamyslieť</span>
            <Icon name="scissors" size={16} className="text-gold" />
            <span className="w-10 h-px bg-line" />
          </div>
        </Reveal>
      </div>
      <ImageZoomModal open={!!zoom} src={zoom?.src} alt={zoom?.alt} onClose={closeZoom} />
    </section>
  );
}
