module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      'sm': { min: '0px', max: '640px' },
      'md': { min: '641px', max: '768px' },
      'lg': { min: '769px', max: '1024px' },
      'xl': { min: '1025px', max: '1280px' },
      '2xl': { min: '1281px', max: '1536px' },
    },
    menuBtnSize: {
      btn:
        `2xl:h-[11rem] 2xl:w-[11rem]
      xl:h-[10rem] xl:w-[10rem] xl:m-1
      lg:h-[10rem] lg:w-[10rem] lg:m-1
      md:h-[10rem] md:w-[10rem] md:m-1
      sm:h-[10rem] sm:w-[10rem] sm:m-1`
    },
  }
}

