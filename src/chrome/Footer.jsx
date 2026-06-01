import { Icon, Reveal } from '../lib';

const IG_URL = 'https://www.instagram.com/cotyaboh/';

export function Footer() {
  return (
    <footer id="kontakt" className="bg-ink text-bone pt-16 pb-10">
      <div className="max-w-shell mx-auto px-5 sm:px-8">
        <div className="pb-12 border-b border-bone/15 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
          <Reveal>
            <h3 className="font-display text-3xl sm:text-4xl leading-[1.1] max-w-sm">
              Pridajte sa k tým, <span className="ital text-gold">ktorí sa pýtajú.</span>
            </h3>
          </Reveal>
          <Reveal delay={120}>
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 label text-[11px] text-bone border border-bone/30 px-6 py-3 hover:border-bone transition-colors whitespace-nowrap"
            >
              <Icon name="instagram" size={15} /> Sledovať na Instagrame
            </a>
          </Reveal>
        </div>

        <div className="pt-10 flex flex-col-reverse md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-bone/40 font-sans">© {new Date().getFullYear()} Čo ty a Boh? — ručne tvorené s úmyslom.</p>
          <span className="font-display ital text-lg text-bone/70">Čo ty a Boh?</span>
          <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="label text-[11px] text-bone/50 hover:text-bone transition-colors inline-flex items-center gap-2">
            <Icon name="instagram" size={16} /> @cotyaboh
          </a>
        </div>
      </div>
    </footer>
  );
}
