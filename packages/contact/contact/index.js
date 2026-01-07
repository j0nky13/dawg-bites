import nodemailer from "nodemailer";

export async function main(args) {
  // ✅ CORS HEADERS — ALWAYS
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  // ✅ Handle preflight FIRST
  if (args.__ow_method === "options") {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: "",
    };
  }

  // ✅ BODY COMES FROM args.body (DigitalOcean quirk)
  const {
    name,
    company,
    email,
    phone,
    date,
    message,
  } = args.body || {};

  if (!name || !company || (!email && !phone) || !message) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Missing required fields" }),
    };
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

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
        <p><strong>Date:</strong> ${date || "Not specified"}</p>
        <hr />
        <p>${String(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error("Email error:", err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Failed to send email" }),
    };
  }
}