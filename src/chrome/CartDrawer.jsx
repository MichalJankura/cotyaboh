import { Icon, eur } from '../lib';

const parseKey = (key) => {
  const [id, color = '', size = ''] = key.split(':');
  return { id, color, size };
};

export function CartDrawer({ open, onClose, items, products, onQty }) {
  const lines = Object.keys(items)
    .map((key) => {
      const qty = items[key];
      if (qty <= 0) return null;
      const { id, color, size } = parseKey(key);
      const product = products.find((p) => p.id === id);
      if (!product) return null;
      const colorInfo = product.colors?.find((c) => c.id === color);
      const colorLabel = colorInfo?.label || '';
      const imgColor = color || product.defaultColor || 'default';
      const cartSrc = product.images[imgColor]?.front || null;
      return { ...product, key, color, colorLabel, size, qty, cartSrc };
    })
    .filter(Boolean);

  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const freeFrom = 50;
  const pct = Math.min(100, (subtotal / freeFrom) * 100);

  return (
    <div className={'fixed inset-0 z-50 transition-all duration-500 ' + (open ? 'visible' : 'invisible')}>
      <div
        onClick={onClose}
        className={'absolute inset-0 bg-ink/40 transition-opacity duration-500 ' + (open ? 'opacity-100' : 'opacity-0')}
      />
      <aside className={
        'absolute inset-y-0 right-0 w-full max-w-[440px] bg-paper flex flex-col shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] ' +
        (open ? 'translate-x-0' : 'translate-x-full')
      }>
        <div className="flex items-center justify-between px-7 py-6 border-b border-line">
          <h2 className="font-display text-2xl text-ink">
            Košík{' '}
            <span className="text-ink-soft text-lg">({lines.reduce((s, l) => s + l.qty, 0)})</span>
          </h2>
          <button onClick={onClose} className="p-1 text-ink hover:rotate-90 transition-transform duration-300" aria-label="Zavrieť">
            <Icon name="x" size={22} />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-10 gap-4">
            <Icon name="bag" size={40} className="text-clay" stroke={1.2} />
            <p className="font-display text-2xl text-ink">Váš košík je zatiaľ prázdny</p>
            <p className="text-sm text-ink-soft leading-relaxed">Každý kúsok je tvorený s úmyslom. Nájdite ten svoj.</p>
            <button onClick={onClose} className="mt-2 label text-[11px] text-ink cta-line">Pokračovať v nákupe</button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-7 py-6 flex flex-col gap-6">
              {lines.map((l) => (
                <div key={l.key} className="flex gap-4">
                  <div className="w-20 h-24 bg-sand rounded-sm overflow-hidden shrink-0 flex items-center justify-center">
                    {l.cartSrc ? (
                      <img src={l.cartSrc} alt={l.name} className="w-full h-full object-contain" draggable={false} />
                    ) : (
                      <Icon name="bag" size={20} className="text-ink/20" stroke={1} />
                    )}
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between gap-3">
                      <div>
                        <p className="font-display text-xl text-ink leading-tight">{l.name}</p>
                        <p className="text-xs text-ink-soft mt-0.5">
                          {[l.colorLabel, l.size].filter(Boolean).join(' · ') || l.tag}
                        </p>
                      </div>
                      <p className="font-sans text-sm text-ink tabular-nums whitespace-nowrap">{eur(l.price * l.qty)}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-line rounded-full">
                        <button onClick={() => onQty(l.key, -1)} className="w-8 h-8 flex items-center justify-center text-ink hover:bg-sand rounded-l-full transition-colors">
                          <Icon name="minus" size={14} />
                        </button>
                        <span className="w-7 text-center text-sm tabular-nums">{l.qty}</span>
                        <button onClick={() => onQty(l.key, 1)} className="w-8 h-8 flex items-center justify-center text-ink hover:bg-sand rounded-r-full transition-colors">
                          <Icon name="plus" size={14} />
                        </button>
                      </div>
                      <button onClick={() => onQty(l.key, -l.qty)} className="text-[11px] label text-ink-soft hover:text-ink transition-colors">Odobrať</button>
                    </div>
                  </div>
                </div>
              ))}
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
        )}
      </aside>
    </div>
  );
}
