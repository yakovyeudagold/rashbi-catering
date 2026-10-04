import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SplitWords from "../components/ui/SplitWords.jsx";
import { menuCategories } from "../data/menu.js";
import "./menu-teaser.css";

export default function MenuTeaser() {
  return (
    <section className="menu-teaser" aria-labelledby="menu-teaser-title">
      <div className="menu-teaser__inner">
        <p className="eyebrow" data-reveal="14">התפריט</p>
        <h2 id="menu-teaser-title" className="menu-teaser__title">
          <SplitWords text="מה מגישים?" />
        </h2>
        <p className="menu-teaser__lead" data-reveal="18">
          מבחר עשיר של מנות לאירוח, שבתות ואירועים — בוחרים יחד מה עולה לשולחן.
        </p>

        <ol className="menu-teaser__list" data-reveal-group="0.1">
          {menuCategories.map((category, index) => (
            <li key={category.id}>
              <Link to={`/menu?cat=${category.id}`} className="menu-teaser__row">
                <span className="menu-teaser__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="menu-teaser__body">
                  <span className="menu-teaser__label">{category.label}</span>
                  <span className="menu-teaser__sample">
                    {category.items.slice(0, 3).join(" · ")}
                  </span>
                </span>
                <span className="menu-teaser__count">
                  {category.items.length} מנות
                </span>
                <ArrowLeft className="menu-teaser__arrow" aria-hidden="true" strokeWidth={1.4} />
              </Link>
            </li>
          ))}
        </ol>

        <Link to="/menu" className="menu-teaser__all" dir="ltr" data-reveal="14">
          <ArrowLeft aria-hidden="true" strokeWidth={1.6} />
          <span dir="rtl">לתפריט המלא</span>
        </Link>
      </div>
    </section>
  );
}
