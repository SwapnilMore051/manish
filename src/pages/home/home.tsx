import { useNavigate } from "react-router-dom";
import "./home.scss";

const Home = () => {
  const navigate = useNavigate();
  const loginNavigate = () => {
    navigate("/login");
  };
  return (
    <div className="home-wrapper">
      <div className="main-heading" onClick={loginNavigate}>
        Welcome
      </div>
      <div className="sub-heading">
        <div className="sub-titles">I bring visuals to life -</div>
        <div className="sub-titles">"Foley is my art"</div>
      </div>
    </div>
  );
};

export default Home;
