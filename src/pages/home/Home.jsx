import ClientMarquee from "./ClientMarquee";
import Services from "./Services";
import Benefits from "./Benefits";
import Mercent from "./Mercent";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import Hero from "./Hero";
import { Stats } from "./Stats";

const Home = () => {
  return (
    <div>
      <Hero />
      <Stats/>
      <HowItWorks />
      <Services />
      <ClientMarquee />
      <Benefits />
      <Mercent />
      <Testimonials />
    </div>
  );
};
export default Home;
