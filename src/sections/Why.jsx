import { Reveal } from '../lib';

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
