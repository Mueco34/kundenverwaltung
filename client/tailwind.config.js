/**
 * Tailwind CSS Konfigurationsdatei
 *
 * ✔ Definiert, welche Dateien Tailwind nach Klassen durchsuchen soll (./src/**)
 * ✔ Ermöglicht die Erweiterung des Themes (z. B. Farben, Schriftarten etc.)
 * ✔ Kann bei Bedarf um Plugins oder Customizations erweitert werden
 */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
