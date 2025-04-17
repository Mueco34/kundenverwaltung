const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

// 🔌 MongoDB verbinden
mongoose.connect("mongodb://localhost:27017/kunden");

// 🧾 MongoDB Modell
const Kunde = mongoose.model("Kunde", {
  name: String,
  email: String,
});

// 📩 Email-Route
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
    await transporter.sendMail({
      from: "sportless.bot@gmail.com",
      to,
      subject,
      text,
      html,
    });
    res.json({ success: true });
  } catch (err) {
    console.error("Email-Fehler:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 📦 Kunden abrufen
app.get("/api/kunden", async (req, res) => {
  const kunden = await Kunde.find();
  res.json(kunden);
});

// 🧪 Test-Route (optional)
app.get("/api/test", (req, res) => {
  res.send("✅ Test erfolgreich – Backend läuft!");
});

// 🚀 Server starten
app.listen(5000, () => {
  console.log("✅ Server läuft auf http://localhost:5000");
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
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f7f7f7;">
          <div style="max-width: 600px; margin: auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            <div style="background-color: #4f46e5; padding: 20px; color: white; text-align: center;">
              <h2 style="margin: 0;">Sportless – Willkommen!</h2>
            </div>
            <div style="padding: 30px;">
              <p style="font-size: 16px;">Hallo ${kunde.name} 👋</p>
              <p style="font-size: 16px;">Schön, dass du dich bei <strong>Sportless</strong> registriert hast!</p>
              <p style="font-size: 16px;">Du kannst jetzt alle Vorteile unserer Plattform nutzen – viel Spaß! 🎉</p>
              <a href="http://localhost:3000" style="display:inline-block; margin-top:20px; padding:10px 20px; background-color:#4f46e5; color:white; text-decoration:none; border-radius:4px;">Jetzt loslegen</a>
            </div>
            <div style="background-color: #f0f0f0; padding: 10px; text-align: center; font-size: 12px; color: #777;">
              © 2025 Sportless · Du erhältst diese E-Mail, weil du dich registriert hast.
            </div>
          </div>
        </div>
      `;

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
    console.error("Fehler beim Versenden:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Neuen Kunden speichern
app.post("/api/kunden", async (req, res) => {
  try {
    const neuerKunde = new Kunde(req.body);
    const gespeichert = await neuerKunde.save();
    res.json(gespeichert);
  } catch (err) {
    console.error("Fehler beim Hinzufügen:", err);
    res.status(500).json({ error: "Fehler beim Hinzufügen" });
  }
});

// Kunden aktualisieren
app.put("/api/kunden/:id", async (req, res) => {
  try {
    const kunde = await Kunde.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!kunde) return res.status(404).send("Kunde nicht gefunden");
    res.json(kunde);
  } catch (err) {
    console.error("Fehler beim Aktualisieren:", err);
    res.status(500).json({ error: "Fehler beim Aktualisieren" });
  }
});

// Kunden löschen
app.delete("/api/kunden/:id", async (req, res) => {
  try {
    const result = await Kunde.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send("Kunde nicht gefunden");
    res.json({ success: true });
  } catch (err) {
    console.error("Fehler beim Löschen:", err);
    res.status(500).json({ error: "Fehler beim Löschen" });
  }
});
