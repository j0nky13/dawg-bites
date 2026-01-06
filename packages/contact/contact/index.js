import nodemailer from "nodemailer";

export async function main(args) {
  const headers = {
    "Access-Control-Allow-Origin": "https://dawgbiteschs.com",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // Handle CORS preflight
  if (args.__ow_method === "options") {
    return {
      statusCode: 204,
      headers,
    };
  }

  let data;
  try {
    data =
      typeof args.body === "string"
        ? JSON.parse(args.body)
        : args.body || args;
  } catch {
    return {
      statusCode: 400,
      headers,
      body: { error: "Invalid JSON body" },
    };
  }

  const { name, company, email, phone, date, message } = data;

  if (!name || !company || (!email && !phone) || !message) {
    return {
      statusCode: 400,
      headers,
      body: { error: "Missing required fields" },
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
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    return {
      statusCode: 200,
      headers,
      body: { success: true },
    };
  } catch (err) {
    console.error("Email error:", err);
    return {
      statusCode: 500,
      headers,
      body: { error: "Failed to send email" },
    };
  }
}