import Banner from "./Banner";
import ClientMarquee from "./ClientMarquee";
import Services from "./Services";
import Benefits from "./Benefits";
import Mercent from "./Mercent";
import HowItWorks from "./HowItWorks";

const Home = () => {
  return (
    <div>
        <Banner />
        <HowItWorks />
        <Services />
        <ClientMarquee />
        <Benefits />
        <Mercent />
        
    </div>
  )
}
export default Home;
