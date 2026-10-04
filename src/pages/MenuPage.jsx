import { useRef } from "react";
import { Link } from "react-router-dom";
import useScrollFx from "../motion/useScrollFx.js";
import MenuSection from "../sections/MenuSection.jsx";

export default function MenuPage() {
  const rootRef = useRef(null);
  useScrollFx(rootRef);

  return (
    <main ref={rootRef} className="menu-page page-shell">
      <nav className="menu-page__crumbs" aria-label="מיקום באתר">
        <Link to="/">בית</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">התפריט המלא</span>
      </nav>
      <MenuSection />
    </main>
  );
}
