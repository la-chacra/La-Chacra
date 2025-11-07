import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const ScrollButton = () => {
  const sectionRefs = useRef([]);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const allSections = Array.from(document.querySelectorAll("section"));
    sectionRefs.current = allSections.filter(
      (section) => section.id !== "footer"
    );

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sections = sectionRefs.current;
      const lastSection = sections[sections.length - 1];

      if (lastSection && scrollY >= lastSection.offsetTop - 50) {
        setAtEnd(true);
      } else {
        setAtEnd(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToNext = () => {
    const sections = sectionRefs.current;
    if (!sections.length) return;

    const scrollY = window.scrollY;
    const nextIndex = sections.findIndex(
      (section) => section.offsetTop > scrollY + 10
    );

    if (nextIndex === -1) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setAtEnd(false);
      return;
    }

    const targetSection = sections[nextIndex];
    targetSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToNext}
      className="sb-button"
      aria-label={atEnd ? "Scroll to top" : "Scroll to next section"}
    >
      <FontAwesomeIcon
        icon={atEnd ? faChevronUp : faChevronDown}
        className="sb-icon"
      />
    </button>
  );
};

export default ScrollButton;
