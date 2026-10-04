import { useRef } from "react";
import { ArrowLeft, ChevronLeft, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import SmartLink from "../components/ui/SmartLink.jsx";
import SplitWords from "../components/ui/SplitWords.jsx";
import WhatsAppIcon from "../components/ui/WhatsAppIcon.jsx";
import { contact, whatsappLink } from "../data/contact.js";
import { services, serviceSteps } from "../data/services.js";
import useScrollFx from "../motion/useScrollFx.js";
import "./service-detail.css";

function QuoteLink({ children }) {
  return (
    <SmartLink className="service-cta" to="/#quote" dir="ltr">
      <ChevronLeft aria-hidden="true" strokeWidth={1.75} />
      <span dir="rtl">{children}</span>
    </SmartLink>
  );
}

export default function ServiceDetailPage({ service }) {
  const rootRef = useRef(null);
  useScrollFx(rootRef, [service.path]);
  const others = services.filter((item) => item.path !== service.path);
  const whatsapp = whatsappLink(
    `שלום ${contact.owner}, הגעתי מהאתר ואשמח לקבל פרטים על ${service.title}.`,
  );

  return (
    <main ref={rootRef} className="service-page page-shell">
      <div className="service-page__inner">
        <nav className="service-page__crumbs" aria-label="מיקום באתר">
          <Link to="/">בית</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{service.title}</span>
        </nav>

        <header className="service-hero" data-image-reveal>
          <img
            src={service.image}
            alt={service.alt}
            style={{ objectPosition: service.imagePosition }}
            data-parallax="6"
          />
          <div className="service-hero__shade" aria-hidden="true" />
          <div className="service-hero__copy">
            <h1>
              <SplitWords text={service.title} />
            </h1>
            <p data-reveal="18" data-reveal-delay="0.25">{service.intro}</p>
            <div data-reveal="14" data-reveal-delay="0.4">
              <QuoteLink>לקבלת הצעת מחיר</QuoteLink>
            </div>
          </div>
        </header>

        <section className="service-block" aria-labelledby="service-includes">
          <hr className="service-rule" />
          <h2 id="service-includes">מה כולל השירות</h2>
          <ul className="service-points" data-reveal-group="0.07">
            {service.points.map((point) => (
              <li key={point}>
                <span className="service-points__mark" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="service-block" aria-labelledby="service-steps">
          <hr className="service-rule" />
          <h2 id="service-steps">איך זה עובד</h2>
          <ol className="service-steps" data-reveal-group="0.09">
            {serviceSteps.map((step, index) => (
              <li key={step}>
                <span className="service-steps__index">{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="service-close" aria-labelledby="service-close-title" data-reveal>
          <hr className="service-rule" />
          <h2 id="service-close-title">רוצים שנבנה לכם את האירוח?</h2>
          <QuoteLink>קבלת הצעת מחיר</QuoteLink>
          <div className="service-pills">
            <a
              className="service-pill"
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              dir="ltr"
            >
              <WhatsAppIcon />
              <span>WhatsApp</span>
            </a>
            <a className="service-pill" href={contact.phoneHref}>
              <Phone aria-hidden="true" strokeWidth={1.5} />
              <span>חיוג</span>
            </a>
          </div>
        </section>

        <section className="service-more" aria-labelledby="service-more-title">
          <hr className="service-rule" />
          <h2 id="service-more-title">שירותים נוספים</h2>
          <ul className="service-more__list" data-reveal-group="0.1">
            {others.map((item) => (
              <li key={item.path}>
                <Link to={item.path} className="service-more__card">
                  <span className="service-more__thumb">
                    <img
                      src={item.image}
                      alt=""
                      loading="lazy"
                      style={{ objectPosition: item.imagePosition }}
                    />
                  </span>
                  <span className="service-more__title">{item.title}</span>
                  <ArrowLeft aria-hidden="true" strokeWidth={1.4} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
