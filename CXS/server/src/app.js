const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const contactRoutes = require("./routes/contactRoutes");

const app = express();

/*
 * When the API runs behind a reverse proxy (nginx, a load balancer or a
 * hosting platform), set TRUST_PROXY=1 so the rate limiter sees each
 * visitor's real address instead of the proxy's. Leave it unset when the
 * API is reached directly.
 */
if (process.env.TRUST_PROXY) {
  const value = process.env.TRUST_PROXY;
  app.set("trust proxy", /^\d+$/.test(value) ? Number(value) : value);
}

/* =========================================
   Security Headers
========================================= */

app.use(helmet());

/* =========================================
   CORS
========================================= */

const allowedOrigins = (
  process.env.CLIENT_URL || "http://localhost:5173"
)
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests without an Origin header
      // such as Postman, PowerShell, or server-to-server requests.
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error("Origin is not allowed by CORS.")
      );
    },
  })
);

/* =========================================
   Request Parsing
========================================= */

app.use(
  express.json({
    limit: "20kb",
  })
);

/* =========================================
   Contact Form Rate Limit
========================================= */

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Too many enquiries submitted. Please wait a few minutes and try again.",
  },
});

/* =========================================
   Basic Routes
========================================= */

app.get("/", (req, res) => {
  res.json({
    message: "CyberX Soft API is running",
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CyberX Soft API is healthy",
  });
});

/* =========================================
   API Routes
========================================= */

app.use(
  "/api/contact",
  contactLimiter,
  contactRoutes
);

/* =========================================
   404 Handler
========================================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found.",
  });
});

/* =========================================
   Error Handler
========================================= */

app.use((error, req, res, next) => {
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({
      success: false,
      message: "The request body is not valid JSON.",
    });
  }

  if (error.type === "entity.too.large") {
    return res.status(413).json({
      success: false,
      message: "The request is too large.",
    });
  }

  console.error("API error:", error.message);

  if (error.message === "Origin is not allowed by CORS.") {
    return res.status(403).json({
      success: false,
      message: "Request origin is not allowed.",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
});

module.exports = app;