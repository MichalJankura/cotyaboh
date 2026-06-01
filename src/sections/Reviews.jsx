import { useState, useEffect } from 'react';
import { Icon, Reveal } from '../lib';

const REVIEWS = [
  {
    id: 1,
    name: 'John Doe',
    handle: '@john.doe',
    avatar: null,
    initials: 'JD',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 2,
    name: 'John Doe',
    handle: '@john.doe',
    avatar: null,
    initials: 'JD',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 3,
    name: 'John Doe',
    handle: '@john.doe',
    avatar: null,
    initials: 'JD',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 4,
    name: 'John Doe',
    handle: '@john.doe',
    avatar: null,
    initials: 'JD',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 5,
    name: 'John Doe',
    handle: '@john.doe',
    avatar: null,
    initials: 'JD',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];

export function Reviews() {
  const [current, setCurrent] = useState(0);

  const go = (next) => setCurrent((next + REVIEWS.length) % REVIEWS.length);
  const prev = () => go(current - 1);
  const next = () => go(current + 1);

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % REVIEWS.length), 5500);
    return () => clearInterval(id);
  }, [current]);

  const r = REVIEWS[current];

  return (
    <section className="py-24 sm:py-32 bg-bone border-t border-line/60 overflow-hidden">
      <div className="max-w-shell mx-auto px-5 sm:px-8">

        <Reveal>
          <div className="text-center mb-16">
            <p className="label text-[11px] text-gold mb-5">Recenzie</p>
            <h2 className="font-display text-ink text-[clamp(2.4rem,5vw,4rem)] leading-[1.02]">
              Čo hovoria <span className="ital">ostatní</span>
            </h2>
          </div>
        </Reveal>

        <div className="relative max-w-2xl mx-auto">
          {/* Decorative quote glyph */}
          <span
            aria-hidden="true"
            className="absolute -top-6 left-1/2 -translate-x-1/2 font-display text-[9rem] leading-none select-none pointer-events-none"
            style={{ fontStyle: 'italic', color: '#9C7A3C', opacity: 0.13 }}
          >
            &ldquo;
          </span>

          {/* Animated card — key forces re-mount on slide change */}
          <div className="relative" style={{ minHeight: '340px' }}>
            <div
              key={r.id}
              className="w-full flex flex-col items-center text-center px-4 sm:px-14"
              style={{ animation: 'review-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both' }}
            >
              {/* Profile circle */}
              <div
                className="w-16 h-16 rounded-full overflow-hidden border-2 border-line bg-sand flex items-center justify-center mb-4 shrink-0"
                style={{ boxShadow: '0 2px 12px rgba(38,34,30,0.08)' }}
              >
                {r.avatar ? (
                  <img src={r.avatar} alt={r.name} className="w-full h-full object-cover" draggable={false} />
                ) : (
                  <span className="font-display text-xl text-ink-soft select-none">{r.initials}</span>
                )}
              </div>

              {/* Name */}
              <p className="font-display text-[1.25rem] text-ink leading-tight">{r.name}</p>

              {/* Instagram handle */}
              <a
                href={`https://instagram.com/${r.handle.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="label text-[10px] text-gold mt-1.5 hover:text-ink transition-colors duration-300"
              >
                {r.handle}
              </a>

              {/* Review text */}
              <p className="mt-7 font-display ital text-[1.25rem] sm:text-[1.35rem] text-ink/75 leading-[1.65] max-w-lg">
                {r.text}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-7 mt-10">
            <button
              onClick={prev}
              aria-label="Predchádzajúca recenzia"
              className="w-10 h-10 flex items-center justify-center border border-line text-ink-soft hover:border-ink hover:text-ink transition-all duration-300 rounded-[2px]"
            >
              <Icon name="arrowRight" size={15} className="rotate-180" />
            </button>

            {/* Pill dots */}
            <div className="flex items-center gap-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`Recenzia ${i + 1}`}
                  style={{
                    width: i === current ? '28px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: i === current ? '#9C7A3C' : '#D9CDB6',
                    transition: 'width 0.45s cubic-bezier(0.16,1,0.3,1), background 0.3s',
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Nasledujúca recenzia"
              className="w-10 h-10 flex items-center justify-center border border-line text-ink-soft hover:border-ink hover:text-ink transition-all duration-300 rounded-[2px]"
            >
              <Icon name="arrowRight" size={15} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
