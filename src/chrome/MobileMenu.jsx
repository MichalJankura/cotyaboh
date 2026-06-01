import { Icon, smoothTo } from '../lib';

const NAV = [
  { label: 'O nás', id: 'onas' },
  { label: 'Kolekcia', id: 'kolekcia' },
  { label: 'Shop', id: 'shop' },
  { label: 'Kontakt', id: 'kontakt' },
];

const IG_URL = 'https://www.instagram.com/cotyaboh/';

export function MobileMenu({ open, onClose }) {
  return (
    <div className={'fixed inset-0 z-50 md:hidden transition-all duration-500 ' + (open ? 'visible' : 'invisible')}>
      <div onClick={onClose}
        className={'absolute inset-0 bg-ink/30 transition-opacity duration-500 ' + (open ? 'opacity-100' : 'opacity-0')} />
      <div className={'absolute inset-y-0 left-0 w-[82%] max-w-sm bg-paper shadow-2xl flex flex-col transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] ' + (
        open ? 'translate-x-0' : '-translate-x-full')}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-line">
          <span className="font-display text-lg text-ink">Čo ty a Boh?</span>
          <button onClick={onClose} className="p-1 text-ink" aria-label="Zavrieť">
            <Icon name="x" size={22} />
          </button>
        </div>
        <nav className="flex flex-col px-6 py-8 gap-1">
          {NAV.map((n) =>
            <button key={n.id} onClick={() => { onClose(); setTimeout(() => smoothTo(n.id), 320); }}
              className="font-display text-3xl text-ink py-3 text-left border-b border-line/60">
              {n.label}
            </button>
          )}
        </nav>
        <div className="mt-auto px-6 py-7 border-t border-line">
          <a href={IG_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 label text-[11px] text-ink-soft">
            <Icon name="instagram" size={16} /> @cotyaboh
          </a>
        </div>
      </div>
    </div>
  );
}
