/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
    keyframes: {
      'fade-in': {
        from: { opacity: '0' },
        to: { opacity: '1' },
      },
    },
    animation: {
      'fade-in': 'fade-in 1000ms linear',
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
