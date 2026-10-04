import { useEffect, useLayoutEffect, useRef } from "react";
import { Phone, X } from "lucide-react";
import logo from "../../assets/logos/logo.png";
import { contact, whatsappDefault } from "../../data/contact.js";
import { navigation } from "../../data/navigation.js";
import { gsap, prefersReducedMotion } from "../../motion/gsap.js";
import { lockScroll } from "../../motion/smoothScroll.js";
import SmartLink from "../ui/SmartLink.jsx";
import WhatsAppIcon from "../ui/WhatsAppIcon.jsx";
import { useSiteMenu } from "./siteMenuState.js";
import "./site-menu.css";

export default function SiteMenu() {
  const { open, closeMenu } = useSiteMenu();
  const rootRef = useRef(null);
  const closeRef = useRef(null);
  const timelineRef = useRef(null);
  const returnFocusRef = useRef(null);
  const wasOpenRef = useRef(false);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const ctx = gsap.context(() => {
      timelineRef.current = gsap
        .timeline({ paused: true })
        .set(root, { autoAlpha: 1 })
        .fromTo(
          root,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.85, ease: "expo.inOut" },
        )
        .from(
          ".site-menu__label",
          { yPercent: 110, duration: 0.8, ease: "power4.out", stagger: 0.055 },
          "-=0.35",
        )
        .from(
          ".site-menu__index, .site-menu__foot > *",
          { autoAlpha: 0, y: 14, duration: 0.6, ease: "power3.out", stagger: 0.04 },
          "-=0.6",
        );
    }, root);

    return () => {
      timelineRef.current = null;
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return undefined;
    if (!open && !wasOpenRef.current) return undefined;
    wasOpenRef.current = open;

    lockScroll(open);
    if (open) {
      returnFocusRef.current = document.activeElement;
      timeline.timeScale(prefersReducedMotion() ? 12 : 1).play();
      const focus = setTimeout(() => closeRef.current?.focus(), 120);
      const onKey = (event) => {
        if (event.key === "Escape") closeMenu();
      };
      window.addEventListener("keydown", onKey);
      return () => {
        clearTimeout(focus);
        window.removeEventListener("keydown", onKey);
      };
    }

    timeline.timeScale(prefersReducedMotion() ? 12 : 1.6).reverse();
    returnFocusRef.current?.focus?.({ preventScroll: true });
    return undefined;
  }, [open, closeMenu]);

  return (
    <div
      ref={rootRef}
      className="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="תפריט ניווט"
      inert={!open}
    >
      <div className="site-menu__bar" dir="ltr">
        <button
          ref={closeRef}
          type="button"
          className="site-menu__round"
          aria-label="סגירת התפריט"
          onClick={closeMenu}
        >
          <X aria-hidden="true" strokeWidth={1.3} />
        </button>
        <img className="site-menu__logo" src={logo} alt="קייטרינג הרשב״י" />
        <a
          className="site-menu__round"
          href={whatsappDefault}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="וואטסאפ"
        >
          <WhatsAppIcon />
        </a>
      </div>

      <nav className="site-menu__nav" aria-label="ניווט ראשי">
        <ol>
          {navigation.map((item, index) => (
            <li key={item.to}>
              <SmartLink to={item.to} onClick={closeMenu} className="site-menu__link">
                <span className="site-menu__index">{String(index + 1).padStart(2, "0")}</span>
                <span className="site-menu__line">
                  <span className="site-menu__label">{item.label}</span>
                </span>
              </SmartLink>
            </li>
          ))}
        </ol>
      </nav>

      <div className="site-menu__foot">
        <p className="site-menu__owner">
          {contact.owner} · <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
        </p>
        <div className="site-menu__pills">
          <a className="site-menu__pill" href={contact.phoneHref}>
            <Phone aria-hidden="true" strokeWidth={1.5} />
            <span>חיוג</span>
          </a>
          <a
            className="site-menu__pill"
            href={whatsappDefault}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon />
            <span>WhatsApp</span>
          </a>
        </div>
        <p className="site-menu__meta">
          {contact.kashrut} · {contact.area}
        </p>
      </div>
    </div>
  );
}
