import React, { useState } from "react";
import { Lock, User, Eye, EyeOff, Mail } from "lucide-react"; // Icons für UI
import clsx from "clsx"; // Für dynamische CSS-Klassen

// 🔐 Beispielbenutzer – diese wären in einer echten App in der Datenbank
const defaultUsers = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "max", password: "max123", role: "employee" },
];

export default function Login({ onLogin }) {
  // 🧠 Zustand für Anmelde-/Registriermodus
  const [isRegister, setIsRegister] = useState(false);
  // 🧠 Form-Zustände für Benutzername/Passwort
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // 👁️ Sichtbarkeit des Passwortfelds
  const [showPassword, setShowPassword] = useState(false);
  // 📦 Aktuelle Benutzerliste
  const [users, setUsers] = useState(defaultUsers);
  // 🔁 "Passwort vergessen?"-Modus
  const [showForgot, setShowForgot] = useState(false);
  const [forgotUser, setForgotUser] = useState("");

  // 📤 Login / Registrierung Formular abschicken
  const handleSubmit = (e) => {
    e.preventDefault();

    // ❗ Pflichtfelder prüfen
    if (!username || !password) return alert("⚠️ Alle Felder ausfüllen!");

    if (isRegister) {
      // ✅ Benutzername prüfen – darf nicht doppelt sein
      if (users.find((u) => u.username === username)) {
        return alert("Benutzername existiert bereits!");
      }

      // 👤 Neuen Benutzer hinzufügen
      const newUser = { username, password, role: "employee" };
      setUsers([...users, newUser]);
      alert("✅ Registrierung erfolgreich!");
      setIsRegister(false);
      setUsername("");
      setPassword("");
    } else {
      // 🔐 Login prüfen
      const user = users.find((u) => u.username === username && u.password === password);
      if (!user) return alert("❌ Login fehlgeschlagen!");
      onLogin(user); // 🎉 Erfolgreich eingeloggt
    }
  };

  // 🔁 Passwort-Reset-Logik (nur optisch/dummy)
  const handleReset = () => {
    if (!forgotUser.trim()) return alert("Bitte Benutzername eingeben.");

    const exists = users.find(u => u.username === forgotUser.trim());
    if (exists) {
      alert("📧 Ein Passwort-Reset-Link wurde gesendet (nicht wirklich 😉)");
    } else {
      alert("❌ Benutzer nicht gefunden.");
    }

    setForgotUser("");
    setShowForgot(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-pink-500">
      <div className="bg-white rounded-xl shadow-xl p-8 w-96 space-y-6">
        {/* 🧾 Titel und Beschreibung */}
        <div className="text-center">
          <div className="text-3xl font-bold text-indigo-600">
            {isRegister ? "📝 Registrierung" : "🔐 Login"}
          </div>
          <p className="text-gray-500 text-sm mt-1">
            {isRegister
              ? "Erstelle ein neues Konto"
              : "Bitte einloggen, um fortzufahren"}
          </p>
        </div>

        {/* 🔐 Login- oder Registrierungsformular */}
        {!showForgot ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 👤 Benutzername-Eingabe */}
            <div className="relative">
              <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Benutzername"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* 🔒 Passwort-Eingabe */}
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-400"
              />
              {/* 👁️ Passwort anzeigen/verstecken */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-indigo-600 transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* 📤 Login/Register Button */}
            <button
              type="submit"
              className={clsx(
                "w-full py-2 rounded text-white font-medium transition",
                isRegister ? "bg-green-500 hover:bg-green-600" : "bg-indigo-600 hover:bg-indigo-700"
              )}
            >
              {isRegister ? "Registrieren" : "Anmelden"}
            </button>
          </form>
        ) : (
          // Passwort vergessen Formular
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Benutzername"
                value={forgotUser}
                onChange={(e) => setForgotUser(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <button
              onClick={handleReset}
              className="w-full py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              🔁 Passwort zurücksetzen
            </button>
          </div>
        )}

        {/* Extra Optionen */}
        {!isRegister && !showForgot && (
          <p
            className="text-xs text-center text-blue-600 hover:underline cursor-pointer"
            onClick={() => setShowForgot(true)}
          >
            Passwort vergessen?
          </p>
        )}

        {showForgot && (
          <p
            className="text-xs text-center text-gray-500 hover:underline cursor-pointer"
            onClick={() => setShowForgot(false)}
          >
            ⬅️ Zurück zum Login
          </p>
        )}

        {/* Registrierung wechseln */}
        <p
          className="text-sm text-center text-gray-500 hover:text-gray-800 cursor-pointer"
          onClick={() => {
            setIsRegister(!isRegister);
            setShowForgot(false);
          }}
        >
          {isRegister ? "⬅️ Zurück zum Login" : "Noch kein Konto? Jetzt registrieren →"}
        </p>
      </div>
    </div>
  );
}
