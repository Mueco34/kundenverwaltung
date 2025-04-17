// Einstiegspunkt der React-Anwendung
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Tailwind & globale Styles
import App from './App';

// Root-Element der App
const root = ReactDOM.createRoot(document.getElementById('root'));

// App wird in den DOM gerendert
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
