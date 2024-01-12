module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      'sm': { min: '0px', max: '640px' },
      'md': { min: '641px', max: '768px' },
      'lg': { min: '769px', max: '1024px' },
      'xl': { min: '1025px', max: '1280px' },
      '2xl': { min: '1281px', max: '9999px' },
    },
  }
}
