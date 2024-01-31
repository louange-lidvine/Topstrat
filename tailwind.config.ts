/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                blue: {
                  default: '#0B6C79',
                },
                orange:{
                  default:'#FBBC05',
                },
          },
        },
    },
    plugins: [],
};
