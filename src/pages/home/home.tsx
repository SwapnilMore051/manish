import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.scss";

const Home = () => {
  const navigate = useNavigate();
  const loginNavigate = () => {
    navigate("/login");
  };

  const images = ["/assets/icons/home-bg.jpg", "/assets/icons/bts3.jpg"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      setCurrentIndex((i) => (i + 1) % images.length);
    }, 4000);
    return () => clearTimeout(id);
  }, [currentIndex, images.length]);

  const goNext = () => {
    setCurrentIndex((i) => (i + 1) % images.length);
  };

  const goPrev = () => {
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  };
  return (
    <div className="home-wrapper">
      {images.map((img, i) => (
        <div
          key={img}
          className={`bg-image ${i === currentIndex ? "active" : ""}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
      <div className="content">
        <div
          className="direction-titles prev"
          role="button"
          tabIndex={0}
          onClick={goPrev}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") goPrev();
          }}
        >
          <img
            src="assets/icons/arrow_left.svg"
            className="navigate-icon"
            alt=""
          />
        </div>
        <div className="main-content">
          <div className="main-heading" onClick={loginNavigate}>
            Welcome
          </div>
          <div className="sub-heading">
            <div className="sub-titles">I bring visuals to life -</div>
            <div className="sub-titles">"Foley is my art"</div>
          </div>
        </div>
        <div
          className="direction-titles next"
          role="button"
          tabIndex={0}
          onClick={goNext}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") goNext();
          }}
        >
          <img
            src="assets/icons/arrow_right.svg"
            className="navigate-icon"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
