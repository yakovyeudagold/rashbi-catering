import { useLayoutEffect, useRef } from "react";
import { gsap, MOTION_OK, ScrollTrigger } from "../motion/gsap.js";
import "./marquee.css";

const rows = [
  ["כשר למהדרין", "אירועים", "שבתות", "נופשים", "משלוחים לכל הצפון"],
  ["בטעם של בית", "צפת והסביבה", "אירוח מוקפד", "תפריט מותאם", "יותר מאוכל"],
];

function Row({ items, variant }) {
  const sequence = [...items, ...items];
  return (
    <div className={`marquee__row marquee__row--${variant}`} dir="ltr">
      <div className="marquee__track">
        {[0, 1].map((copy) => (
          <div className="marquee__set" key={copy} aria-hidden={copy === 1}>
            {sequence.map((item, index) => (
              <span className="marquee__item" key={`${item}-${index}`}>
                <span dir="rtl">{item}</span>
                <span className="marquee__gem" aria-hidden="true" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MarqueeBand() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const mm = gsap.matchMedia(root);

    mm.add(MOTION_OK, () => {
      const [first, second] = root.querySelectorAll(".marquee__track");
      const loops = [
        gsap.fromTo(first, { xPercent: 0 }, { xPercent: -50, duration: 38, ease: "none", repeat: -1 }),
        gsap.fromTo(second, { xPercent: -50 }, { xPercent: 0, duration: 44, ease: "none", repeat: -1 }),
      ];

      const skewTo = gsap.quickTo(root.querySelectorAll(".marquee__row"), "skewX", {
        duration: 0.6,
        ease: "power3.out",
      });

      ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          const boost = 1 + Math.min(Math.abs(velocity) / 260, 6);
          loops.forEach((loop) => {
            gsap.to(loop, { timeScale: boost, duration: 0.2, overwrite: true });
            gsap.to(loop, { timeScale: 1, duration: 1.4, delay: 0.2, ease: "power2.out" });
          });
          skewTo(gsap.utils.clamp(-7, 7, velocity / -260));
        },
        onLeave: () => skewTo(0),
        onLeaveBack: () => skewTo(0),
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={rootRef} className="marquee" aria-label="מה אנחנו עושים">
      <Row items={rows[0]} variant="solid" />
      <Row items={rows[1]} variant="outline" />
    </section>
  );
}
