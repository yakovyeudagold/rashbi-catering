import { Menu, Phone } from "lucide-react";
import logo from "../../assets/logos/logo.png";
import { contact, whatsappDefault } from "../../data/contact.js";
import IconButton from "../ui/IconButton.jsx";
import WhatsAppIcon from "../ui/WhatsAppIcon.jsx";
import { useSiteMenu } from "./siteMenuState.js";

export default function Header() {
  const { openMenu } = useSiteMenu();

  return (
    <header className="hero-header" dir="ltr">
      <button type="button" className="hero-menu" aria-label="תפריט" onClick={openMenu}>
        <Menu aria-hidden="true" strokeWidth={1.35} />
      </button>

      <img
        className="hero-logo"
        src={logo}
        alt="קייטרינג הרשב״י"
      />

      <div className="hero-header__actions">
        <IconButton
          icon={Phone}
          label="התקשר"
          href={contact.phoneHref}
          className="hero-icon-btn"
        />
        <IconButton
          icon={WhatsAppIcon}
          label="וואטסאפ"
          href={whatsappDefault}
          className="hero-icon-btn"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </header>
  );
}
