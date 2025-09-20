import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import banner1 from "../../assets/banner/banner1.png";
import banner2 from "../../assets/banner/banner2.png";
import banner3 from "../../assets/banner/banner3.png";

const Banner = () => {
  return (
    <Carousel autoPlay={true} infiniteLoop={true} className="mt-8" >
      <div>
        <img src={banner1} />
        <p className="legend">Fast. Reliable. Nationwide.</p>
      </div>
      <div>
        <img src={banner2} />
        <p className="legend">Track in Real Time.</p>
      </div>
      <div>
        <img src={banner3} />
        <p className="legend">ParcelX — Powered by You.</p>
      </div>
    </Carousel>
  );
};

export default Banner;
