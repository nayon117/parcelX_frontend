import Marquee from "react-fast-marquee";
import client1 from "../../assets/brands/amazon.png";
import client2 from "../../assets/brands/amazon_vector.png";
import client3 from "../../assets/brands/casio.png";
import client4 from "../../assets/brands/moonstar.png";
import client5 from "../../assets/brands/randstad.png";
import client6 from "../../assets/brands/start-people 1.png";
import client7 from "../../assets/brands/start.png";


const clients = [client1, client2, client3, client4, client5, client6, client7];

const ClientMarquee = () => {
  return (
    <section className="py-12 mt-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-color3 mb-8">
          Our Trusted Clients
        </h2>

        {/* Marquee */}
        <Marquee
          gradient={false}   
          speed={50}       
          pauseOnHover={true}
        >
          {clients.map((logo, index) => (
            <div key={index} className="mx-8 my-8">
              <img
                src={logo}
                alt={`Client ${index + 1}`}
                className="h-5 object-contain "
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default ClientMarquee;
