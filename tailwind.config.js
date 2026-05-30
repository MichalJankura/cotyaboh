/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bone:   '#F2EBDD',
        paper:  '#FBF7EF',
        sand:   '#E4D8C3',
        clay:   '#D8C9AE',
        ink:    '#26221E',
        'ink-soft': '#6E6557',
        line:   '#D9CDB6',
        gold:   '#9C7A3C',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:  ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        label: ['"Jost"', 'system-ui', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      maxWidth: { 
        shell: '1320px',
      },
    },
  },
  safelist: [
    // All text color combinations
    { pattern: /^text-(bone|paper|sand|clay|ink|ink-soft|line|gold)/ },
    { pattern: /^bg-(bone|paper|sand|clay|ink|ink-soft|line|gold)/ },
    { pattern: /^border-(bone|paper|sand|clay|ink|ink-soft|line|gold)/ },
    // Opacity variants
    { pattern: /^(text|bg|border)-(bone|paper|sand|clay|ink|ink-soft|line|gold)\/(50|45|40|30|15)/ },
    // Spacing
    { pattern: /^(p|px|py|m|mx|my|gap|mb|mt|ml|mr|pt|pb|pl|pr)-(1|2|3|4|5|6|7|8|9|10)/ },
    { pattern: /^(w|h|min-w|min-h|max-w|max-h)-(full|screen|10|20|24)/ },
    // Display
    'block', 'inline-block', 'inline', 'flex', 'inline-flex', 'grid', 'contents', 'hidden',
    'absolute', 'relative', 'fixed', 'sticky',
    // Text
    'text-left', 'text-center', 'text-right', 'text-justify',
    'uppercase', 'lowercase', 'capitalize',
    // Font
    'font-display', 'font-sans', 'font-serif', 'font-label',
    'font-light', 'font-normal', 'font-medium', 'font-semibold', 'font-bold',
    'italic', 'not-italic',
    // Flex
    'flex-1', 'flex-row', 'flex-col', 'flex-wrap',
    'items-start', 'items-center', 'items-end', 'items-baseline', 'items-stretch',
    'justify-start', 'justify-center', 'justify-end', 'justify-between', 'justify-around', 'justify-evenly',
    // Grid
    'grid-cols-2', 'grid-cols-3', 'grid-cols-4', 'grid-cols-12',
    'md:grid-cols-2', 'md:grid-cols-12', 'lg:grid-cols-3', 'lg:grid-cols-12', 'sm:grid-cols-2',
    'col-span-1', 'col-span-2', 'col-span-3', 'col-span-4', 'col-span-5', 'col-span-6', 'col-span-7',
    'md:col-span-1', 'md:col-span-2', 'md:col-span-5', 'md:col-span-6', 'md:col-span-7', 'md:col-span-12',
    'lg:col-span-4', 'lg:col-span-5', 'lg:col-span-6', 'lg:col-span-7',
    // Borders
    'border', 'border-t', 'border-b', 'border-l', 'border-r', 'border-x', 'border-y',
    'rounded', 'rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-full',
    'rounded-t-sm', 'rounded-b-sm', 'rounded-l-full', 'rounded-r-full',
    // Shadows
    'shadow-xl', 'shadow-2xl', 'shadow-none',
    // Hover/Transitions
    'hover:text-bone', 'hover:text-ink', 'hover:bg-ink-soft', 'hover:bg-sand', 'hover:scale-110', 'hover:opacity-100', 'hover:rotate-90', 'hover:-translate-y-0.5', 'hover:translate-x-1', 'hover:gap-2.5', 'hover:text-gold',
    'transition-all', 'transition-colors', 'transition-opacity', 'transition-transform',
    'duration-300', 'duration-500', 'duration-700',
    // Overflow
    'overflow-hidden', 'overflow-x-hidden', 'overflow-y-auto', 'overflow-visible',
    // Whitespace/Text
    'whitespace-nowrap', 'whitespace-normal',
    'truncate', 'break-words',
    // Cursor
    'cursor-pointer',
    // Z-index
    'z-40', 'z-50',
    // Opacity/Visibility
    'opacity-0', 'opacity-100', 'opacity-50', 'opacity-60', 'opacity-70', 'opacity-80', 'opacity-90',
    'visible', 'invisible',
    // Order
    'order-1', 'order-2',
    'md:order-1', 'md:order-2', 'lg:order-1', 'lg:order-2',
    // Display helpers
    'hidden', 'sm:hidden', 'md:hidden', 'lg:hidden',
    'block', 'sm:block', 'md:block', 'lg:block',
    'flex', 'sm:flex', 'md:flex', 'lg:flex',
    'inline-flex', 'md:inline-flex', 'sm:inline-flex',
  ],
  plugins: [],
};
