import About from "../about/about";
import Audios from "../audios/audios";
import BehindTheScene from "../bts/bts";
import Contact from "../contact/contact";
import Home from "../home/home";
import Videos from "../videos/videos";
import "./mainpage.scss";

const MainPage = () => {
  return (
    <div className="main-page-outlet">
      <section id="home"><Home /></section>
      <section id="videos"><Videos /></section>
      <section id="audios"><Audios /></section>
      <section id="about"><About /></section>
      <BehindTheScene /> {/* behind the scene container */}
      <section id="contact"><Contact /></section>
    </div>
  );
};

export default MainPage;
