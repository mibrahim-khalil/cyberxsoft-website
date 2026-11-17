# CyberX Soft website audit

A test of the CyberX Soft website v2 driven by Playwright: what was tried, what the site did, and what needs fixing. Every row shows the use case, the steps, the expected behaviour and the actual result. Defects found during the audit were fixed and retested; those fixes are listed in the findings.

Audit date 2026-11-11Target CyberX Soft v2 (local servers on the owner's PC, plus a production build)Tool Playwright via the browser pluginPages in scope 15 of 15 routesCode tested 544b90b, fixes 8382279 to 568a8d0

PASSworked as expected FAILa defect or open launch blocker ERRORan error occurred while the site handled the case NOTEadvisory, not graded, or not testable here

## Summary

### Results overall

### Results by area

### Verdict

- Nine tests failed. Seven were website defects, and all seven were fixed and retested during this audit. The fixes are in 6 commits that still need to be pushed and merged.
- The other two are launch items, not defects: the info@cyberxsoft.net mailbox must be set up and connected (L01, finding 1), and there is no sitemap.xml yet (B10, finding 5).
- Before going live also settle the hosting target, the build-time domain setting and the legal and placeholder content (findings 6 to 8).

## How the audit ran

The browser drove the real site and the real API. Failure responses were produced by intercepting the request in the browser, so they could not send real data.

### Method

- Each test is a use case: a visitor action or a failure condition, then a check of what the page did.
- Rows marked `Plugin` ran in the Playwright plugin in the owner's browser against the local dev servers. They tested commit 544b90b.
- Rows marked `Build` ran in a separate sandbox on a production build with the vercel.json headers. Production checks (headers, sizes, axe scans) and every retest after a fix are here, because the owner's dev servers still run the unfixed code.
- Failure responses were produced by intercepting the request in the browser. The live API was probed directly only with requests that cannot save or send anything, plus the limit test.

### Severity scale

- **High**: stops the launch or hides a visible failure from visitors.
- **Medium**: a missing protection, a broken common path, or a launch setting that must be made.
- **Low**: an edge case, or a gap with a workaround.
- **Cosmetic**: polish, with no effect on use.

## Test results

Every test, grouped by area. Filter to focus on one result type. A FAIL with a matching retest row was fixed during the audit.

## Findings and fixes, ranked

Each finding points to the tests that show it, and says whether it is fixed or still open.

## What held up

## Email change required

The one launch step that needs someone else.

### What changes

- From: Gmail with an App Password.
- To: the company mailbox `info@cyberxsoft.net` on mail.cyberxsoft.net.
- Only `server/.env` changes. No source code changes.
- Restart the API after editing (type `rs` in the server terminal).

### Ask the person who runs the cPanel server

- Does the mailbox info@cyberxsoft.net exist? If not, can they create it?
- What is its password (it goes only in server/.env)?
- SMTP host (expected mail.cyberxsoft.net), port (465 with SSL, or 587) and whether it needs a login.
- Are SPF and DKIM switched on for cyberxsoft.net, and can DMARC be set to enforce?

### Values to set in server/.env

- `SMTP_HOST=mail.cyberxsoft.net`
- `SMTP_PORT=465` and `SMTP_SECURE=true` (or 587 and false)
- `SMTP_USER=info@cyberxsoft.net`
- `SMTP_PASS=` the mailbox password
- `MAIL_FROM="CyberX Soft <info@cyberxsoft.net>"`
- `CONTACT_TO=info@cyberxsoft.net`
- Delete `SMTP_TLS_REJECT_UNAUTHORIZED=false`

### Check afterwards

- Submit one enquiry from the site.
- The notification arrives at info@cyberxsoft.net and the auto-reply reaches the sender.
- Neither message is in spam.
- The enquiry is saved in MongoDB (collection contactenquiries).

## Limits and disclosures

### Possible stray test data

- The rate limiter had already counted one request before the API probes started. I could not tell whether it was a saved enquiry from an earlier test.
- In the MongoDB collection contactenquiries and in the Gmail inbox, look for entries named "Audit Tester" or from example.com addresses, and delete them.
- Form tests with failure responses were intercepted in the browser and never reached the server. The probe requests S09 to S12 were rejected by validation, so nothing was saved from them.
- The server's rate limit is now spent. Typing `rs` in the server terminal clears it.

### Not tested

- A real enquiry saved to MongoDB and delivered by email (S16). The limit was spent first. Do this by hand after switching the mailbox.
- The live domain: DNS, the TLS certificate, and headers actually served by the real host.
- Safari, Firefox and real phones. All runs used Chromium.
- Slow-network throttling.
- The wording and legal accuracy of the policy pages.
- Re-running the fixed code on the owner's PC. Pull the fixes and run the Plugin rows again if you want that confirmation.

### Test-harness anomalies

### Accuracy of the numbers

- Plugin rows ran against the Vite dev server, which is slower and less compact than the production build. Timings in those rows are indicative only.
- Lab LCP values come from a sandbox that draws 3D in software, so the 4.8 s is higher than a typical laptop. The same effect was seen on a real laptop GPU at 3.8 to 4.9 s in dev mode.
- Contrast ratios come from the axe scanner's computed colours.
- The totals in this report are counted by script from the rows, not typed by hand.
- Fixes are committed in the working copy (8382279, 5f6dc6d, d30dd65, 0add420, 890ad9e, 568a8d0) and are not yet on GitHub main.

CyberX Soft website audit · generated 2026-11-11