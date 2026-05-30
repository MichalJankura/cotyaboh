import { Icon, Reveal, RevealLines, useParallax, smoothTo } from '../lib';

export function Hero({ onShop }) {
  const imgRef = useParallax(0.08);
  return (
    <section id="hero" className="relative min-h-[100svh] flex items-center pt-28 pb-16 overflow-hidden">
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
