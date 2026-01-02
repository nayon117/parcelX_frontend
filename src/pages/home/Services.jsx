import { FaShippingFast, FaGlobeAsia, FaWarehouse, FaMoneyBillWave, FaBuilding, FaUndoAlt } from "react-icons/fa";

const services = [
  {
    title: "Express & Standard Delivery",
    description:
      "Quick delivery in Dhaka (4–6 hours express) and 24–72 hours in major cities.",
    icon: <FaShippingFast className="text-2xl text-color1" />,
  },
  {
    title: "Nationwide Delivery",
    description:
      "Home delivery available across all 64 districts of Bangladesh within 48–72 hours.",
    icon: <FaGlobeAsia className="text-2xl text-color1" />,
  },
  {
    title: "Fulfillment Solution",
    description:
      "Inventory support, order processing, packaging, and after-sales service tailored for businesses.",
    icon: <FaWarehouse className="text-2xl text-color1" />,
  },
  {
    title: "Cash on Delivery",
    description:
      "100% secure cash collection at your customer’s doorstep anywhere in Bangladesh.",
    icon: <FaMoneyBillWave className="text-2xl text-color1" />,
  },
  {
    title: "Corporate Logistics",
    description:
      "Custom contracts for enterprises including warehouse and inventory management.",
    icon: <FaBuilding className="text-2xl text-color1" />,
  },
  {
    title: "Parcel Return",
    description:
      "Reverse logistics for easy returns and exchanges, ensuring customer satisfaction.",
    icon: <FaUndoAlt className="text-2xl text-color1" />,
  },
];

const Services = () => {
  return (
    <section className="my-12 rounded-md">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-color3">Our Services</h2>
          <p className="text-base text-gray-600">
            Smart logistics solutions to power your business growth
          </p>
        </div>

        {/* Services Grid */}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div key={index} className="card shadow-lg p-6 hover:shadow-xl transition bg-white/20 hover:bg-red-50">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-red-100/85 rounded p-4 mb-4 shadow-md flex items-center justify-center">

                {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-color3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
