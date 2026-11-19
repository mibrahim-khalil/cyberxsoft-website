const dns = require("dns");

const ContactEnquiry = require(
  "../models/ContactEnquiry"
);

const { sendEnquiryEmails } = require(
  "../services/mailer"
);

const allowedServices = [
  "brand-strategy-digital-growth",
  "creative-media-design-animation",
  "ai-software-digital-solutions",
  "data-cybersecurity-digital-governance",
  "talent-augmentation-delivery-support",
  "not-sure-yet",
];

const allowedContactMethods = [
  "",
  "email",
  "phone",
  "whatsapp",
];

const emailPattern =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const cleanText = (value) => {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
};

// =====================================
// SPAM LAYER 1: Known Disposable / Temp Mail Domains
// =====================================

const disposableDomains = [
  "mailinator.com",
  "tempmail.com",
  "temp-mail.org",
  "yopmail.com",
  "guerrillamail.com",
  "guerrillamail.info",
  "sharklasers.com",
  "trashmail.com",
  "throwaway.email",
  "10minutemail.com",
  "10minutemail.co",
  "getnada.com",
  "maildrop.cc",
  "fakeinbox.com",
  "dispostable.com",
  "mailnesia.com",
  "tempail.com",
  "emailondeck.com",
  "moakt.com",
  "spamgourmet.com",
  "trashmail.de",
  "discard.email",
  "mailcatch.com",
  "mytemp.email",
  "linshiyouxiang.net",
  "mohmal.com",
  "burnermail.io",
  "harakirimail.com",
  "mailsac.com",
  "tempmailaddress.com",
  "tempr.email",
  "dropmail.me",
  "courrieltemporaire.com",
  "temp-mail.io",
  "emailfake.com",
  "mailforspam.com",
  "spamfree24.org",
  "jetable.org",
  "jetable.com",
  "zoemail.com",
  "safetymail.info",
  "zoemail.net",
  "zt.pl",
  "e4ward.com",
  "cool.fr.nf",
  "jetable.fr.nf",
  "courriel.fr.nf",
  "moncourrier.fr.nf",
  "monemail.fr.nf",
  "monmail.fr.nf",
  "nospam.ze.tc",
  "speed.1s.fr",
  "courrielzero.net",
];

function isDisposableEmail(domain) {
  return disposableDomains.includes(
    domain.toLowerCase()
  );
}

// =====================================
// SPAM LAYER 2: Suspicious Link Counter
// =====================================

function countLinks(text) {
  const urlPattern =
    /https?:\/\/[^\s]+|www\.[^\s]+/gi;
  const matches =
    text.match(urlPattern) || [];
  return matches.length;
}

// =====================================
// SPAM LAYER 3: Spam Keyword Detector
// =====================================

const spamKeywords = [
  "casino",
  "viagra",
  "cialis",
  "lottery",
  "you have won",
  "click here",
  "earn money fast",
  "crypto giveaway",
  "bitcoin investment",
  "forex signals",
  "weight loss",
  "adult content",
  "porn",
  "nude",
  "free followers",
  "free likes",
  "free subscribers",
  "seo service",
  "buy backlinks",
  "cheap seo",
  "loan offer",
  "instant cash",
  "guaranteed approval",
  "no credit check",
  "make money online",
  "work from home guaranteed",
  "get rich quick",
  "double your money",
  "investment opportunity guaranteed",
  "wire transfer",
  "bank transfer details",
  "western union",
];

function hasSpamKeywords(message) {
  const lower = message.toLowerCase();
  return spamKeywords.some((keyword) =>
    lower.includes(keyword)
  );
}

// =====================================
// SPAM LAYER 4: DNS MX Record Check
//
// Verifies the email domain actually has
// a real mail server. Fake domains like
// test@asdf1234fake.com will fail this.
// =====================================

function verifyDomainMX(domain) {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      resolve(false);
    }, 3000); // 3 second timeout

    dns.resolveMx(domain, (err, addresses) => {
      clearTimeout(timeout);
      if (err || !addresses || addresses.length === 0) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

// =====================================
// MASTER SPAM CHECK FUNCTION
//
// Returns { isSpam, reason }
// =====================================

async function detectSpam(fullName, workEmail, message, company, phone) {
  const domain = workEmail.split("@")[1];

  // Check 1: Disposable / temp email
  if (isDisposableEmail(domain)) {
    return {
      isSpam: true,
      reason: "Disposable email domain",
    };
  }

  // Check 2: Too many links in message
  const linkCount = countLinks(message);
  if (linkCount > 3) {
    return {
      isSpam: true,
      reason: `Too many links in message (${linkCount})`,
    };
  }

  // Check 3: Spam keywords in message
  if (hasSpamKeywords(message)) {
    return {
      isSpam: true,
      reason: "Spam keywords detected",
    };
  }

  // Check 4: All-caps message (bots often do this)
  const messageWords = message.replace(/\s+/g, "");
  const capsRatio =
    messageWords.length > 0
      ? (message.match(/[A-Z]/g) || []).length /
        messageWords.length
      : 0;
  if (capsRatio > 0.7 && messageWords.length > 20) {
    return {
      isSpam: true,
      reason: "Excessive uppercase (bot pattern)",
    };
  }

  // Check 5: DNS MX record verification
  const mxValid = await verifyDomainMX(domain);
  if (!mxValid) {
    return {
      isSpam: true,
      reason: "Email domain has no valid MX records",
    };
  }

  // Passed all checks!
  return {
    isSpam: false,
    reason: "Valid enquiry",
  };
}

// =====================================
// MAIN CONTROLLER
// =====================================

const createContactEnquiry = async (req, res) => {
  try {
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({
        success: false,
        message: "Please send the enquiry as JSON.",
      });
    }

    const fullName = cleanText(req.body.fullName);
    const workEmail = cleanText(
      req.body.workEmail
    ).toLowerCase();
    const company = cleanText(req.body.company);
    const phone = cleanText(req.body.phone);
    const service = cleanText(req.body.service);
    const message = cleanText(req.body.message);
    const preferredContactMethod = cleanText(
      req.body.preferredContactMethod
    );
    const privacyConsent =
      req.body.privacyConsent === true;

    // =====================================
    // Honeypot (Existing Layer 1)
    // =====================================

    if (cleanText(req.body.website)) {
      return res.status(201).json({
        success: true,
        message:
          "Thank you. Your enquiry has been received.",
      });
    }

    // =====================================
    // Required fields
    // =====================================

    if (!fullName || !workEmail || !message) {
      return res.status(400).json({
        success: false,
        message:
          "Full name, work email, and message are required.",
      });
    }

    if (
      fullName.length < 2 ||
      fullName.length > 100
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Full name must be between 2 and 100 characters.",
      });
    }

    if (
      workEmail.length > 150 ||
      !emailPattern.test(workEmail)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide a valid email address.",
      });
    }

    if (company.length > 150) {
      return res.status(400).json({
        success: false,
        message: "Company name is too long.",
      });
    }

    if (phone.length > 50) {
      return res.status(400).json({
        success: false,
        message: "Phone number is too long.",
      });
    }

    if (
      service &&
      !allowedServices.includes(service)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please select a valid service.",
      });
    }

    if (
      message.length < 10 ||
      message.length > 3000
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Message must be between 10 and 3000 characters.",
      });
    }

    if (
      !allowedContactMethods.includes(
        preferredContactMethod
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please select a valid contact method.",
      });
    }

    if (
      ["phone", "whatsapp"].includes(
        preferredContactMethod
      ) &&
      !phone
    ) {
      return res.status(400).json({
        success: false,
        message:
          "A phone number is required for phone or WhatsApp contact.",
      });
    }

    if (!privacyConsent) {
      return res.status(400).json({
        success: false,
        message:
          "Please accept the privacy consent before sending your enquiry.",
      });
    }

    // =====================================
    // SPAM DETECTION (New Layer)
    //
    // Runs AFTER all valid field checks pass.
    // Checks: disposable email, link count,
    // spam keywords, ALL-CAPS pattern, and
    // DNS MX record verification.
    // =====================================

    const spamCheck = await detectSpam(
      fullName,
      workEmail,
      message,
      company,
      phone
    );

    // =====================================
    // SAVE TO DATABASE
    //
    // Both real AND spam are stored so
    // you can review them in Atlas.
    // The isSpam flag tells them apart.
    // =====================================

    const enquiry = await ContactEnquiry.create({
      fullName,
      workEmail,
      company,
      phone,
      service,
      message,
      preferredContactMethod,
      privacyConsent: true,
      privacyConsentAt: new Date(),

      // New spam tracking fields
      isSpam: spamCheck.isSpam,
      spamReason: spamCheck.reason,
      emailStatus: spamCheck.isSpam
        ? "skipped"
        : "pending",
    });

    // =====================================
    // EMAIL DISPATCH
    //
    // ONLY real enquiries trigger an email
    // to the company inbox.
    // Spam is SILENTLY dropped from email
    // but still stored in MongoDB.
    // =====================================

    if (!spamCheck.isSpam) {
      sendEnquiryEmails(enquiry)
        .then((result) =>
          ContactEnquiry.updateOne(
            { _id: enquiry._id },
            {
              emailStatus: result.status,
              emailError: (result.error || "").slice(
                0,
                300,
              ),
            },
          ),
        )
        .then(() => undefined)
        .catch((mailError) => {
          console.error(
            "Contact email error:",
            mailError.message,
          );
        });
    } else {
      console.log(
        `[SPAM BLOCKED] ${
          spamCheck.reason
        } | From: ${workEmail} | Message preview: "${message.slice(
          0,
          80,
        )}..."`,
      );
    }

    // =====================================
    // RESPONSE
    //
    // BOTH real and spam receive the same
    // "Thank you" message so bots/spammers
    // never know they were filtered.
    // =====================================

    return res.status(201).json({
      success: true,
      message:
        "Thank you. Your enquiry has been received. A member of the CyberX Soft team will contact you using the details provided.",
      data: {
        id: enquiry._id,
        status: enquiry.status,
        createdAt: enquiry.createdAt,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message:
          "Please check the submitted information.",
      });
    }

    console.error(
      "Contact enquiry error:",
      error.message,
    );

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while submitting the enquiry.",
    });
  }
};

module.exports = {
  createContactEnquiry,
};