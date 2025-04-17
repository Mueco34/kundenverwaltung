// React-Hooks & Komponenten importieren
import React, { useState, useEffect } from "react";
import KundenFormular from "./KundenFormular";
import KundenListe from "./KundenListe";

// API-Funktionen & Icons & Toastify
import { getKunden, addKunde, updateKunde, deleteKunde, sendMassEmail } from "./api";
import { LogOut, Mail, Users } from "lucide-react";
import { toast } from "react-toastify";

/**
 * Hauptkomponente für die Kundenverwaltung
 * - Zeigt Kundenliste
 * - Ermöglicht Hinzufügen, Bearbeiten, Löschen von Kunden
 * - Admins können Massen-E-Mails verschicken
 */
export default function Kundenverwaltung({ user, onLogout }) {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Kunden beim Laden der Komponente holen
  useEffect(() => {
    getKunden()
      .then((res) => setCustomers(res.data))
      .catch(() => toast.error("❌ Fehler beim Laden der Kunden"));
  }, []);

  const handleAdd = async (newCustomer) => {
    try {
      const res = await addKunde(newCustomer);
      setCustomers([...customers, res.data]);
      toast.success("✅ Neuer Kunde hinzugefügt!");
    } catch {
      toast.error("❌ Fehler beim Hinzufügen");
    }
  };

  const handleUpdate = async (updatedCustomer) => {
    try {
      const res = await updateKunde(updatedCustomer._id, updatedCustomer);
      setCustomers(customers.map((c) => (c._id === updatedCustomer._id ? res.data : c)));
      setSelectedCustomer(null);
      toast.success("💾 Kunde erfolgreich aktualisiert!");
    } catch {
      toast.error("❌ Fehler beim Aktualisieren");
    }
  };

  const handleDelete = async (id) => {
    if (user.role !== "admin") return;
    if (window.confirm("Wirklich löschen?")) {
      try {
        await deleteKunde(id);
        setCustomers(customers.filter((c) => c._id !== id));
        toast.success("🗑️ Kunde gelöscht!");
      } catch {
        toast.error("❌ Fehler beim Löschen");
      }
    }
  };

  const handleEdit = (customer) => setSelectedCustomer(customer);

  const handleMassEmail = async () => {
    if (window.confirm("Willst du wirklich alle Kunden benachrichtigen?")) {
      try {
        await sendMassEmail();
        toast.success("📬 Massen-E-Mails wurden gesendet!");
      } catch (err) {
        toast.error("❌ Fehler beim Senden: " + err.message);
      }
    }
  };

  // JSX-Struktur für UI
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-indigo-600">🏢 Sportless CRM</h1>
        <div className="text-gray-600 text-sm">
          Eingeloggt als <strong>{user.name}</strong> ({user.role})
        </div>
        <nav className="space-y-3">
          {user.role === "admin" && (
            <button
              onClick={handleMassEmail}
              className="w-full flex items-center gap-2 px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
            >
              <Mail size={16} /> Massenmail
            </button>
          )}
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            <LogOut size={16} /> Logout
          </button>
        </nav>
      </aside>

      {/* Hauptbereich */}
      <main className="flex-1 p-10 space-y-6">
        <div className="flex items-center gap-2 text-xl font-semibold text-indigo-700">
          <Users size={24} /> Kundenverwaltung
        </div>

        {/* Kundenformular (Add / Edit) */}
        <KundenFormular
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          editingCustomer={selectedCustomer}
        />

        {/* Kundenliste (Tabelle mit Aktionen) */}
        <KundenListe
          customers={customers}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isAdmin={user.role === "admin"}
        />
      </main>
    </div>
  );
}
