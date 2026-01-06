import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();

app.use(cors());
app.use(express.json());

/* ===========================
   SMTP CONFIG (GMAIL)
=========================== */

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER, // dawgbites2025@gmail.com
    pass: process.env.EMAIL_PASS, // app password
  },
});

/* ===========================
   CONTACT FORM ROUTE
=========================== */

app.post("/api/contact", async (req, res) => {
  const {
    name,
    company,
    email,
    phone,
    date,
    message,
  } = req.body;

  if (!name || !company || (!email && !phone) || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await transporter.sendMail({
      from: `"Dawg Bites Website" <${process.env.EMAIL_USER}>`,
      to: "dawgbites2025@gmail.com",
      replyTo: email || undefined,
      subject: `New Dawg Bites Event Request — ${company}`,
      html: `
        <h2>New Event Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Email:</strong> ${email || "N/A"}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Preferred Date:</strong> ${date || "Not specified"}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});