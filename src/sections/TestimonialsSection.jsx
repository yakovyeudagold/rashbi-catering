import { Quote } from "lucide-react";
import SplitWords from "../components/ui/SplitWords.jsx";
import { testimonials } from "../data/testimonials.js";
import "./testimonials.css";

export default function TestimonialsSection() {
  if (testimonials.length === 0) {
    if (!import.meta.env.DEV) return null;
    return (
      <section className="testimonials" aria-label="מקום להמלצות">
        <div className="testimonials__inner">
          <div className="dev-slot">
            <strong>כאן יופיעו המלצות של לקוחות</strong>
            <span>הוסיפו המלצות אמיתיות לקובץ:</span>
            <code>src/data/testimonials.js</code>
            <span>(מוצג רק בזמן פיתוח — באתר החי הסקשן מוסתר עד שיש המלצות)</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="testimonials" aria-labelledby="testimonials-title">
      <div className="testimonials__inner">
        <p className="eyebrow" data-reveal="14">מה אומרים עלינו</p>
        <h2 id="testimonials-title" className="testimonials__title">
          <SplitWords text="אורחים מספרים" />
        </h2>
      </div>

      <ul className="testimonials__track" data-reveal-group="0.1">
        {testimonials.map((item) => (
          <li key={`${item.name}-${item.quote.slice(0, 12)}`} className="testimonials__card">
            <Quote className="testimonials__mark" aria-hidden="true" strokeWidth={1.2} />
            <blockquote>{item.quote}</blockquote>
            <p className="testimonials__by">
              <strong>{item.name}</strong>
              {item.occasion ? <span>{item.occasion}</span> : null}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
