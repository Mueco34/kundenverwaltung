// 📦 Imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");

// 🚀 Express-App erstellen
const app = express();
app.use(cors());
app.use(express.json());

// 🔌 MongoDB verbinden (lokal)
mongoose.connect("mongodb://localhost:27017/kunden");

// 📄 Mongoose-Modell für Kunden
const Kunde = mongoose.model("Kunde", {
  name: String,
  email: String,
});

// 📩 Einzelne E-Mail versenden
app.post("/api/email", async (req, res) => {
  const { to, subject, text, html } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sportless.bot@gmail.com",
      pass: "iqhmhvbymyhcjyfq", // App-spezifisches Passwort
    },
  });

  try {
    await transporter.sendMail({ from: "sportless.bot@gmail.com", to, subject, text, html });
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Email-Fehler:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 📥 Alle Kunden abrufen
app.get("/api/kunden", async (req, res) => {
  const kunden = await Kunde.find();
  res.json(kunden);
});

// ✅ Test-Endpoint
app.get("/api/test", (req, res) => {
  res.send("✅ Test erfolgreich – Backend läuft!");
});

// 📩 Massen-E-Mail an alle Kunden
app.post("/api/email/alle", async (req, res) => {
  const kunden = await Kunde.find();

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sportless.bot@gmail.com",
      pass: "iqhmhvbymyhcjyfq",
    },
  });

  try {
    for (let kunde of kunden) {
      const htmlContent = `...`; // 🔧 HTML-E-Mail Template (siehe Original)
      
      await transporter.sendMail({
        from: "sportless.bot@gmail.com",
        to: kunde.email,
        subject: `Hallo ${kunde.name}`,
        text: `Hi ${kunde.name},\n\nwir haben spannende Neuigkeiten für dich!`,
        html: htmlContent,
      });
      console.log(`✅ E-Mail an ${kunde.email} gesendet`);
    }
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Fehler beim Versenden:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ➕ Neuen Kunden anlegen
app.post("/api/kunden", async (req, res) => {
  try {
    const neuerKunde = new Kunde(req.body);
    const gespeichert = await neuerKunde.save();
    res.json(gespeichert);
  } catch (err) {
    console.error("❌ Fehler beim Hinzufügen:", err);
    res.status(500).json({ error: "Fehler beim Hinzufügen" });
  }
});

// ✏️ Kunden aktualisieren
app.put("/api/kunden/:id", async (req, res) => {
  try {
    const kunde = await Kunde.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!kunde) return res.status(404).send("Kunde nicht gefunden");
    res.json(kunde);
  } catch (err) {
    console.error("❌ Fehler beim Aktualisieren:", err);
    res.status(500).json({ error: "Fehler beim Aktualisieren" });
  }
});

// 🗑️ Kunden löschen
app.delete("/api/kunden/:id", async (req, res) => {
  try {
    const result = await Kunde.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send("Kunde nicht gefunden");
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Fehler beim Löschen:", err);
    res.status(500).json({ error: "Fehler beim Löschen" });
  }
});

// 🟢 Server starten
app.listen(5000, () => {
  console.log("✅ Server läuft auf http://localhost:5000");
});
