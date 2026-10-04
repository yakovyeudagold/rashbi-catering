import { useLayoutEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SmartLink from "../components/ui/SmartLink.jsx";
import { menuCategories } from "../data/menu.js";
import "./menu.css";

export default function MenuSection() {
  const [searchParams] = useSearchParams();
  const [activeId, setActiveId] = useState(() => {
    const requested = searchParams.get("cat");
    return menuCategories.some((category) => category.id === requested)
      ? requested
      : menuCategories[0].id;
  });
  const scrollY = useRef(null);
  const active = menuCategories.find((category) => category.id === activeId);

  useLayoutEffect(() => {
    if (scrollY.current == null) return;
    window.scrollTo(0, scrollY.current);
    scrollY.current = null;
  }, [activeId]);

  function selectCategory(id) {
    if (id === activeId) return;
    scrollY.current = window.scrollY;
    setActiveId(id);
  }

  return (
    <section className="menu" id="menu" aria-labelledby="menu-title">
      <div className="menu__inner">
        <header className="menu__intro">
          <hr className="menu__divider" data-reveal="10" />
          <h1 id="menu-title" data-reveal="22">מה מגישים?</h1>
          <p data-reveal="18" data-reveal-delay="0.1">מבחר עשיר של מנות לאירוח, שבתות ואירועים.</p>
        </header>

        <div className="menu__nav" role="tablist" aria-label="קטגוריות תפריט">
          {menuCategories.map((category) => {
            const selected = category.id === activeId;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                id={`menu-tab-${category.id}`}
                aria-selected={selected}
                aria-controls="menu-panel"
                tabIndex={selected ? 0 : -1}
                className={selected ? "is-active" : undefined}
                onClick={() => selectCategory(category.id)}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <div
          className="menu__panel"
          id="menu-panel"
          role="tabpanel"
          aria-labelledby={`menu-tab-${active.id}`}
        >
          <ul className="menu__list">
            {active.items.map((item) => (
              <li key={item}>
                <span className="menu__mark" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="menu__cta">
          <p>מחפשים תפריט שמתאים בדיוק לאירוע שלכם?</p>
          <SmartLink to="/#quote">דברו איתנו להתאמת תפריט</SmartLink>
        </div>
      </div>
    </section>
  );
}
