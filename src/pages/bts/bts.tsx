import "./bts.scss";

const BehindTheScene = () => {
  const btsImages = [
    "bts1.jpg",
    "bts2.jpg",
    "bts4.jpg",
    "bts5.jpg",
    "bts3.jpg",
  ];

  const btsVideos = [
    "https://www.youtube.com/embed/Ls02w5BTWFY",
    "https://www.youtube.com/embed/Ls02w5BTWFY",
  ];

  return (
    <div className="bts-wrapper">
      <div className="title">Behind The Scene</div>
      <div className="bts-image-container">
        {btsImages.map((image, index) => (
          <div key={index}>
            <img
              className="bts-image"
              src={`/assets/icons/${image}`}
              alt="behind the scene"
            />
          </div>
        ))}
          
        </div>
        <div className= "bts-video-container">

        {btsVideos.map((video, index) => (
          <div className="bts-video" key={index}>
            <iframe
              className="bts-video"
              src={video}
              title={`YouTube video ${index + 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BehindTheScene;
