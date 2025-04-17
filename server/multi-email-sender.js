const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

// 🔌 Verbindung zur Datenbank
mongoose.connect("mongodb://localhost:27017/kunden");

// 📄 Kundenmodell
const Kunde = mongoose.model("Kunde", {
  name: String,
  email: String,
});

// 📬 Transporter mit Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sportless.bot@gmail.com",
    pass: "iqhmhvbymyhcjyfq", // App-spezifisches Passwort
  },
});

// 📢 E-Mails senden
async function sendeEmailsAnAlle() {
  try {
    const kunden = await Kunde.find();

    for (let kunde of kunden) {
      const mailOptions = {
        from: "sportless.bot@gmail.com",
        to: kunde.email,
        subject: `Hallo ${kunde.name}!`,
        text: `Hi ${kunde.name},\n\nwir haben spannende Neuigkeiten für dich!`,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log(`✅ E-Mail an ${kunde.email} gesendet: ${info.response}`);
    }

    console.log("🎉 Alle Mails versendet!");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Fehler:", err.message);
  }
}

sendeEmailsAnAlle();
