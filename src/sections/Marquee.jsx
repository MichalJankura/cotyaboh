export function Marquee() {
  const words = [
    'merch s myšlienkou', 'evanjelizácia', 'humor', 'hĺbka', 'gen Z + Y', 'čo ty a Boh?',
    'merch s myšlienkou', 'evanjelizácia', 'humor', 'hĺbka', 'gen Z + Y', 'čo ty a Boh?',
  ];
  const run = [...words, ...words];
  return (
    <div className="bg-ink text-bone py-5 overflow-hidden select-none">
      <div className="flex w-max marquee-track">
        {run.map((w, i) =>
          <span key={i} className="flex items-center">
            <span className="font-display ital text-2xl sm:text-3xl px-7 whitespace-nowrap text-bone/90">{w}</span>
            <span className="text-gold">✦</span>
          </span>
        )}
      </div>
    </div>
  );
}
