import { useLayoutEffect, useRef } from "react";
import SplitWords from "../components/ui/SplitWords.jsx";
import eventsImage from "../assets/images/events.jpg";
import shabbatImage from "../assets/images/shabbat.jpg";
import deliveryImage from "../assets/images/delivery.jpg";
import { gsap, MOTION_OK } from "../motion/gsap.js";
import ServiceCard from "./ServiceCard.jsx";
import "./hospitality.css";

const cards = [
  {
    title: "אירועים",
    lines: [
      "אירוח מוקפד לאירועים",
      "משפחתיים ועסקיים, עם",
      "תפריט שמותאם לאופי האירוע.",
    ],
    href: "/events",
    image: eventsImage,
    alt: "שולחן אירוע ערוך עם מנת בשר וכוסות יין",
    imagePosition: "70% 78%",
  },
  {
    title: "שבתות ונופשים",
    lines: [
      "פתרונות אירוח מלאים",
      "לשבתות, קבוצות ונופשים",
      "בצפון.",
    ],
    href: "/shabbat-vacations",
    image: shabbatImage,
    alt: "שולחן שבת עם חלות, גביע קידוש ונרות",
    imagePosition: "68% 52%",
  },
  {
    title: "משלוחים ואירוח בצפון",
    lines: [
      "אוכל מוכן ואירוח מוקפד",
      "שמגיע אליכם לכל אזור הצפון.",
    ],
    href: "/delivery-north",
    image: deliveryImage,
    alt: "מגשי אירוח ואריזות ממותגות",
    imagePosition: "78% 62%",
  },
];

export default function HospitalitySection() {
  const cardsRef = useRef(null);

  useLayoutEffect(() => {
    const root = cardsRef.current;
    if (!root) return undefined;

    const mm = gsap.matchMedia(root);

    mm.add(MOTION_OK, () => {
      const items = root.querySelectorAll(".service-card");
      // Subtle staggered cascade entrance. Cards rise + settle from a
      // slightly reduced scale; they ALWAYS return to an identical resting
      // state (y:0, scale:1), so all three stay the same size side by side.
      gsap.from(items, {
        yPercent: 9,
        scale: 0.985,
        transformOrigin: "center 80%",
        duration: 1.15,
        ease: "power3.out",
        stagger: 0.14,
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="services"
      className="hospitality"
      aria-labelledby="hospitality-title"
    >
      <div className="hospitality__inner">
        <header className="hospitality__intro">
          <p className="eyebrow eyebrow--center" data-reveal="16">מה אנחנו עושים</p>
          <p className="hospitality__kicker" data-reveal="20">יותר מאוכל.</p>
          <h2 id="hospitality-title">
            <SplitWords text="אנחנו דואגים לאירוח." />
          </h2>
          <p className="hospitality__support" data-reveal="20">
            מהמנות ועד הרגע האחרון — אנחנו דואגים
            <br />
            שהאירוח ירגיש שלם, מסודר ומכובד.
          </p>
        </header>

        <div className="hospitality__cards" ref={cardsRef}>
          {cards.map((card, index) => (
            <ServiceCard key={card.title} index={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
