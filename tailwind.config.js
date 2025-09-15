/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        tertiary: "#D8D9FC",
        accent: "#F59E0B",
        primaryText: "#2C3E56",
        secondaryText: "#4C5D75",
        background: "#F9FAFB",
        secondaryBackground: "#E5E7EB",
        borderColor: "#9CA3AF",
      },
      boxShadow: {
        primaryShadow: '0 4px 6px rgba(79, 70, 229, 0.4)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'heading-3': ['24px', { lineHeight: '32px' }],
      },
    },
  },
  plugins: [],
}
