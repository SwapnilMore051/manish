import { useState, useEffect } from "react";
import "./bts.scss";

const BehindTheScene = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const btsImages = [
    "bts1.jpg",
    "bts2.jpg",
    "bts4.jpg",
    "bts5.jpg",
    "bts3.jpg",
  ];

  const handleImageClick = (image: string) => {
    const index = btsImages.findIndex((img) => img === image);
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const handleNextImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prevIndex) =>
        prevIndex === btsImages.length - 1 ? 0 : prevIndex! + 1
      );
    }
  };

  const handlePreviousImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prevIndex) =>
        prevIndex === 0 ? btsImages.length - 1 : prevIndex! - 1
      );
    }
  };

  const currentImage =
    selectedIndex !== null ? btsImages[selectedIndex] : null;

  // Optional: Allow ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "ArrowLeft") handlePreviousImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <div className="bts-wrapper">
      <div className="title">Behind The Scene</div>

      <div className="bts-image-container">
        {btsImages.map((image, index) => (
          <div key={index} onClick={() => setSelectedIndex(index)}>
            <img
              className="bts-image"
              src={`/assets/icons/${image}`}
              alt="behind the scene"
              onClick={handleImageClick.bind(null, image)}
            />
          </div>
        ))}
      </div>

      <div className="bts-video-container">{/* Optional videos */}</div>

      {currentImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <img
            className="modal-image"
            src={`/assets/icons/${currentImage}`}
            alt="Full size"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="modal-buttons" onClick={(e) => e.stopPropagation()}>
            <button onClick={handlePreviousImage}>⟵ Previous</button>
            <button onClick={handleNextImage}>Next ⟶</button>
            <button className="close-btn" onClick={closeModal}>
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BehindTheScene;
