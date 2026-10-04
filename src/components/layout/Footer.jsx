import { useRef } from "react";
import { MapPin, Phone, ShieldCheck } from "lucide-react";
import logo from "../../assets/logos/logo.png";
import { contact, whatsappDefault } from "../../data/contact.js";
import { navigation } from "../../data/navigation.js";
import useScrollFx from "../../motion/useScrollFx.js";
import SmartLink from "../ui/SmartLink.jsx";
import WhatsAppIcon from "../ui/WhatsAppIcon.jsx";
import "./footer.css";

export default function Footer() {
  const rootRef = useRef(null);
  useScrollFx(rootRef);

  return (
    <footer ref={rootRef} className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand" data-reveal>
          <img src={logo} alt="קייטרינג הרשב״י" />
          <p className="site-footer__script">יותר מאוכל. זה אירוח.</p>
        </div>

        <div className="site-footer__cta" data-reveal>
          <p>רוצים לדבר עם לירן?</p>
          <div className="site-footer__pills">
            <a className="site-footer__pill site-footer__pill--gold" href={contact.phoneHref}>
              <Phone aria-hidden="true" strokeWidth={1.6} />
              <span dir="ltr">{contact.phoneDisplay}</span>
            </a>
            <a
              className="site-footer__pill"
              href={whatsappDefault}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="site-footer__grid" data-reveal-group>
          <nav aria-label="ניווט בתחתית העמוד">
            <h2>ניווט</h2>
            <ul>
              {navigation.map((item) => (
                <li key={item.to}>
                  <SmartLink to={item.to}>{item.label}</SmartLink>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2>פרטים</h2>
            <ul className="site-footer__facts">
              <li>
                <ShieldCheck aria-hidden="true" strokeWidth={1.4} />
                <span>{contact.kashrut}</span>
              </li>
              <li>
                <MapPin aria-hidden="true" strokeWidth={1.4} />
                <span>{contact.area}</span>
              </li>
              <li>
                <Phone aria-hidden="true" strokeWidth={1.4} />
                <span>
                  {contact.owner} · <a href={contact.phoneHref} dir="ltr">{contact.phoneDisplay}</a>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p className="site-footer__mark" aria-hidden="true">
        הרשב״י
      </p>

      <div className="site-footer__legal">
        <p>© {new Date().getFullYear()} קייטרינג הרשב״י · כל הזכויות שמורות</p>
      </div>
    </footer>
  );
}
