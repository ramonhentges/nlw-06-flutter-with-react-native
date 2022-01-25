module.exports = {
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        primary: '#FF941A',
        secondary: '#585666',
        grey: '#585666',
        delete: '#E83F5B',
        heading: '#585666',
        body: '#706E7A',
        stroke: '#E3E3E6',
        shape: '#FAFAFC',
        background: '#FFFFFF',
        input: '#B1B0B8',
      },
      fontFamily: {
        inter: ['Inter'],
        lexend: ['LexendDeca'],
      },
      fontSize: {
        32: ['32px'],
        20: ['20px'],
        17: ['17px'],
        16: ['16px'],
        15: ['15px'],
        13: ['13px'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  content: ['./src/**/*.{js,ts,tsx}'],
};
