import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Allow time for the page to render, then scroll to the element with offset for navbar
      setTimeout(() => {
        const el = document.getElementById(hash.replace("#", ""));
        if (el) {
          const navbarHeight = 72;
          const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, left: 0 });
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
