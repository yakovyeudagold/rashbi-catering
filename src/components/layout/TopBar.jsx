import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Phone } from "lucide-react";
import logo from "../../assets/logos/logo.png";
import { contact, whatsappDefault } from "../../data/contact.js";
import WhatsAppIcon from "../ui/WhatsAppIcon.jsx";
import { useSiteMenu } from "./siteMenuState.js";
import "./chrome.css";

export default function TopBar({ revealAfterViewport = 0 }) {
  const { openMenu } = useSiteMenu();
  const [visible, setVisible] = useState(revealAfterViewport === 0);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const threshold = window.innerHeight * revealAfterViewport;
      const delta = y - lastY;
      lastY = y;

      setSolid(y > 24);
      if (y <= threshold) {
        setVisible(revealAfterViewport === 0);
      } else if (delta > 6) {
        setVisible(false);
      } else if (delta < -6) {
        setVisible(true);
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [revealAfterViewport]);

  const className = [
    "top-bar",
    visible ? "is-visible" : "",
    solid || revealAfterViewport > 0 ? "is-solid" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={className} dir="ltr">
      <div className="top-bar__inner">
        <button type="button" className="top-bar__btn" aria-label="תפריט" onClick={openMenu}>
          <Menu aria-hidden="true" strokeWidth={1.3} />
        </button>
        <Link to="/" className="top-bar__logo" aria-label="קייטרינג הרשב״י — לעמוד הבית">
          <img src={logo} alt="" />
        </Link>
        <div className="top-bar__actions">
          <a className="top-bar__btn top-bar__btn--ring" href={contact.phoneHref} aria-label="חיוג">
            <Phone aria-hidden="true" strokeWidth={1.3} />
          </a>
          <a
            className="top-bar__btn top-bar__btn--ring"
            href={whatsappDefault}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="וואטסאפ"
          >
            <WhatsAppIcon />
          </a>
        </div>
      </div>
    </header>
  );
}
