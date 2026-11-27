import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Check, CheckCircle2, MapPin, Send } from "lucide-react";

import Button from "../../ui/Button";
import { EASE } from "../../ui/motion";
import { services } from "../services/servicesData";
import { detectSource } from "./leadSource";

import "./contactSource.css";

const makeInitial = (service = "") => ({
  fullName: "",
  workEmail: "",
  company: "",
  phone: "",
  service,
  message: "",
  preferredContactMethod: "",
  privacyConsent: false,
  website: "", // spam trap: real visitors never see or fill this
});

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const serviceOptions = [
  ...services.map((service) => ({
    value: service.slug,
    label:
      service.slug === "talent-augmentation-delivery-support"
        ? "Staff Augmentation & Delivery Support"
        : service.name,
  })),
  { value: "not-sure-yet", label: "Not sure yet" },
];

const methods = [
  { value: "", label: "No preference" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone call" },
  { value: "whatsapp", label: "WhatsApp" },
];

function validate(values) {
  const errors = {};
  if (values.fullName.trim().length < 2) errors.fullName = "Please enter your full name.";
  if (!emailPattern.test(values.workEmail.trim())) errors.workEmail = "Please enter a valid email address.";
  if (["phone", "whatsapp"].includes(values.preferredContactMethod) && !values.phone.trim())
    errors.phone = "Add a number so we can reach you by phone or WhatsApp.";
  if (values.message.trim().length < 10) errors.message = "Please tell us a little more (at least 10 characters).";
  if (!values.privacyConsent) errors.privacyConsent = "Please accept the privacy consent to continue.";
  return errors;
}

function Field({ id, label, required, error, hint, children }) {
  return (
    <div className={`field ${error ? "field--error" : ""}`}>
      <label htmlFor={id}>
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      {children}
      {error ? (
        <p className="field__msg" id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : (
        hint && <p className="field__hint">{hint}</p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [params] = useSearchParams();
  // Worked out once, when the form first appears
  const [source] = useState(() => detectSource(params.get("service")));

  const [values, setValues] = useState(() => makeInitial(source.serviceSlug));
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success
  const [serverError, setServerError] = useState("");

  const errors = validate(values);

  const set = (name, value) => setValues((current) => ({ ...current, [name]: value }));
  const blur = (name) => setTouched((current) => ({ ...current, [name]: true }));
  const show = (name) => (touched[name] ? errors[name] : undefined);

  const bind = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: (event) => set(name, event.target.value),
    onBlur: () => blur(name),
    "aria-invalid": Boolean(show(name)),
    "aria-describedby": show(name) ? `${name}-error` : undefined,
  });

  const submit = async (event) => {
    event.preventDefault();
    setServerError("");

    if (Object.keys(errors).length > 0) {
      setTouched({ fullName: true, workEmail: true, phone: true, message: true, privacyConsent: true });
      const first = document.querySelector(".field--error input, .field--error textarea, .field--error .consent");
      first?.focus?.();
      return;
    }

    setStatus("sending");

    try {
      const apiBase = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
      if (!apiBase) {
        throw new Error("The contact form is temporarily unavailable. Please email info@cyberxsoft.net.");
      }

      const response = await fetch(`${apiBase}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: values.fullName.trim(),
          workEmail: values.workEmail.trim(),
          company: values.company.trim(),
          phone: values.phone.trim(),
          service: values.service,
          message: values.message.trim(),
          preferredContactMethod: values.preferredContactMethod,
          privacyConsent: values.privacyConsent,
          website: values.website,
        }),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.message || "Unable to submit your enquiry. Please try again.");
      }
      // Only our API answers with { success: true }. A 200 from anything else
      // (a mis-set VITE_API_URL, a proxy or an error page) must not look like success.
      if (result.success !== true) {
        throw new Error("We could not confirm your enquiry was received. Please try again, or email info@cyberxsoft.net.");
      }

      setStatus("success");
      setValues(makeInitial(source.serviceSlug));
      setTouched({});
    } catch (error) {
      // fetch() rejects with a TypeError when the server cannot be reached.
      setServerError(
        error instanceof TypeError
          ? "We could not reach our server. Please try again in a moment, or email info@cyberxsoft.net."
          : error.message || "Something went wrong. Please try again."
      );
      setStatus("idle");
    }
  };

  return (
    <div className="contact-form glass">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="done"
            className="contact-success"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            role="status"
          >
            <span className="contact-success__tick">
              <CheckCircle2 size={34} strokeWidth={1.6} aria-hidden="true" />
            </span>
            <h2 className="t-h3">Thank you. Your enquiry has been received.</h2>
            <p>
              A member of the CyberX Soft team will contact you using the details provided. We aim
              to respond within one business day.
            </p>
            <Button variant="glass" magnetic={false} onClick={() => setStatus("idle")}>
              Send another enquiry
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={submit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <header className="contact-form__head">
              <h2 className="t-h3">Send us an enquiry</h2>
              <p>Tell us what you need help with. We aim to respond within one business day.</p>
            </header>

            <div className="contact-form__trap" aria-hidden="true">
              <label htmlFor="website">Leave this field empty</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={values.website}
                onChange={(event) => set("website", event.target.value)}
              />
            </div>

            <div className="contact-form__grid">
              <Field id="fullName" label="Full name" required error={show("fullName")}>
                <input type="text" placeholder="Your full name" autoComplete="name" maxLength={100} {...bind("fullName")} />
              </Field>

              <Field id="workEmail" label="Work email" required error={show("workEmail")}>
                <input type="email" placeholder="you@company.com" autoComplete="email" maxLength={150} {...bind("workEmail")} />
              </Field>

              <Field id="company" label="Company or organization">
                <input type="text" placeholder="Company name" autoComplete="organization" maxLength={150} {...bind("company")} />
              </Field>

              <Field id="phone" label="Phone or WhatsApp" error={show("phone")}>
                <input type="tel" placeholder="+92 300 0000000" autoComplete="tel" maxLength={50} {...bind("phone")} />
              </Field>
            </div>

            <div className="contact-source">
              <span className="contact-source__icon" aria-hidden="true">
                <MapPin size={16} />
              </span>
              <div>
                <small>Where you came from.</small>
                <strong>{source.label}</strong>
              </div>
            </div>

            <fieldset className="choice">
              <legend>Service of interest</legend>
              <div className="choice__chips">
                {serviceOptions.map((option) => {
                  const on = values.service === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      className={`choice__chip ${on ? "is-on" : ""}`}
                      aria-pressed={on}
                      onClick={() => set("service", on ? "" : option.value)}
                    >
                      {on && <Check size={14} strokeWidth={2.6} aria-hidden="true" />}
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <Field
              id="message"
              label="What would you like to achieve?"
              required
              error={show("message")}
              hint={`${values.message.length} / 3000`}
            >
              <textarea
                rows={5}
                maxLength={3000}
                placeholder="Tell us about your goals, current challenges, and expected timeline…"
                {...bind("message")}
              />
            </Field>

            <fieldset className="choice">
              <legend>Preferred contact method</legend>
              <div className="choice__segment" role="radiogroup">
                {methods.map((method, index) => {
                  const on = values.preferredContactMethod === method.value;
                  return (
                    <button
                      key={method.value || "none"}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      tabIndex={on ? 0 : -1}
                      className={`choice__seg ${on ? "is-on" : ""}`}
                      onClick={() => set("preferredContactMethod", method.value)}
                      onKeyDown={(event) => {
                        // Standard radio-group keyboard pattern: arrows move and select.
                        const forward = ["ArrowRight", "ArrowDown"].includes(event.key);
                        const backward = ["ArrowLeft", "ArrowUp"].includes(event.key);
                        if (!forward && !backward) return;
                        event.preventDefault();
                        const next = (index + (forward ? 1 : -1) + methods.length) % methods.length;
                        set("preferredContactMethod", methods[next].value);
                        const radios = event.currentTarget.parentElement.querySelectorAll('[role="radio"]');
                        radios[next]?.focus();
                      }}
                    >
                      {method.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className={`consent ${show("privacyConsent") ? "consent--error" : ""}`}>
              <input
                id="privacyConsent"
                type="checkbox"
                checked={values.privacyConsent}
                onChange={(event) => set("privacyConsent", event.target.checked)}
                onBlur={() => blur("privacyConsent")}
              />
              <label htmlFor="privacyConsent">
                I agree to CyberX Soft using the information I provide to respond to my enquiry, as
                described in the{" "}
                <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </Link>
                . <span aria-hidden="true">*</span>
              </label>
            </div>
            {show("privacyConsent") && (
              <p className="field__msg" role="alert">
                {errors.privacyConsent}
              </p>
            )}

            {serverError && (
              <p className="contact-form__error" role="alert">
                {serverError}
              </p>
            )}

            <button type="submit" className="btn btn--primary contact-form__submit" disabled={status === "sending"}>
              <span>{status === "sending" ? "Sending…" : "Send enquiry"}</span>
              <span className="btn__icon" aria-hidden="true">
                <Send size={16} />
              </span>
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}