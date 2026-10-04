import { useId, useState } from "react";
import { Plus } from "lucide-react";
import SplitWords from "../components/ui/SplitWords.jsx";
import { faq } from "../data/faq.js";
import { ScrollTrigger } from "../motion/gsap.js";
import "./faq.css";

function FaqItem({ question, answer, open, onToggle }) {
  const id = useId();
  return (
    <li className={`faq__item${open ? " is-open" : ""}`}>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-answer`}
          id={`${id}-question`}
          onClick={onToggle}
        >
          <span>{question}</span>
          <Plus className="faq__icon" aria-hidden="true" strokeWidth={1.4} />
        </button>
      </h3>
      <div
        className="faq__answer"
        id={`${id}-answer`}
        role="region"
        aria-labelledby={`${id}-question`}
        onTransitionEnd={() => ScrollTrigger.refresh()}
      >
        <div>
          <p>{answer}</p>
        </div>
      </div>
    </li>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="faq" aria-labelledby="faq-title">
      <div className="faq__inner">
        <p className="eyebrow" data-reveal="14">שאלות נפוצות</p>
        <h2 id="faq-title" className="faq__title">
          <SplitWords text="כל מה שרציתם לדעת" />
        </h2>

        <ul className="faq__list" data-reveal-group="0.07">
          {faq.map((item, index) => (
            <FaqItem
              key={item.question}
              {...item}
              open={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
