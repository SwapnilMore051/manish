import "./appheader.scss";
import { useState, useEffect } from "react";

const Appheader = () => {
  const [activeSection, setActiveSection] = useState("home");
  const sections = ["home", "videos", "audios", "about", "contact"];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3, // 30% of section must be visible
    };

    const observer = new IntersectionObserver((entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visibleEntries.length > 0) {
        setActiveSection(visibleEntries[0].target.id);
      }
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app-header">
      <div className="profile">
        <img src="/assets/logo.png" alt="Logo" width={30} />
        <div className="artist-name">Manish More</div>
        <div className="artist-title">
          Foley Artist / Assistant recordist / Boom Operator
        </div>
      </div>
      <div className="menu">
        {sections.map((section) => (
          <div
            key={section}
            className={`menu-option ${
              activeSection === section ? "active" : ""
            }`}
            onClick={() => scrollToSection(section)}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appheader;
