import "./videos.scss";
const Videos = () => {
  const videoList = [
    {
      file: "2.mov",
      description: "Foley work from kichadi Bhat short film",
    },
    {
      file: "3.mov",
      description: "Foley work from kichadi Bhat short film",
    },
    {
      file: "4.mov",
      description: "Foley work from kichadi Bhat short film",
    },
  ];
  return (
    <div className="video-outlet">
      <div className="title">Videos</div>

      <div className="video-wrapper">
        {videoList.map((video, index) => (
          <div className="video-with-description">
            <video className="video-sample" key={index} controls>
              <source
                src={`/public/assets/videos/${video.file}`}
                type="video/mp4"
              />
            </video>
            <div className="video-description">{video.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;
