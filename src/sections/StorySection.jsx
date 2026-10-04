import { CookingPot, HeartHandshake, ShieldCheck } from "lucide-react";
import storyImage from "../assets/images/hero-meat.jpg";
import SplitWords from "../components/ui/SplitWords.jsx";
import { contact } from "../data/contact.js";
import "./story.css";

const values = [
  {
    icon: ShieldCheck,
    title: contact.kashrut,
    text: "כל המנות כשרות למהדרין.",
  },
  {
    icon: CookingPot,
    title: "בטעם של בית",
    text: "אוכל שמבושל כמו בבית — רק בגדול.",
  },
  {
    icon: HeartHandshake,
    title: "יחס אישי",
    text: `שיחה ישירה עם ${contact.owner}, מהפנייה ועד ההגשה.`,
  },
];

export default function StorySection() {
  return (
    <section className="story" aria-labelledby="story-title">
      <div className="story__inner">
        <p className="eyebrow" data-reveal="14">הסיפור שלנו</p>
        <h2 id="story-title" className="story__title">
          <SplitWords text={`המטבח של ${contact.owner}`} />
        </h2>

        <figure className="story__figure" data-image-reveal>
          <img
            src={storyImage}
            alt="צלעות טלה צלויות על מגש כהה עם רוזמרין"
            data-parallax="7"
            loading="lazy"
          />
        </figure>

        <div className="story__copy" data-reveal-group>
          <p>
            כל אירוח אצלנו מתחיל בשיחה אישית — מבינים מה אתם צריכים, ובונים
            יחד תפריט שמתאים בדיוק לאירוע, לשבת או לנופש.
          </p>
          <p>
            אוכל בשרי {contact.kashrut}, בטעם של בית ובהגשה מוקפדת, שמגיע אליכם
            ל{contact.area}.
          </p>
        </div>

        <ul className="story__values" data-reveal-group="0.12">
          {values.map(({ icon: Icon, title, text }) => (
            <li key={title}>
              <span className="story__value-icon" aria-hidden="true">
                <Icon strokeWidth={1.35} />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
