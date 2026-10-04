import SplitWords from "../components/ui/SplitWords.jsx";
import "./process.css";

const steps = [
  {
    title: "מספרים לנו מה צריך",
    text: "סוג האירוח, מספר האורחים והתאריך — בטופס או בוואטסאפ.",
  },
  {
    title: "מתאימים תפריט",
    text: "בונים יחד תפריט שמתאים לאירוח, לטעם ולתקציב.",
  },
  {
    title: "אנחנו דואגים לשאר",
    text: "מתאמים מועד, הגעה והגשה — ואתם נשארים רגועים.",
  },
];

export default function ProcessSection() {
  return (
    <section className="process" aria-labelledby="process-title">
      <div className="process__inner">
        <p className="eyebrow" data-reveal="14">איך זה עובד</p>
        <h2 id="process-title" className="process__title">
          <SplitWords text="שלושה צעדים לאירוח רגוע" />
        </h2>

        <div className="process__track">
          <span className="process__rail" aria-hidden="true">
            <span data-draw />
          </span>
          <ol className="process__steps">
            {steps.map((step, index) => (
              <li key={step.title} className="process__step" data-reveal="26">
                <span className="process__numeral" aria-hidden="true">
                  {index + 1}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
