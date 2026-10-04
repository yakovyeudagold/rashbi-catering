import { useEffect, useLayoutEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/layout/Footer.jsx";
import Intro from "./components/layout/Intro.jsx";
import SiteMenuProvider from "./components/layout/SiteMenuContext.jsx";
import StickyCta from "./components/layout/StickyCta.jsx";
import TopBar from "./components/layout/TopBar.jsx";
import { services } from "./data/services.js";
import { ScrollTrigger } from "./motion/gsap.js";
import {
  scrollToTarget,
  scrollToTop,
  startSmoothScroll,
  stopSmoothScroll,
} from "./motion/smoothScroll.js";
import HomePage from "./pages/HomePage.jsx";
import MenuPage from "./pages/MenuPage.jsx";
import ServiceDetailPage from "./sections/ServiceDetailPage.jsx";

function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    ScrollTrigger.refresh();
    if (!hash) {
      scrollToTop();
      return undefined;
    }

    const jump = () => {
      ScrollTrigger.refresh();
      scrollToTarget(hash, { immediate: true });
    };
    jump();
    const frame = requestAnimationFrame(jump);
    const onLoad = () => jump();
    if (document.readyState !== "complete") {
      window.addEventListener("load", onLoad, { once: true });
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", onLoad);
    };
  }, [pathname, hash, key]);

  return null;
}

function Chrome() {
  const { pathname } = useLocation();
  return (
    <>
      <TopBar key={pathname} revealAfterViewport={pathname === "/" ? 0.9 : 0} />
      <StickyCta />
    </>
  );
}

export default function App() {
  useEffect(() => {
    startSmoothScroll();
    return stopSmoothScroll;
  }, []);

  return (
    <BrowserRouter>
      <SiteMenuProvider>
        <Intro />
        <ScrollManager />
        <Chrome />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          {services.map((service) => (
            <Route
              key={service.path}
              path={service.path}
              element={<ServiceDetailPage key={service.path} service={service} />}
            />
          ))}
        </Routes>
        <Footer />
      </SiteMenuProvider>
    </BrowserRouter>
  );
}
