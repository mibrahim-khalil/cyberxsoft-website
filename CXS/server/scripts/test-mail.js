/*
 * Checks the SMTP settings in server/.env and sends a real test email.
 *
 *   node scripts/test-mail.js                 -> verify the connection only
 *   node scripts/test-mail.js you@company.com -> also send both emails to that address
 *
 * It never touches the database.
 */

require("dotenv").config();

const {
  getConfig,
  isMailConfigured,
  sendEnquiryEmails,
  verifyMailConnection,
} = require("../src/services/mailer");

const run = async () => {
  const target = process.argv[2];
  const config = getConfig();

  console.log("SMTP host      :", config.host || "(not set)");
  console.log("SMTP port      :", config.port, config.secure ? "(TLS)" : "(STARTTLS / plain)");
  console.log("SMTP user      :", config.user || "(none)");
  console.log("From           :", config.from || "(not set)");
  console.log("Team inbox     :", config.to.join(", ") || "(not set)");
  console.log("Auto-reply     :", config.autoReply ? "on" : "off");
  console.log("");

  if (!isMailConfigured()) {
    console.error("SMTP is not configured. Set SMTP_HOST, MAIL_FROM and CONTACT_TO in .env.");
    process.exit(1);
  }

  await verifyMailConnection();
  console.log("OK: connected and authenticated with the mail server.");

  if (!target) {
    console.log("Tip: run `node scripts/test-mail.js your@email.com` to send a test enquiry.");
    return;
  }

  // Send the team notification to the team inbox and the auto-reply to `target`.
  const result = await sendEnquiryEmails({
    _id: "test-enquiry",
    fullName: "Test Visitor",
    workEmail: target,
    company: "Test Company",
    phone: "+92 300 0000000",
    service: "ai-software-digital-solutions",
    preferredContactMethod: "email",
    message:
      "This is a test enquiry sent by scripts/test-mail.js.\nIf you can read this, email from the contact form is working.",
    createdAt: new Date(),
  });

  console.log("Result:", result.status, result.error || "");
  if (result.status === "sent") {
    console.log(`Check ${config.to.join(", ")} for the team notification and ${target} for the acknowledgement.`);
  }
  if (result.status !== "sent") process.exit(1);
};

run().catch((error) => {
  console.error("Mail test failed:", error.message);
  process.exit(1);
});
