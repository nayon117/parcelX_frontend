import Banner from "./Banner";
import ClientMarquee from "./ClientMarquee";
import Services from "./Services";
import Benefits from "./Benefits";
import Mercent from "./Mercent";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <div>
        <Banner />
        <HowItWorks />
        <Services />
        <ClientMarquee />
        <Benefits />
        <Mercent />
        <Testimonials />
    </div>
  )
}
export default Home;
