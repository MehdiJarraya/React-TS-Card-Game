module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // define font family utility classes ('courier-prime' and 'alfa-slab-one')
        'courier-prime': "'Courier Prime', 'sans-serif'",
        'alfa-slab-one': "'Alfa Slab One', cursive",
      },
      colors: {
        primary: '#EFCE4B',
      },
    },
  },
  plugins: [],
};
