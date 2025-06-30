import "./videos.scss";

const Videos = () => {
  const videoList = [
    {
      url: "https://www.youtube.com/embed/Ls02w5BTWFY",
      description: "Foley work from Kichadi Bhat short film",
    },
    {
      url: "https://www.youtube.com/embed/kgFubgka_DY",
      description: "Another Foley sample from Kichadi Bhat short film",
    },
    {
      url: "https://www.youtube.com/embed/LufYFH_gaAs",
      description: "Creative foley demonstration in short film scene",
    },
  ];

  return (
    <div className="video-outlet">
      <div className="title">Videos</div>

      <div className="video-wrapper">
        {videoList.map((video, index) => (
          <div className="video-with-description" key={index}>
            <iframe
              className="video-sample"
              src={video.url}
              title={`YouTube video ${index + 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="video-description">{video.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;
