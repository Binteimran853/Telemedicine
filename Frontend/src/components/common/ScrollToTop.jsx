import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation(); // Detects route change

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top whenever route changes
  }, [pathname]);

  return null;
};

export default ScrollToTop;
