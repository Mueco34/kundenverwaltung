import React from "react";
import { LogOut, Mail } from "lucide-react";

/**
 * Wiederverwendbare Sidebar-Komponente
 * - Zeigt Benutzerinfo
 * - Admins sehen Massenmail-Button
 * - Logout möglich
 */
export default function Sidebar({ user, onLogout, onMassEmail }) {
  return (
    <aside className="w-64 bg-white shadow-md p-6 space-y-6">
      <h1 className="text-2xl font-bold text-indigo-600">🏢 Sportless CRM</h1>

      {/* Benutzerinfo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-sm">{user.username}</p>
          <p className="text-xs text-gray-500 capitalize">{user.role}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-3">
        {user.role === "admin" && (
          <button
            onClick={onMassEmail}
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
  );
}
