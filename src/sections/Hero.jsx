import { useLayoutEffect, useRef } from "react";
import { ChevronDown, ChevronLeft, ConciergeBell, MapPin, Star, Truck, Users } from "lucide-react";
import heroMeat from "../assets/images/hero-meat.jpg";
import heroTitle from "../assets/images/hero-title.png";
import Header from "../components/layout/Header.jsx";
import IconButton from "../components/ui/IconButton.jsx";
import SmartLink from "../components/ui/SmartLink.jsx";
import { gsap, MOTION_OK } from "../motion/gsap.js";
import { onIntroDone } from "../motion/intro.js";
import { scrollToTarget } from "../motion/smoothScroll.js";
import HeroFeature from "./HeroFeature.jsx";
import "./hero.css";

function useHeroMotion(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    const mm = gsap.matchMedia(root);
    let stopListening = () => {};

    mm.add(MOTION_OK, () => {
      gsap.set(".hero-logo", { xPercent: -50, yPercent: -50, x: 0, y: 0 });
      const entrance = gsap
        .timeline({ paused: true, defaults: { ease: "power3.out" } })
        .from(".hero__media img", { scale: 1.22, duration: 2.8, ease: "power2.out" })
        .from(".hero__overlay", { opacity: 0.4, duration: 2 }, 0)
        .from(".hero-header > *", { autoAlpha: 0, y: -14, duration: 0.9, stagger: 0.08 }, 0.15)
        .fromTo(
          ".hero__title-img",
          { clipPath: "inset(0% 0% 100% 0%)", y: 26 },
          { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 1.3, ease: "expo.out" },
          0.35,
        )
        .from(".hero__lead", { autoAlpha: 0, y: 18, duration: 1 }, 0.7)
        .from(".hero-divider", { scaleX: 0, duration: 0.9, stagger: 0.2 }, 0.85)
        .from(".hero-feature", { autoAlpha: 0, y: 16, duration: 0.8, stagger: 0.08 }, 0.9)
        .from(".hero-cta", { autoAlpha: 0, y: 18, scale: 0.96, duration: 0.9 }, 1.15)
        .from(".hero__signature", { autoAlpha: 0, y: 10, duration: 0.9 }, 1.3)
        .from(".hero-foot", { autoAlpha: 0, duration: 1 }, 1.4);

      stopListening = onIntroDone(() => entrance.play());

      gsap.to(".hero__media", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero__copy", {
        y: -70,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "70% top", scrub: true },
      });
      gsap.to(".hero-foot", {
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "25% top", scrub: true },
      });
    });

    return () => {
      stopListening();
      mm.revert();
    };
  }, [rootRef]);
}

const features = [
  { icon: Star, title: "כשר למהדרין", text: "בטעם של בית" },
  { icon: Users, title: "אירועים", text: "בכל גודל" },
  { icon: ConciergeBell, title: "שבתות", text: "ונופשים" },
  { icon: Truck, title: "משלוחים", text: "לכל הצפון" },
];

export default function Hero() {
  const rootRef = useRef(null);
  useHeroMotion(rootRef);

  return (
    <section ref={rootRef} className="hero" aria-label="פתיח">
      <div className="hero__media" aria-hidden="true">
        <img
          src={heroMeat}
          alt=""
          fetchPriority="high"
        />
        <div className="hero__overlay" />
      </div>

      <div className="hero__content">
        <Header />

        <div className="hero__copy">
          <h1 className="hero__title">
            <img
              className="hero__title-img"
              src={heroTitle}
              alt="אירוח יהודי בגובה אחר"
              width={668}
              height={276}
              decoding="async"
            />
          </h1>

          <p className="hero__lead">
            קייטרינג בשרי כשר למהדרין בצפת
            <br />
            לאירועים, שבתות ונופשים בצפון
          </p>

          <hr className="hero-divider" />

          <ul className="hero-features">
            {features.map((feature) => (
              <HeroFeature key={feature.title} {...feature} />
            ))}
          </ul>

          <SmartLink className="hero-cta" to="/#quote" dir="ltr">
            <ChevronLeft aria-hidden="true" strokeWidth={1.75} />
            <span dir="rtl">קבלת הצעת מחיר</span>
          </SmartLink>

          <p className="hero__signature">יותר מאוכל. זה אירוח.</p>
          <hr className="hero-divider hero-divider--small" />
        </div>

        <div className="hero__food-space" aria-hidden="true" />

        <div className="hero-foot" dir="ltr">
          <p className="hero-location">
            <MapPin aria-hidden="true" strokeWidth={1.5} />
            <span dir="rtl">צפת והסביבה</span>
          </p>

          <div className="hero-scroll">
            <span className="hero-scroll__line" aria-hidden="true" />
            <span>SCROLL</span>
          </div>

          <IconButton
            icon={ChevronDown}
            label="גלול למטה"
            className="hero-icon-btn hero-scroll-btn"
            onClick={() => scrollToTarget("services")}
          />
        </div>
      </div>
    </section>
  );
}
