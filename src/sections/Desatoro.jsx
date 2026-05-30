import { Reveal } from '../lib';

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
  { q: 'Čo ty a skromnosť?', s: 'Chceš viac. Ale potrebuješ?' },
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
                <span className="font-display text-3xl sm:text-4xl text-gold/80 tabular-nums shrink-0 w-11">
                  {String(i + 1).padStart(2, '0')}
                </span>
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
