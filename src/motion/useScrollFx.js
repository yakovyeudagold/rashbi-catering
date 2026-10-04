import { useLayoutEffect } from "react";
import { gsap, MOTION_OK, ScrollTrigger } from "./gsap.js";

const EASE = "power3.out";

function setupReveals(root) {
  root.querySelectorAll("[data-reveal]").forEach((element) => {
    gsap.from(element, {
      y: Number(element.dataset.reveal) || 32,
      autoAlpha: 0,
      duration: 1.1,
      delay: Number(element.dataset.revealDelay) || 0,
      ease: EASE,
      scrollTrigger: { trigger: element, start: "top 88%", once: true },
    });
  });

  root.querySelectorAll("[data-reveal-group]").forEach((group) => {
    gsap.from(group.children, {
      y: 28,
      autoAlpha: 0,
      duration: 0.9,
      ease: EASE,
      stagger: Number(group.dataset.revealGroup) || 0.09,
      scrollTrigger: { trigger: group, start: "top 86%", once: true },
    });
  });

  root.querySelectorAll("[data-split]").forEach((element) => {
    gsap.from(element.querySelectorAll(".split-word__inner"), {
      yPercent: 115,
      rotate: 4,
      duration: 1.05,
      ease: "power4.out",
      stagger: 0.07,
      scrollTrigger: { trigger: element, start: "top 90%", once: true },
    });
  });
}

function setupImages(root) {
  root.querySelectorAll("[data-image-reveal]").forEach((frame) => {
    const image = frame.querySelector("img, video");
    const timeline = gsap.timeline({
      scrollTrigger: { trigger: frame, start: "top 85%", once: true },
    });
    timeline.fromTo(
      frame,
      { clipPath: "inset(100% 0% 0% 0% round 1.15rem)" },
      { clipPath: "inset(0% 0% 0% 0% round 1.15rem)", duration: 1.35, ease: "expo.out" },
    );
    if (image) {
      timeline.from(image, { scale: 1.32, duration: 1.8, ease: "expo.out" }, 0);
    }
  });

  root.querySelectorAll("[data-parallax]").forEach((element) => {
    const amount = Number(element.dataset.parallax) || 12;
    gsap.fromTo(
      element,
      { yPercent: -amount },
      {
        yPercent: amount,
        ease: "none",
        scrollTrigger: {
          trigger: element.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  });

  root.querySelectorAll("[data-draw]").forEach((line) => {
    gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        transformOrigin: "top center",
        scrollTrigger: {
          trigger: line.parentElement,
          start: "top 70%",
          end: "bottom 60%",
          scrub: true,
        },
      },
    );
  });
}

export default function useScrollFx(rootRef, deps = []) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      setupReveals(root);
      setupImages(root);
    });

    const refresh = () => ScrollTrigger.refresh();
    const images = [...root.querySelectorAll("img")].filter((image) => !image.complete);
    images.forEach((image) => image.addEventListener("load", refresh, { once: true }));
    const frame = requestAnimationFrame(refresh);

    return () => {
      cancelAnimationFrame(frame);
      images.forEach((image) => image.removeEventListener("load", refresh));
      mm.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
