// API-Anfragen an das Express-Backend
import axios from "axios";

const API_URL = "http://localhost:5000/api";

// 🗃️ Alle Kunden abrufen
export const getKunden = () => axios.get(`${API_URL}/kunden`);

// ➕ Neuen Kunden hinzufügen
export const addKunde = (kunde) => axios.post(`${API_URL}/kunden`, kunde);

// ✏️ Bestehenden Kunden aktualisieren
export const updateKunde = (id, kunde) =>
  axios.put(`${API_URL}/kunden/${id}`, kunde);

// ❌ Kunde löschen
export const deleteKunde = (id) =>
  axios.delete(`${API_URL}/kunden/${id}`);

// 📬 Massen-E-Mail an alle Kunden
export const sendMassEmail = () =>
  axios.post(`${API_URL}/email/alle`);
