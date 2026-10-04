import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import SplitWords from "../components/ui/SplitWords.jsx";
import { businessVideo } from "../data/media.js";
import { gsap, MOTION_OK } from "../motion/gsap.js";
import { lockScroll } from "../motion/smoothScroll.js";
import "./video.css";

function VideoLightbox({ open, onClose }) {
  const videoRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const video = videoRef.current;
    lockScroll(true);
    closeRef.current?.focus();
    video?.play().catch(() => {});
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      video?.pause();
      lockScroll(false);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="video-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="סרטון העסק"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        className="video-lightbox__close"
        aria-label="סגירת הסרטון"
        onClick={onClose}
      >
        <X aria-hidden="true" strokeWidth={1.5} />
      </button>
      <video
        ref={videoRef}
        className="video-lightbox__player"
        src={businessVideo.src}
        poster={businessVideo.poster ?? undefined}
        controls
        playsInline
        onClick={(event) => event.stopPropagation()}
      />
    </div>
  );
}

function VideoFrame() {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const [open, setOpen] = useState(false);
  const closeLightbox = useCallback(() => setOpen(false), []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const mm = gsap.matchMedia(root);
    mm.add(MOTION_OK, () => {
      gsap.fromTo(
        ".video-section__frame",
        { clipPath: "inset(9% 7% 9% 7% round 2.2rem)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 1.15rem)",
          ease: "none",
          scrollTrigger: { trigger: ".video-section__frame", start: "top 92%", end: "center 55%", scrub: true },
        },
      );
      gsap.fromTo(
        ".video-section__frame video",
        { scale: 1.25 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: ".video-section__frame", start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });
    return () => mm.revert();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !open) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.35 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [open]);

  return (
    <section ref={rootRef} id="video" className="video-section" aria-labelledby="video-title">
      <div className="video-section__inner">
        <p className="eyebrow eyebrow--center" data-reveal="14">מאחורי הקלעים</p>
        <h2 id="video-title" className="video-section__title">
          <SplitWords text="רגע מהמטבח" />
        </h2>

        <div className="video-section__frame">
          <video
            ref={videoRef}
            src={businessVideo.src}
            poster={businessVideo.poster ?? undefined}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
          <div className="video-section__shade" aria-hidden="true" />
          <button type="button" className="video-section__play" onClick={() => setOpen(true)}>
            <span className="video-section__play-ring" aria-hidden="true">
              <Play strokeWidth={1.5} />
            </span>
            <span>לצפייה בסרטון</span>
          </button>
        </div>
      </div>

      <VideoLightbox open={open} onClose={closeLightbox} />
    </section>
  );
}

export default function VideoSection() {
  if (businessVideo.src) return <VideoFrame />;
  if (!import.meta.env.DEV) return null;

  return (
    <section id="video" className="video-section" aria-label="מקום לסרטון">
      <div className="video-section__inner">
        <div className="dev-slot video-section__placeholder">
          <strong>כאן יופיע סרטון העסק</strong>
          <span>שימו את הקובץ בתיקייה public/videos ועדכנו את:</span>
          <code>src/data/media.js</code>
          <span>(מוצג רק בזמן פיתוח — באתר החי הסקשן מוסתר עד שיש סרטון)</span>
        </div>
      </div>
    </section>
  );
}
