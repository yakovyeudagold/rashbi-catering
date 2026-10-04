import Lenis from "lenis";
import { gsap, prefersReducedMotion, ScrollTrigger } from "./gsap.js";

let lenis = null;
let tick = null;
let lockCount = 0;

export function startSmoothScroll() {
  if (lenis || prefersReducedMotion()) return;

  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    smoothWheel: true,
  });
  lenis.on("scroll", ScrollTrigger.update);
  tick = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  if (lockCount > 0) lenis.stop();
}

export function stopSmoothScroll() {
  if (!lenis) return;
  gsap.ticker.remove(tick);
  lenis.destroy();
  lenis = null;
  tick = null;
}

/** Calls must be balanced: every lockScroll(true) needs one matching lockScroll(false). */
export function lockScroll(locked) {
  lockCount = Math.max(0, lockCount + (locked ? 1 : -1));
  const isLocked = lockCount > 0;
  document.documentElement.classList.toggle("is-scroll-locked", isLocked);
  if (!lenis) return;
  if (isLocked) lenis.stop();
  else lenis.start();
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  else window.scrollTo(0, 0);
}

export function scrollToTarget(target, { immediate = false } = {}) {
  const element =
    typeof target === "string" ? document.getElementById(target.replace(/^#/, "")) : target;
  if (!element) return false;

  const offset = -8;
  if (lenis && !immediate) {
    lenis.scrollTo(element, { offset, duration: 1.4, force: true });
  } else {
    const top = element.getBoundingClientRect().top + window.scrollY + offset;
    if (lenis) lenis.scrollTo(top, { immediate: true, force: true });
    else window.scrollTo({ top, behavior: immediate || prefersReducedMotion() ? "auto" : "smooth" });
  }
  return true;
}
