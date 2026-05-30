import { Icon, Reveal } from '../lib';

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
