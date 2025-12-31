import { useNavigate } from "react-router-dom";
import "./home.scss";

const Home = () => {
  const navigate = useNavigate();
  const loginNavigate = () => {
    navigate("/login");
  };

  return (
    <div className="home-wrapper">
      {/* Background video */}
      <video
        className="background-video"
        src="https://res.cloudinary.com/didtglcy3/video/upload/v1767166213/BGvideo_cwaf55.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Content on top of video */}
      <div className="home-content">
        <div className="main-heading" onClick={loginNavigate}>
          Welcome
        </div>
        <div className="sub-heading">
          <div className="sub-titles">I bring visuals to life -</div>
          <div className="sub-titles">"Foley is my art"</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
