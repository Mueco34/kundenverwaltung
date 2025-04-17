// React-Hooks & Komponenten importieren
import { useEffect, useState } from "react";
import Kundenverwaltung from "./Kundenverwaltung";
import Login from "./Login";

// Toastify für Notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // Zustand für den aktuell eingeloggten Benutzer
  const [user, setUser] = useState(null);

  // Beim Start schauen, ob ein Benutzer im LocalStorage ist
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Benutzer-Login: Zustand setzen und speichern
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    toast.success(`👋 Willkommen zurück, ${userData.username}!`);
  };

  // Benutzer-Logout: Zustand löschen und Feedback geben
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.info("👋 Du wurdest ausgeloggt.");
  };

  return (
    <>
      {/* Authentifizierung prüfen: Login oder Kundenverwaltung anzeigen */}
      {user ? (
        <Kundenverwaltung user={user} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}

      {/* Toast-Container für Feedback-Meldungen */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
