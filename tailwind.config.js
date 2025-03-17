/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        colors: {
          dark: "#1a1a1a", // Define a custom "dark" color
        },
      },
    },
    plugins: [require("tailwindcss-animate")], // Ensure plugins are loaded
  };

  




  