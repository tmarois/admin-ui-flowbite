module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./node_modules/flowbite.{js,ts}",
    // "./node_modules/flowbite/**/*.{js,ts}"
  ],
  safelist: [
    // 'w-64',
    // 'w-1/2',
    // 'rounded-l-lg',
    // 'rounded-r-lg',
    // 'bg-gray-900',
    // 'grid-cols-4',
    // 'grid-cols-7',
    // 'h-6',
    // 'leading-6',
    // 'h-9',
    // 'leading-9',
    // 'shadow-lg',
    // 'fixed',
    // 'inset-0',
    // 'z-40',
    // 'z-30',
    // 'bg-gray-900',
    // 'bg-opacity-50',
    // 'bg-opacity-80',
    // '[type=\'checkbox\']'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto"],
      },
    },
  },
  plugins: [
    require('flowbite'),
    require('@tailwindcss/forms')
  ],
}