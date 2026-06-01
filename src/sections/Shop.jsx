import { useState, useCallback, useEffect } from 'react';
import { Icon, Reveal, eur } from '../lib';

// ─── Cursor-tracking zoom image ───────────────────────────────────────────────

function ZoomableImage({ src, alt }) {
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState('50% 50%');

  const onMove = useCallback((e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width * 100).toFixed(2);
    const y = ((e.clientY - r.top) / r.height * 100).toFixed(2);
    setOrigin(`${x}% ${y}%`);
  }, []);

  if (!src) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-ink/25">
        <Icon name="bag" size={36} stroke={1} />
        <span className="font-display ital text-lg">Obrázok čoskoro</span>
      </div>
    );
  }

  return (
    <div
      className="w-full h-full overflow-hidden"
      style={{ cursor: zoomed ? 'crosshair' : 'zoom-in' }}
      onMouseEnter={() => setZoomed(true)}
      onMouseLeave={() => { setZoomed(false); setOrigin('50% 50%'); }}
      onMouseMove={onMove}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain select-none pointer-events-none"
        style={{
          transform: zoomed ? 'scale(2.6)' : 'scale(1)',
          transformOrigin: origin,
          transition: zoomed
            ? 'transform 0.12s cubic-bezier(0.16,1,0.3,1)'
            : 'transform 0.38s cubic-bezier(0.16,1,0.3,1)',
          willChange: 'transform',
        }}
        draggable={false}
      />
    </div>
  );
}

// ─── Product Detail Modal ─────────────────────────────────────────────────────

function ProductModal({ product, onClose, onAdd }) {
  const [view, setView] = useState('front');
  const [color, setColor] = useState(product.defaultColor || 'default');
  const [size, setSize] = useState('');
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const imgs = product.images[color] || product.images.default || {};
  const hasBack = !!imgs.back;
  const currentSrc = view === 'back' && hasBack ? imgs.back : imgs.front;

  const colorLabel = product.hasColors
    ? (product.colors.find((c) => c.id === color)?.label || '')
    : '';

  const handleColorChange = (c) => {
    if (!product.colors.some((col) => col.id === c)) return;
    setColor(c);
    const newImgs = product.images[c] || {};
    if (!newImgs.back) setView('front');
  };

  const handleAdd = () => {
    if (product.hasSizes && !size) { setSizeError(true); return; }
    setSizeError(false);
    onAdd(product.id, product.hasColors ? color : '', product.hasSizes ? size : '');
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  // Escape to close
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-ink/65 backdrop-blur-sm modal-backdrop" onClick={onClose} />

      <div className="modal-panel relative w-full max-w-5xl max-h-[94vh] bg-paper shadow-2xl overflow-hidden flex flex-col lg:flex-row rounded-[2px]">

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Zavrieť"
          className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center bg-paper/80 backdrop-blur text-ink hover:bg-bone transition-colors rounded-[2px]"
        >
          <Icon name="x" size={18} />
        </button>

        {/* ── Left: zoomable image ── */}
        <div className="lg:w-[58%] bg-sand flex flex-col min-h-[44vh] lg:min-h-0">
          <div className="relative flex-1 p-6 sm:p-8">
            <ZoomableImage src={currentSrc} alt={`${product.name}${colorLabel ? ' · ' + colorLabel : ''}`} />
            {currentSrc && (
              <span className="absolute bottom-4 right-4 label text-[9px] text-ink-soft/60 pointer-events-none select-none">
                Najeďte pre zoom
              </span>
            )}
          </div>

          {/* Front / Back tabs */}
          {hasBack && (
            <div className="flex border-t border-bone/30 shrink-0">
              {['front', 'back'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setView(tab)}
                  className={
                    'flex-1 py-3.5 label text-[10px] transition-colors duration-300 ' +
                    (view === tab
                      ? 'bg-ink text-bone'
                      : 'bg-sand/80 text-ink-soft hover:text-ink hover:bg-bone/50')
                  }
                >
                  {tab === 'front' ? 'Predná' : 'Zadná'}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Right: product details ── */}
        <div className="lg:w-[42%] flex flex-col overflow-y-auto">
          <div className="p-7 sm:p-8 lg:p-10 flex flex-col gap-6 flex-1">

            {/* Header */}
            <div className="border-b border-line/60 pb-6">
              <span className="label text-[10px] text-gold block mb-3">{product.badge}</span>
              <h2 className="font-display text-[2rem] sm:text-[2.4rem] text-ink leading-[1.05] mb-1">
                {product.name}
              </h2>
              <p className="text-ink-soft text-[13px] font-sans mb-5">{product.tag}</p>
              <p className="font-display text-[2.2rem] text-ink tabular-nums">{eur(product.price)}</p>
            </div>

            <p className="text-ink-soft text-[15px] leading-[1.72] font-sans">{product.desc}</p>

            {/* Color picker */}
            {product.hasColors && (
              <div>
                <p className="label text-[10px] text-ink-soft mb-3.5">
                  Farba — <span className="text-ink">{colorLabel}</span>
                </p>
                <div className="flex gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleColorChange(c.id)}
                      title={c.label}
                      aria-label={c.label}
                      aria-pressed={color === c.id}
                      className={
                        'w-10 h-10 rounded-full transition-all duration-300 ' +
                        (color === c.id
                          ? 'ring-2 ring-ink ring-offset-2 ring-offset-paper scale-110'
                          : 'ring-1 ring-line hover:ring-ink-soft hover:scale-105')
                      }
                      style={{
                        background: c.hex,
                        boxShadow: c.id === 'white' ? 'inset 0 0 0 1px rgba(0,0,0,0.12)' : undefined,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size picker */}
            {product.hasSizes && (
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <p className="label text-[10px] text-ink-soft">
                    Veľkosť{size && <span className="text-ink"> — {size}</span>}
                  </p>
                  {sizeError && (
                    <p className="label text-[10px] text-gold animate-pulse">Vyberte veľkosť</p>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => { setSize(s); setSizeError(false); }}
                      className={
                        'py-3 label text-[11px] border rounded-[2px] transition-all duration-200 ' +
                        (size === s
                          ? 'bg-ink text-bone border-ink'
                          : sizeError
                            ? 'bg-transparent text-ink border-gold/70 hover:border-ink'
                            : 'bg-transparent text-ink border-line/70 hover:border-ink')
                      }
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-auto pt-2 flex flex-col gap-3">
              <button
                onClick={handleAdd}
                className={
                  'w-full py-4 label text-[11px] flex items-center justify-center gap-2.5 transition-all duration-300 ' +
                  (added ? 'bg-gold text-bone' : 'bg-ink text-bone hover:bg-ink-soft')
                }
              >
                {added
                  ? <><Icon name="check" size={15} /> Pridané do košíka</>
                  : <>Pridať do košíka · {eur(product.price)}</>
                }
              </button>
              <p className="text-center text-[11px] text-ink-soft/60 font-sans">
                Bezpečná platba · Bezplatné vrátenie do 14 dní
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product, onOpen, delay }) {
  const [colorIndex, setColorIndex] = useState(0);

  // Auto-cycle colors every 3 s for products that have multiple colors
  useEffect(() => {
    if (!product.hasColors || product.colors.length < 2) return;
    const id = setInterval(() => {
      setColorIndex((i) => (i + 1) % product.colors.length);
    }, 3000);
    return () => clearInterval(id);
  }, [product.id, product.colors.length]);

  const activeColorId = product.hasColors
    ? product.colors[colorIndex].id
    : (product.defaultColor || 'default');

  return (
    <Reveal delay={delay} y={40}>
      <article
        className="group"
        role="button"
        tabIndex={0}
        onClick={() => onOpen(product)}
        onKeyDown={(e) => e.key === 'Enter' && onOpen(product)}
        style={{ cursor: 'pointer' }}
      >
        {/* Image */}
        <div className="relative overflow-hidden bg-sand rounded-[2px] aspect-[4/5]">

          {/* Color layers — crossfade between variants */}
          {product.hasColors ? (
            product.colors.map((c, i) => {
              const src = product.images[c.id]?.front;
              if (!src) return null;
              return (
                <img
                  key={c.id}
                  src={src}
                  alt={`${product.name} · ${c.label}`}
                  className="absolute inset-0 w-full h-full object-contain transition-all duration-700 ease-in-out group-hover:scale-[1.05]"
                  style={{ opacity: colorIndex === i ? 1 : 0 }}
                  draggable={false}
                />
              );
            })
          ) : (
            (() => {
              const src = product.images[product.defaultColor || 'default']?.front;
              return src ? (
                <img
                  src={src}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.05]"
                  draggable={false}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-ink/25">
                  <Icon name="bag" size={32} stroke={1} />
                  <span className="font-display ital text-base">Obrázok čoskoro</span>
                </div>
              );
            })()
          )}

          {/* Badge */}
          <span className="absolute top-4 left-4 label text-[10px] text-ink bg-paper/85 backdrop-blur px-3 py-1.5 pointer-events-none z-10">
            {product.badge}
          </span>

          {/* Color dots — active dot is larger */}
          {product.hasColors && (
            <div className="absolute bottom-[3.8rem] left-4 flex gap-1.5 pointer-events-none z-10">
              {product.colors.map((c, i) => (
                <span
                  key={c.id}
                  className="rounded-full shadow-sm transition-all duration-500"
                  style={{
                    background: c.hex,
                    width: colorIndex === i ? '18px' : '14px',
                    height: colorIndex === i ? '18px' : '14px',
                    opacity: colorIndex === i ? 1 : 0.5,
                    boxShadow: c.id === 'white' ? 'inset 0 0 0 1px rgba(0,0,0,0.2)' : undefined,
                  }}
                />
              ))}
            </div>
          )}

          {/* Hover CTA */}
          <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] z-10">
            <div className="w-full py-3.5 label text-[11px] flex items-center justify-center gap-2 bg-ink text-bone">
              {product.hasSizes ? 'Vybrať veľkosť' : 'Zobraziť detail'}
              <Icon name="arrowRight" size={14} />
            </div>
          </div>
        </div>

        {/* Meta */}
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

// ─── Shop Section ─────────────────────────────────────────────────────────────

export function Shop({ products, onAdd }) {
  const [activeProduct, setActiveProduct] = useState(null);

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} onOpen={setActiveProduct} delay={i * 120} />
          ))}
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

      {activeProduct && (
        <ProductModal
          product={activeProduct}
          onClose={() => setActiveProduct(null)}
          onAdd={onAdd}
        />
      )}
    </section>
  );
}
