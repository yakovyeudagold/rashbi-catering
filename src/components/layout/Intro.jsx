import { useLayoutEffect, useRef, useState } from "react";
import logo from "../../assets/logos/logo.png";
import { gsap, prefersReducedMotion } from "../../motion/gsap.js";
import { lockScroll } from "../../motion/smoothScroll.js";
import { markIntroDone } from "../../motion/intro.js";
import "./intro.css";

const SEEN_KEY = "rashbi-intro-seen";

function shouldPlay() {
  if (prefersReducedMotion()) return false;
  try {
    return !sessionStorage.getItem(SEEN_KEY);
  } catch {
    return true;
  }
}

export default function Intro() {
  const rootRef = useRef(null);
  const [active] = useState(shouldPlay);

  useLayoutEffect(() => {
    if (!active) {
      markIntroDone();
      return undefined;
    }

    const root = rootRef.current;
    let locked = true;
    const release = () => {
      if (!locked) return;
      locked = false;
      lockScroll(false);
    };
    lockScroll(true);
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          onComplete: () => {
            release();
            root.style.display = "none";
          },
        })
        .from(".intro__logo", {
          autoAlpha: 0,
          scale: 0.92,
          filter: "blur(6px)",
          duration: 0.9,
          ease: "power3.out",
        })
        .fromTo(
          ".intro__line",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.7, ease: "power2.inOut" },
          "-=0.35",
        )
        .to(".intro__content", {
          autoAlpha: 0,
          y: -24,
          duration: 0.45,
          ease: "power2.in",
          delay: 0.15,
        })
        .add(() => {
          markIntroDone();
          try {
            sessionStorage.setItem(SEEN_KEY, "1");
          } catch {
            // Storage can be unavailable in private browsing; the intro simply plays again.
          }
        })
        .to(root, { yPercent: -100, duration: 0.95, ease: "expo.inOut" }, "-=0.1");
    }, root);

    return () => {
      ctx.revert();
      release();
    };
  }, [active]);

  if (!active) return null;

  return (
    <div ref={rootRef} className="intro" aria-hidden="true">
      <div className="intro__content">
        <img className="intro__logo" src={logo} alt="" />
        <span className="intro__line" />
      </div>
    </div>
  );
}
