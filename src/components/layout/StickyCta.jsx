import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useLocation } from "react-router-dom";
import { whatsappDefault } from "../../data/contact.js";
import SmartLink from "../ui/SmartLink.jsx";
import WhatsAppIcon from "../ui/WhatsAppIcon.jsx";
import "./chrome.css";

export default function StickyCta() {
  const { pathname } = useLocation();
  const [pastHero, setPastHero] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const watched = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) watched.add(entry.target);
          else watched.delete(entry.target);
        });
        setBlocked(watched.size > 0);
      },
      { rootMargin: "0px 0px -12% 0px" },
    );

    const attach = () => {
      document.querySelectorAll("#quote, .site-footer").forEach((el) => observer.observe(el));
    };
    attach();
    const late = setTimeout(attach, 600);

    return () => {
      clearTimeout(late);
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [pathname]);

  const visible = pastHero && !blocked;

  return (
    <div className={`sticky-cta${visible ? " is-visible" : ""}`} aria-hidden={!visible}>
      <div className="sticky-cta__inner" dir="ltr">
        <a
          className="sticky-cta__wa"
          href={whatsappDefault}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="וואטסאפ"
          tabIndex={visible ? 0 : -1}
        >
          <WhatsAppIcon />
        </a>
        <SmartLink to="/#quote" className="sticky-cta__main" tabIndex={visible ? 0 : -1}>
          <ChevronLeft aria-hidden="true" strokeWidth={1.75} />
          <span dir="rtl">קבלת הצעת מחיר</span>
        </SmartLink>
      </div>
    </div>
  );
}
