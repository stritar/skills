import { Inter, Outfit, Roboto_Mono } from 'next/font/google';

// The denisstritar.com faces, loaded the way the portfolio loads them
// (lib/fonts.ts in stritar.github.io). The variable names are part of the
// contract: app/styles/tokens.core.css reads --font-outfit, --font-inter and
// --font-roboto-mono. next/font self-hosts the files at build time.

// Outfit, the display face: page titles and the reading column's headings.
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' });

// Inter, the reading face: everything else.
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

// Roboto Mono: code, file names and eyebrow labels.
const robotoMono = Roboto_Mono({ subsets: ['latin'], variable: '--font-roboto-mono', display: 'swap' });

// The font variable classes, for <html>.
export const fontVariables = `${outfit.variable} ${inter.variable} ${robotoMono.variable}`;
