import { Reveal, useParallax } from '../lib';

export function ONas() {
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
