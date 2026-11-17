# Contact-form email — setup

## What happens now

When someone submits the contact form:

1. The enquiry is saved to MongoDB exactly as before (same database, same collection).
2. A notification email goes to your team (`CONTACT_TO`). **Reply-To is the visitor**, so
   pressing Reply answers them directly.
3. Optionally, the visitor receives a short acknowledgement email (`CONTACT_AUTOREPLY`).

Email can never break the form. If the mail server is down or not configured, the enquiry is
still saved and the visitor still sees the success message. Each enquiry gets an `emailStatus`
field (`sent`, `partial`, `failed`, `skipped`) plus `emailError`, so you can see in MongoDB
which ones did not send.

The database connection (`src/config/db.js`) was **not changed**. Existing enquiries are not
touched; two optional fields are simply added to new ones.

Also added: an invisible spam trap on the form. Bots that fill it get a fake success and
nothing is saved or emailed.

## Files in this update

| File | Change |
| --- | --- |
| `server/src/services/mailer.js` | new — sends the emails |
| `server/src/controllers/contactController.js` | sends email after saving, honeypot |
| `server/src/models/ContactEnquiry.js` | two optional fields: `emailStatus`, `emailError` |
| `server/scripts/test-mail.js` | new — checks your SMTP settings |
| `server/package.json` / `package-lock.json` | adds `nodemailer`, `npm run mail:test` |
| `server/.env.example` | lists the new settings |
| `client/src/features/contact/ContactForm.jsx`, `contact.css` | hidden spam-trap field |

## Deploy on the Contabo server

1. Copy the files above over your project (same folders).
2. Install the one new package:
   ```bash
   cd server
   npm install
   ```
3. Add these lines to the server's real `.env` (keep your existing `MONGODB_URI`, `PORT`, `CLIENT_URL`):
   ```
   SMTP_HOST=<your mail server, e.g. mail.cyberxsoft.net>
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=info@cyberxsoft.net
   SMTP_PASS=<that mailbox's password>
   MAIL_FROM="CyberX Soft <info@cyberxsoft.net>"
   CONTACT_TO=info@cyberxsoft.net
   CONTACT_AUTOREPLY=true
   ```
   Use port `587` with `SMTP_SECURE=false` if your provider asks for STARTTLS.
4. Test the mail settings before restarting anything:
   ```bash
   npm run mail:test                      # checks login only
   npm run mail:test -- you@example.com   # sends a real test enquiry
   ```
5. Restart the backend (for example `pm2 restart <app-name>`), then rebuild and upload the
   client so the new form is live.
6. Submit the form on the staging site and confirm the email arrives.

## Things to know

- **Port 25 is blocked on Contabo VPS servers by default.** Use 465 or 587.
- Use a real mailbox on your own domain for `SMTP_USER` and `MAIL_FROM`. For mail to reach
  inboxes rather than spam, the domain should have SPF and DKIM set up with your mail host.
- If you use Gmail or Google Workspace, create an **App Password** and use that as `SMTP_PASS`
  (host `smtp.gmail.com`, port 465).
- Several recipients: `CONTACT_TO=a@cyberxsoft.net,b@cyberxsoft.net`.
- Turn the visitor acknowledgement off with `CONTACT_AUTOREPLY=false`.
