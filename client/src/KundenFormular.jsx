// Formular zum Hinzufügen oder Bearbeiten eines Kunden
import React, { useState, useEffect } from "react";

export default function KundenFormular({ onAdd, onUpdate, editingCustomer }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Wenn ein Kunde bearbeitet wird, Felder vorausfüllen
  useEffect(() => {
    if (editingCustomer) {
      setName(editingCustomer.name);
      setEmail(editingCustomer.email);
    } else {
      setName("");
      setEmail("");
    }
  }, [editingCustomer]);

  // Email validieren
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Formular abschicken
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !isValidEmail(email)) {
      alert("⚠️ Bitte gültigen Namen und E-Mail eingeben!");
      return;
    }

    setIsSubmitting(true);

    const newCustomer = {
      _id: editingCustomer ? editingCustomer._id : undefined,
      name,
      email,
    };

    try {
      // je nachdem ob Update oder Add
      editingCustomer
        ? await onUpdate(newCustomer)
        : await onAdd(newCustomer);

      // Felder zurücksetzen
      setName("");
      setEmail("");
    } catch {
      // Fehlerhandling wird außerhalb gemacht
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow space-y-4 border border-gray-200"
    >
      <h2 className="text-xl font-bold mb-2 text-indigo-700">
        {editingCustomer ? "🛠️ Kunde bearbeiten" : "➕ Neuen Kunden hinzufügen"}
      </h2>

      {/* Name */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">Name</label>
        <input
          type="text"
          placeholder="Firmenname"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">E-Mail-Adresse</label>
        <input
          type="email"
          placeholder="E-Mail-Adresse"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Submit-Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 text-white rounded ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {isSubmitting
          ? "⏳ Wird gespeichert..."
          : editingCustomer
          ? "💾 Speichern"
          : "➕ Hinzufügen"}
      </button>
    </form>
  );
}
