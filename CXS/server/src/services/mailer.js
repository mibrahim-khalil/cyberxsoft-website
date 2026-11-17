/*
 * CyberX Soft — contact-form email
 *
 * Sends two messages for every enquiry that was saved:
 *   1. a notification to the CyberX Soft team (Reply-To = the visitor)
 *   2. an optional acknowledgement to the visitor
 *
 * Everything is configured through environment variables, so any SMTP
 * provider works (Contabo mail, Google Workspace, Zoho, cPanel, SendGrid…).
 * If SMTP is not configured the functions return { status: "skipped" } and
 * the enquiry is still stored — email can never break the contact form.
 */

const nodemailer = require("nodemailer");

const serviceLabels = {
  "brand-strategy-digital-growth": "Brand Strategy & Digital Growth",
  "creative-media-design-animation": "Creative Media, Design & Animation",
  "ai-software-digital-solutions": "AI, Software & Digital Solutions",
  "data-cybersecurity-digital-governance": "Data, Cybersecurity & Digital Governance",
  "talent-augmentation-delivery-support": "Staff Augmentation & Delivery Support",
  "not-sure-yet": "Not sure yet",
};

const contactMethodLabels = {
  "": "No preference",
  email: "Email",
  phone: "Phone call",
  whatsapp: "WhatsApp",
};

/* ---------- configuration ---------- */

const isTrue = (value, fallback = false) => {
  if (value === undefined || value === "") return fallback;
  return ["1", "true", "yes", "on"].includes(String(value).toLowerCase());
};

const getConfig = () => {
  const port = Number(process.env.SMTP_PORT) || 465;

  return {
    host: process.env.SMTP_HOST,
    port,
    // Port 465 is implicit TLS; 587 / 25 use STARTTLS.
    secure: isTrue(process.env.SMTP_SECURE, port === 465),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to: (process.env.CONTACT_TO || process.env.SMTP_USER || "")
      .split(",")
      .map((address) => address.trim())
      .filter(Boolean),
    autoReply: isTrue(process.env.CONTACT_AUTOREPLY, true),
    // Only for self-signed or internal servers.
    rejectUnauthorized: isTrue(process.env.SMTP_TLS_REJECT_UNAUTHORIZED, true),
    requireTls: isTrue(process.env.SMTP_REQUIRE_TLS, false),
  };
};

const isMailConfigured = () => {
  const config = getConfig();
  return Boolean(config.host && config.from && config.to.length > 0);
};

let cachedTransporter = null;
let cachedKey = "";

const getTransporter = () => {
  const config = getConfig();
  const key = [config.host, config.port, config.secure, config.user].join("|");

  if (cachedTransporter && key === cachedKey) return cachedTransporter;

  cachedTransporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    requireTLS: config.requireTls,
    auth: config.user ? { user: config.user, pass: config.pass } : undefined,
    tls: { rejectUnauthorized: config.rejectUnauthorized },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
  cachedKey = key;

  return cachedTransporter;
};

/* ---------- helpers ---------- */

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Remove CR/LF so visitor input can never inject mail headers.
const oneLine = (value) => String(value ?? "").replace(/[\r\n]+/g, " ").trim();

const nl2br = (value) => escapeHtml(value).replace(/\r?\n/g, "<br>");

const formatDate = (date) =>
  new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Karachi",
  }).format(date || new Date());

const shell = (title, inner) => `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#eef2f8;font-family:Arial,Helvetica,sans-serif;color:#0b1f45;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef2f8;padding:32px 12px;">
      <tr><td align="center">
        <table role="presentation" width="620" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;">
          <tr>
            <td style="background:#071329;padding:26px 32px;">
              <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#52e08f;font-weight:bold;">CyberX Soft</div>
              <div style="margin-top:8px;font-size:22px;line-height:1.3;color:#ffffff;font-weight:bold;">${escapeHtml(title)}</div>
            </td>
          </tr>
          <tr><td style="padding:30px 32px;font-size:15px;line-height:1.6;">${inner}</td></tr>
          <tr>
            <td style="padding:18px 32px;background:#f5f8fc;font-size:12px;color:#6b7a96;">
              CyberX Soft · cyberxsoft.net
            </td>
          </tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;

const row = (label, value) => `
  <tr>
    <td style="padding:10px 0;width:170px;vertical-align:top;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#6b7a96;border-bottom:1px solid #e4eaf3;">${escapeHtml(label)}</td>
    <td style="padding:10px 0;vertical-align:top;border-bottom:1px solid #e4eaf3;">${value}</td>
  </tr>`;

/* ---------- message builders ---------- */

const buildNotification = (enquiry, config) => {
  const service = serviceLabels[enquiry.service] || "Not specified";
  const method = contactMethodLabels[enquiry.preferredContactMethod] ?? "No preference";
  const subject = oneLine(`New website enquiry — ${enquiry.fullName} (${service})`);

  const html = shell(
    "New website enquiry",
    `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row("Name", escapeHtml(enquiry.fullName))}
      ${row("Work email", `<a href="mailto:${escapeHtml(enquiry.workEmail)}" style="color:#1b7fd0;">${escapeHtml(enquiry.workEmail)}</a>`)}
      ${row("Company", escapeHtml(enquiry.company || "—"))}
      ${row("Phone / WhatsApp", escapeHtml(enquiry.phone || "—"))}
      ${row("Service", escapeHtml(service))}
      ${row("Preferred contact", escapeHtml(method))}
      ${row("Received", escapeHtml(formatDate(enquiry.createdAt)))}
    </table>
    <div style="margin-top:24px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#6b7a96;">Message</div>
    <div style="margin-top:8px;padding:18px 20px;background:#f5f8fc;border-left:3px solid #2fc475;border-radius:6px;">${nl2br(enquiry.message)}</div>
    <p style="margin:24px 0 0;font-size:13px;color:#6b7a96;">
      Reply to this email to answer ${escapeHtml(enquiry.fullName)} directly.
      The enquiry is also stored in the database${enquiry._id ? ` (id ${escapeHtml(String(enquiry._id))})` : ""}.
    </p>`,
  );

  const text = [
    "New website enquiry",
    "",
    `Name: ${enquiry.fullName}`,
    `Work email: ${enquiry.workEmail}`,
    `Company: ${enquiry.company || "-"}`,
    `Phone / WhatsApp: ${enquiry.phone || "-"}`,
    `Service: ${service}`,
    `Preferred contact: ${method}`,
    `Received: ${formatDate(enquiry.createdAt)}`,
    "",
    "Message:",
    enquiry.message,
    "",
    "Reply to this email to answer the sender directly.",
  ].join("\n");

  return {
    from: config.from,
    to: config.to,
    replyTo: { name: oneLine(enquiry.fullName), address: enquiry.workEmail },
    subject,
    text,
    html,
  };
};

const buildAutoReply = (enquiry, config) => {
  const firstName = oneLine(enquiry.fullName).split(" ")[0] || "there";
  const subject = "We have received your enquiry — CyberX Soft";

  const html = shell(
    "Thank you for contacting CyberX Soft",
    `
    <p style="margin:0 0 16px;">Dear ${escapeHtml(firstName)},</p>
    <p style="margin:0 0 16px;">Thank you for getting in touch. We have received your enquiry and a member of our team will contact you using the details you provided. We aim to respond within one business day.</p>
    <div style="margin:22px 0 6px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#6b7a96;">Your message</div>
    <div style="padding:16px 18px;background:#f5f8fc;border-left:3px solid #2fc475;border-radius:6px;font-size:14px;">${nl2br(enquiry.message)}</div>
    <p style="margin:24px 0 0;">If you would like to add anything, simply reply to this email.</p>
    <p style="margin:24px 0 0;">Kind regards,<br><strong>CyberX Soft</strong></p>`,
  );

  const text = [
    `Dear ${firstName},`,
    "",
    "Thank you for getting in touch. We have received your enquiry and a member of our team will contact you using the details you provided. We aim to respond within one business day.",
    "",
    "Your message:",
    enquiry.message,
    "",
    "If you would like to add anything, simply reply to this email.",
    "",
    "Kind regards,",
    "CyberX Soft",
  ].join("\n");

  return {
    from: config.from,
    to: enquiry.workEmail,
    replyTo: config.to[0],
    subject,
    text,
    html,
    // Marks the message as automatic so mail servers do not auto-reply to it.
    headers: { "Auto-Submitted": "auto-replied", "X-Auto-Response-Suppress": "All" },
  };
};

/* ---------- public API ---------- */

/**
 * Sends the team notification and (optionally) the visitor acknowledgement.
 * Never throws. Resolves to { status: "sent" | "partial" | "failed" | "skipped", error? }.
 */
const sendEnquiryEmails = async (enquiry) => {
  if (!isMailConfigured()) {
    return { status: "skipped", error: "SMTP is not configured." };
  }

  const config = getConfig();
  const transporter = getTransporter();

  // The team notification is the one that matters.
  try {
    await transporter.sendMail(buildNotification(enquiry, config));
  } catch (error) {
    return { status: "failed", error: error.message };
  }

  if (!config.autoReply) return { status: "sent" };

  try {
    await transporter.sendMail(buildAutoReply(enquiry, config));
    return { status: "sent" };
  } catch (error) {
    // Team was notified; only the acknowledgement failed.
    return { status: "partial", error: `Auto-reply failed: ${error.message}` };
  }
};

/** Verifies SMTP credentials (used by scripts/test-mail.js). */
const verifyMailConnection = async () => {
  if (!isMailConfigured()) {
    throw new Error("SMTP is not configured. Set SMTP_HOST, MAIL_FROM and CONTACT_TO.");
  }
  await getTransporter().verify();
};

module.exports = {
  sendEnquiryEmails,
  verifyMailConnection,
  isMailConfigured,
  getConfig,
  buildNotification,
  buildAutoReply,
};
