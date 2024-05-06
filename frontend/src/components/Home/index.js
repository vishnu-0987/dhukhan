import Header from "../Header";
import arrow from "../Assets/arrow.png";
import hand_icon from "../Assets/hand_icon.png";
import hero_image from "../Assets/hero_image.png";
import "./index.css";

const Home = () => (
  <div className="home-container">
    <Header />
    <div className="hero">
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div>
          <div className="hero-hand-icon">
            <p>new</p>
            <img src={hand_icon} alt="" />
          </div>
          <p>collections</p>
          <p>for everyone</p>
        </div>
        <div className="hero-latest-btn">
          <div>Latest Collection</div>
          <img src={arrow} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="" />
      </div>
    </div>
  </div>
);

export default Home;
