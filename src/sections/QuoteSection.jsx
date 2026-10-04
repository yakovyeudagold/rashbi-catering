import { useState } from "react";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  MessageSquare,
  Phone,
  User,
  Users,
} from "lucide-react";
import WhatsAppIcon from "../components/ui/WhatsAppIcon.jsx";
import { contact, whatsappDefault, whatsappLink } from "../data/contact.js";
import "./quote.css";

function formatDate(value) {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

function buildMessage(form) {
  const field = (name) => String(form.get(name) ?? "").trim();
  const lines = [
    `שלום ${contact.owner}, אשמח לקבל הצעת מחיר.`,
    "",
    `שם: ${field("name")}`,
    `טלפון: ${field("phone")}`,
    `סוג האירוח: ${field("occasion")}`,
    `מספר אורחים: ${field("guests")}`,
    `תאריך משוער: ${formatDate(field("date"))}`,
  ];
  const message = field("message");
  if (message) lines.push(`הודעה: ${message}`);
  return lines.join("\n");
}

export default function QuoteSection() {
  const [date, setDate] = useState("");
  const [occasion, setOccasion] = useState("");
  const [sentLink, setSentLink] = useState(null);

  function onSubmit(event) {
    event.preventDefault();
    const link = whatsappLink(buildMessage(new FormData(event.currentTarget)));
    setSentLink(link);
    const opened = window.open(link, "_blank");
    if (!opened) window.location.href = link;
  }

  return (
    <section className="quote" id="quote" aria-labelledby="quote-title">
      <div className="quote__inner">
        <header className="quote__intro">
          <hr className="quote__divider" data-reveal="10" />
          <h2 id="quote-title">
            <span className="quote__line quote__line--ivory" data-reveal="22">מתכננים אירוע,</span>
            <span className="quote__line quote__line--gold" data-reveal="22" data-reveal-delay="0.1">
              שבת או נופש?
            </span>
          </h2>
          <p className="quote__support" data-reveal="18" data-reveal-delay="0.2">
            השאירו כמה פרטים קצרים ונחזור אליכם
            <br />
            עם התאמה לאירוח שלכם.
          </p>
        </header>

        <form className="quote__card" onSubmit={onSubmit} data-reveal="40">
          <label className="quote-field">
            <User className="quote-field__icon" aria-hidden="true" strokeWidth={1.5} />
            <input
              type="text"
              name="name"
              required
              autoComplete="name"
              placeholder="שם מלא"
              aria-label="שם מלא"
            />
          </label>

          <label className="quote-field">
            <Phone className="quote-field__icon" aria-hidden="true" strokeWidth={1.5} />
            <input
              type="tel"
              name="phone"
              required
              autoComplete="tel"
              placeholder="טלפון"
              aria-label="טלפון"
            />
          </label>

          <label className="quote-field quote-field--select">
            <ChevronDown className="quote-field__icon" aria-hidden="true" strokeWidth={1.5} />
            <span
              className={occasion ? "quote-field__value" : "quote-field__placeholder"}
              aria-hidden="true"
            >
              {occasion || "אירוע / שבת / נופש / אחר"}
            </span>
            <select
              name="occasion"
              required
              value={occasion}
              aria-label="סוג האירוח"
              onChange={(event) => setOccasion(event.target.value)}
            >
              <option value="" disabled hidden>
                אירוע / שבת / נופש / אחר
              </option>
              <option value="אירוע">אירוע</option>
              <option value="שבת">שבת</option>
              <option value="נופש">נופש</option>
              <option value="אחר">אחר</option>
            </select>
          </label>

          <label className="quote-field">
            <Users className="quote-field__icon" aria-hidden="true" strokeWidth={1.5} />
            <input
              type="text"
              name="guests"
              required
              inputMode="numeric"
              placeholder="מספר אורחים"
              aria-label="מספר אורחים"
            />
          </label>

          <label className={`quote-field${date ? " has-value" : ""}`}>
            <Calendar className="quote-field__icon" aria-hidden="true" strokeWidth={1.5} />
            <span className="quote-field__date">
              {date ? null : (
                <span className="quote-field__ghost">תאריך משוער</span>
              )}
              <input
                type="date"
                name="date"
                required
                value={date}
                aria-label="תאריך משוער"
                onChange={(event) => setDate(event.target.value)}
              />
            </span>
          </label>

          <label className="quote-field quote-field--note">
            <MessageSquare className="quote-field__icon" aria-hidden="true" strokeWidth={1.5} />
            <textarea
              name="message"
              rows={1}
              placeholder="הודעה קצרה (אופציונלי)"
              aria-label="הודעה קצרה (אופציונלי)"
            />
          </label>

          <button className="quote-submit" type="submit" dir="ltr">
            <ChevronLeft aria-hidden="true" strokeWidth={1.75} />
            <span dir="rtl">לקבלת הצעת מחיר</span>
          </button>

          {sentLink ? (
            <p className="quote__sent" role="status">
              ההודעה מוכנה בוואטסאפ — רק ללחוץ על שליחה.{" "}
              <a href={sentLink} target="_blank" rel="noopener noreferrer">
                לא נפתח? לחצו כאן
              </a>
            </p>
          ) : null}

          <div className="quote__talk">
            <hr />
            <p>מעדיפים לדבר עכשיו?</p>
            <div className="quote__pills">
              <a
                className="quote__pill"
                href={whatsappDefault}
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
              >
                <WhatsAppIcon />
                <span>WhatsApp</span>
              </a>
              <a className="quote__pill" href={contact.phoneHref}>
                <Phone aria-hidden="true" strokeWidth={1.5} />
                <span>חיוג</span>
              </a>
            </div>
          </div>
        </form>

        <p className="quote__note">נחזור אליכם בהקדם עם מענה מסודר ומכובד.</p>
      </div>
    </section>
  );
}
