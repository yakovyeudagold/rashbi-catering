import SplitWords from "../components/ui/SplitWords.jsx";
import eventsImage from "../assets/images/events.jpg";
import shabbatImage from "../assets/images/shabbat.jpg";
import deliveryImage from "../assets/images/delivery.jpg";
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

        <div className="hospitality__cards">
          {cards.map((card, index) => (
            <ServiceCard key={card.title} index={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
