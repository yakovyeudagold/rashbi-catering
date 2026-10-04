import { useRef } from "react";
import useScrollFx from "../motion/useScrollFx.js";
import FaqSection from "../sections/FaqSection.jsx";
import Hero from "../sections/Hero.jsx";
import HospitalitySection from "../sections/HospitalitySection.jsx";
import KitchenGallerySection from "../sections/KitchenGallerySection.jsx";
import MarqueeBand from "../sections/MarqueeBand.jsx";
import MenuTeaser from "../sections/MenuTeaser.jsx";
import ProcessSection from "../sections/ProcessSection.jsx";
import QuoteSection from "../sections/QuoteSection.jsx";
import StorySection from "../sections/StorySection.jsx";
import TestimonialsSection from "../sections/TestimonialsSection.jsx";
import VideoSection from "../sections/VideoSection.jsx";

export default function HomePage() {
  const rootRef = useRef(null);
  useScrollFx(rootRef);

  return (
    <main ref={rootRef}>
      <Hero />
      <MarqueeBand />
      <HospitalitySection />
      <StorySection />
      <VideoSection />
      <KitchenGallerySection />
      <MenuTeaser />
      <ProcessSection />
      <TestimonialsSection />
      <FaqSection />
      <QuoteSection />
    </main>
  );
}
