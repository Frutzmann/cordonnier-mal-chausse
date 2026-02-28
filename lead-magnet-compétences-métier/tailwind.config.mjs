/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        purple: {
          DEFAULT: '#9D4F9E',
          light: '#C98BCA',
          dark: '#7A3D7B',
        },
        navy: {
          DEFAULT: '#011638',
          light: '#1A2F52',
        },
        'light-gray': '#EEF0F2',
        'warm-gray': '#D5D7DA',
        'accent-gold': '#D4A843',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
