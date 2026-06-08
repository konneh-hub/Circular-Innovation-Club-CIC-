export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        'primary-dark': '#1d4ed8',
      },
      boxShadow: {
        soft: '0 20px 40px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
}
