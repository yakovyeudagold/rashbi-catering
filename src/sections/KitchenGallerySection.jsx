import { useLayoutEffect, useRef } from "react";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import eventsImage from "../assets/images/events.jpg";
import featureImage from "../assets/images/gallery-feature.jpg";
import shabbatImage from "../assets/images/shabbat.jpg";
import tableImage from "../assets/images/gallery-table.jpg";
import deliveryImage from "../assets/images/delivery.jpg";
import buffetImage from "../assets/images/gallery-buffet.jpg";
import SplitWords from "../components/ui/SplitWords.jsx";
import { gsap, MOTION_OK } from "../motion/gsap.js";
import "./kitchen-gallery.css";

const shots = [
  {
    src: eventsImage,
    caption: "שולחן אירוע ערוך",
    alt: "מנת צלעות טלה על צלחת כהה בשולחן אירוע עם כוסות יין ונרות",
    position: "66% 70%",
  },
  {
    src: featureImage,
    caption: "מגשי אירוח",
    alt: "מבחר נשנושים, סמוסה, צ'יפס ומיני המבורגרים בהגשה צפופה",
    position: "50% 62%",
  },
  {
    src: shabbatImage,
    caption: "שולחן שבת",
    alt: "חלות קלועות, גביע קידוש ונרות דולקים על שולחן שבת",
    position: "60% 60%",
  },
  {
    src: tableImage,
    caption: "בופה לאירוע",
    alt: "שולחן בופה ערוך עם סלטים, מאפים, ראפים ומיני המבורגרים",
    position: "42% 58%",
  },
  {
    src: deliveryImage,
    caption: "משלוחים ואירוח",
    alt: "מגשי אוכל חם באריזות ממותגות של קייטרינג הרשב״י",
    position: "56% 70%",
  },
  {
    src: buffetImage,
    caption: "טעימה מהמטבח",
    alt: "בופה רחב עם סלטים, מאפים, צ'יפס ומיני המבורגרים",
    position: "34% 70%",
  },
];

function useHorizontalScrub(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    const mm = gsap.matchMedia(root);

    mm.add(MOTION_OK, () => {
      root.classList.add("kitchen--scrub");
      const stage = root.querySelector(".kitchen__stage");
      const viewport = root.querySelector(".kitchen__viewport");
      const track = root.querySelector(".kitchen__track");
      const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: () => `+=${distance() * 1.15}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(track, { x: () => distance() }, 0)
        .fromTo(".kitchen__frame img", { xPercent: 7 }, { xPercent: -7 }, 0)
        .fromTo(".kitchen__progress span", { scaleX: 0 }, { scaleX: 1 }, 0);

      return () => root.classList.remove("kitchen--scrub");
    });

    return () => mm.revert();
  }, [rootRef]);
}

export default function KitchenGallerySection() {
  const rootRef = useRef(null);
  useHorizontalScrub(rootRef);

  return (
    <section ref={rootRef} className="kitchen" aria-labelledby="kitchen-title">
      <div className="kitchen__stage">
        <header className="kitchen__intro">
          <p className="eyebrow eyebrow--center" data-reveal="14">גלריה</p>
          <h2 id="kitchen-title">
            <SplitWords text="טעימה מהמטבח" />
          </h2>
          <p data-reveal="18">
            לא צריך להסביר יותר מדי.
            <br />
            האוכל מדבר בעד עצמו.
          </p>
        </header>

        <div className="kitchen__viewport" tabIndex={0} aria-label="גלריית תמונות">
          <ul className="kitchen__track" data-reveal-group="0.08">
            {shots.map((shot, index) => (
              <li className="kitchen__frame" key={shot.caption}>
                <figure>
                  <div className="kitchen__image">
                    <img
                      src={shot.src}
                      alt={shot.alt}
                      loading="lazy"
                      style={{ objectPosition: shot.position }}
                    />
                  </div>
                  <figcaption>
                    <span className="kitchen__index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {shot.caption}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>

        <div className="kitchen__progress" aria-hidden="true">
          <span />
        </div>

        <div className="kitchen__cta">
          <p>רוצים לראות מה מגישים?</p>
          <Link to="/menu" className="kitchen__cta-link" dir="ltr">
            <ChevronLeft aria-hidden="true" strokeWidth={1.6} />
            <span dir="rtl">לתפריט המלא</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
