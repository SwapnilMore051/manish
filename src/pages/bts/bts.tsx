import { useState, useEffect } from "react";
import "./bts.scss";

const BehindTheScene = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const btsMedia = [
    { type: "image", src: "bts1.jpg" },
    { type: "image", src: "bts2.jpg" },
    { type: "image", src: "bts4.jpg" },
    { type: "image", src: "bts5.jpg" },
    { type: "image", src: "bts3.jpg" },
    { type: "image", src: "bts6.jpeg" },
    { type: "video", src: "manish_vid1.mp4" },
    { type: "video", src: "manish_vid2.mp4" },
    {
      type: "video",
      src: "https://res.cloudinary.com/didtglcy3/video/upload/q_auto,f_auto/video_20251231_120519_wtatrx",
      poster:
        "https://res.cloudinary.com/didtglcy3/video/upload/so_1/video_20251231_120519_wtatrx.jpg",
    },
  ];

  const handleMediaClick = (index: number) => {
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const handleNextMedia = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prevIndex) =>
        prevIndex === btsMedia.length - 1 ? 0 : prevIndex! + 1
      );
    }
  };

  const handlePreviousMedia = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prevIndex) =>
        prevIndex === 0 ? btsMedia.length - 1 : prevIndex! - 1
      );
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") handleNextMedia();
      if (e.key === "ArrowLeft") handlePreviousMedia();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <div className="bts-wrapper">
      <div className="title">Gallery</div>

      <div className="bts-media-container">
        {btsMedia.map((media, index) => (
          <div
            className="bts-img-vid-wrapper"
            key={index}
            onClick={() => handleMediaClick(index)}
          >
            {media.type === "image" ? (
              <img
                className="bts-image"
                src={
                  media.src.startsWith("http")
                    ? media.src
                    : `/assets/icons/${media.src}`
                }
                alt="behind the scene"
              />
            ) : (
              <video
                className="bts-image"
                src={
                  media.src.startsWith("http")
                    ? media.src
                    : `/assets/videos/${media.src}`
                }
                poster={media?.poster}
                muted
                loop // later Added the loop attribute if it's not woking remove it -swapnil more
                autoPlay
                playsInline
                preload="metadata"
                onEnded={(e) => (e.currentTarget.currentTime = 0)}
              />
            )}
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div className="bts-modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {btsMedia[selectedIndex].type === "image" ? (
              <img
                className="modal-image"
                src={
                  btsMedia[selectedIndex].src.startsWith("http")
                    ? btsMedia[selectedIndex].src
                    : `/assets/icons/${btsMedia[selectedIndex].src}`
                }
                alt="Full size"
              />
            ) : (
              <video
                className="modal-video"
                src={
                  btsMedia[selectedIndex].src.startsWith("http")
                    ? btsMedia[selectedIndex].src
                    : `/assets/videos/${btsMedia[selectedIndex].src}`
                }
                controls
                autoPlay
                playsInline
                preload="metadata"
                onEnded={(e) => (e.currentTarget.currentTime = 0)}
              />
            )}

            <div className="modal-buttons">
              <button
                className="prev-next-button"
                onClick={handlePreviousMedia}
              >
                <img src="/assets/icons/arrow_left.svg" alt="" />
                <div className="prev-next-text">Previous</div>
              </button>
              <button className="prev-next-button" onClick={handleNextMedia}>
                <div className="prev-next-text">Next</div>
                <img src="/assets/icons/arrow_right.svg" alt="" />
              </button>
              <button className="close-btn" onClick={closeModal}>
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BehindTheScene;
