# CyberX Soft website

Premium redesign of the CyberX Soft marketing site.

- **client/**: React 19 + Vite. Scroll-story Home page, glass UI, smooth scrolling, custom cursor,
  parallax and a lazy-loaded three.js glass scene. Service pages share one template.
- **server/**: Express 5 + MongoDB (Mongoose). `POST /api/contact` saves the enquiry and sends the emails.

## Run locally

```bash
# frontend
cd client
npm install
cp .env.example .env     # optional locally, see "Environment variables"
npm run dev              # http://localhost:5173

# backend (needs server/.env, see server/.env.example)
cd server
npm install
npm run dev              # http://localhost:5000  (type rs + Enter to restart after editing .env)
```

Checks: `cd client && npm run lint && npm run build`.

---

## Backend handover

### How the contact form works

1. The site posts JSON to `POST {VITE_API_URL}/api/contact`.
2. The server validates it (name, work email, message 10 to 3000 characters, privacy consent, optional
   phone, service and preferred contact method). A hidden `website` field is a spam trap: if a bot fills
   it, the API answers `201` and drops the request silently.
3. The enquiry is saved to MongoDB, then a notification email goes to `CONTACT_TO` (Reply-To is the
   visitor) and, if `CONTACT_AUTOREPLY=true`, an acknowledgement goes to the visitor.
4. Email can never break the form: if mail fails, the enquiry is still saved and each record gets
   `emailStatus` (`sent`, `partial`, `failed`, `skipped`) and `emailError`.
5. Success is `201 { "success": true }`. The site only shows "enquiry received" for that exact reply.

Other routes: `GET /api/health` returns `200`. Anything else under `/api` returns `404` JSON.

### Database

| Item | Value |
| --- | --- |
| Server | MongoDB Atlas, cluster `CyberXSoftCluster` |
| Database | `cyberxsoft` (hardcoded in `server/src/config/db.js`, with `authSource: "admin"`) |
| Collection | `contactenquiries` (model: `server/src/models/ContactEnquiry.js`) |
| Connection string | `MONGODB_URI` in `server/.env` only. It is not in the repo and must never be committed |

Things to do and watch:

- **Get the connection string privately** from Furqan, or create a new Atlas database user for the new
  server (recommended) and use that.
- **Atlas Network Access:** add the public IP of the host that will run the API. If it is missing, the API
  cannot connect even with the right string.
- **The API refuses to start if MongoDB is unreachable** (`server/server.js` exits with an error).
- **DNS override:** `db.js` forces `8.8.8.8` and `1.1.1.1` because the office network could not resolve
  MongoDB SRV records. On a normal server this is not needed. Remove the `dns.setServers(...)` call if the
  host's own DNS works.
- To read enquiries: Atlas > Browse Collections > `cyberxsoft` > `contactenquiries`.
- Delete any test records (for example name "Audit Tester") before launch.

### Environment variables

**server/.env** (template: `server/.env.example`)

| Variable | Purpose |
| --- | --- |
| `PORT` | API port (default 5000) |
| `MONGODB_URI` | Atlas connection string (secret) |
| `CLIENT_URL` | Allowed website origin(s), comma-separated. In production: `https://cyberxsoft.net` (add `https://www.cyberxsoft.net` if used). Requests from other origins get 403 |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE` | Mail server. `465` with `SMTP_SECURE=true`, or `587` with `false` |
| `SMTP_USER`, `SMTP_PASS` | Mailbox login (secret) |
| `MAIL_FROM` | Sender, for example `"CyberX Soft <info@cyberxsoft.net>"` |
| `CONTACT_TO` | Who receives enquiries (comma-separated) |
| `CONTACT_AUTOREPLY` | `true` or `false` |
| `TRUST_PROXY` | Set to `1` behind nginx or a load balancer so rate limiting sees real visitor IPs |

Mail is currently sent through Gmail with an App Password. **To switch to `info@cyberxsoft.net`** see
[EMAIL_SETUP.md](EMAIL_SETUP.md). You need the mailbox password and SMTP details from whoever runs the
cPanel mail server (`mail.cyberxsoft.net`), and remove `SMTP_TLS_REJECT_UNAUTHORIZED=false`. Check the
settings with `cd server && npm run mail:test`.

**client/.env** (template: `client/.env.example`). These are read at **build time**, so rebuild after
changing them.

| Variable | Purpose |
| --- | --- |
| `VITE_API_URL` | Public `https` address of the API, no trailing slash. Required: if empty, the form says it is temporarily unavailable |
| `VITE_SITE_URL` | `https://cyberxsoft.net`. Adds canonical links and absolute share URLs. Without it those tags are omitted |

### Limits and security already in place

- Rate limit: 5 counted requests per 15 minutes per IP on `/api/contact` (validation errors count,
  malformed JSON, oversize bodies and refused origins do not). Restarting the API resets it.
- Body size limit 20 KB (`413` above that). Only JSON is accepted (`400` otherwise).
- `helmet` headers, CORS allow-list from `CLIENT_URL`, and non-string input (for example
  `{"$gt": ""}` as an email) is rejected before it reaches MongoDB.

### Hosting the website

`client/vercel.json` holds the single-page fallback (every unknown path serves `index.html`), the
security headers (CSP, `X-Frame-Options`, `nosniff`, Referrer-Policy, Permissions-Policy) and the cache
rules. **These only apply on Vercel** (Root Directory `client`, build `npm run build`, output `dist`).

If the site is hosted on Apache or cPanel instead, recreate the same three things (an `.htaccess` fallback
to `index.html`, the headers, and long caching for `/assets` and `/fonts`), or direct links such as
`/about` will return 404. `connect-src` in the CSP currently allows any `https:` host; narrow it to the API
origin once it is known. Also add HSTS if the host does not.

### Launch checklist

- [ ] Merge the audit fixes into `main` (branch `audit/final-fixes`).
- [ ] Atlas: database user and network access for the API host.
- [ ] Deploy the API; set `CLIENT_URL`, `MONGODB_URI`, SMTP values, `TRUST_PROXY` if proxied.
- [ ] Build the site with `VITE_API_URL` and `VITE_SITE_URL`.
- [ ] Mailbox `info@cyberxsoft.net` created and connected; SPF, DKIM and DMARC checked.
- [ ] Submit one real enquiry: it appears in MongoDB, the notification and auto-reply both arrive and
      neither is in spam. Delete the test record.
- [ ] Add `client/public/sitemap.xml` with the final domain and reference it from `robots.txt`.
- [ ] Content before launch: legal pages show "Pending final legal review", all Insights say "Coming
      soon", `socialLinks` is empty in `client/src/config/siteConfig.js`, office address to be confirmed.
- [ ] Optional after launch: `npm audit fix` (without `--force`) in `client` and `server`. The code that
      ships to visitors has 0 known vulnerabilities; the open advisories are in development tools.

## More

- [REDESIGN_NOTES.md](REDESIGN_NOTES.md): what changed and what is still needed before launch
- [EMAIL_SETUP.md](EMAIL_SETUP.md): contact-form email setup and the mailbox switch
