// Kundenliste mit Suchfeld & Aktionen (Bearbeiten, Löschen)
import React, { useState } from "react";
import { Pencil, Trash2, Search, Users } from "lucide-react";

export default function KundenListe({ customers, onEdit, onDelete, isAdmin }) {
  const [query, setQuery] = useState("");

  // Alphabetisch sortieren
  const sortedCustomers = [...customers].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // Filter basierend auf Name oder E-Mail
  const filteredCustomers = sortedCustomers.filter((c) =>
    (c.name && c.name.toLowerCase().startsWith(query.trim().toLowerCase())) ||
    (c.email && c.email.toLowerCase().startsWith(query.trim().toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* 🔍 Suchfeld */}
      <div className="relative">
        <Search className="absolute top-2.5 left-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="🔍 Kunden suchen..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* 👥 Ergebnis anzeigen */}
      {filteredCustomers.length === 0 ? (
        <div className="text-center text-gray-400 py-10">
          <Users className="mx-auto mb-2" size={32} />
          <p className="italic">Keine Kunden gefunden.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredCustomers.map((customer) => (
            <div
              key={customer._id}
              className="p-4 bg-white rounded-2xl shadow-md flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 transition-all hover:shadow-lg hover:scale-[1.01]"
            >
              {/* Kunde anzeigen */}
              <div className="text-center sm:text-left">
                <p className="font-semibold text-lg text-gray-800">{customer.name}</p>
                <p className="text-gray-500 text-sm">{customer.email}</p>
              </div>

              {/* Bearbeiten & Löschen */}
              <div className="flex justify-center sm:justify-end gap-2">
                <button
                  onClick={() => onEdit(customer)}
                  className="px-3 py-1 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 flex items-center gap-1 transition"
                >
                  <Pencil size={16} />
                  Bearbeiten
                </button>
                {isAdmin && (
                  <button
                    onClick={() => onDelete(customer._id)}
                    className="px-3 py-1 bg-rose-500 text-white rounded-full hover:bg-rose-600 flex items-center gap-1 transition"
                  >
                    <Trash2 size={16} />
                    Löschen
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
