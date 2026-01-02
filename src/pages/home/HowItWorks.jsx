import { FaPhoneAlt, FaBoxOpen, FaTruck, FaCheckCircle } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: FaPhoneAlt,
      number: "1",
      title: "Book Online",
      description: "Create an account and schedule your pickup in minutes",
    },
    {
      icon: FaBoxOpen,
      number: "2",
      title: "Confirm Pickup",
      description: "Get real-time updates as our driver heads to your location",
    },
    {
      icon: FaTruck,
      number: "3",
      title: "Track Delivery",
      description: "Monitor your parcel live with GPS tracking",
    },
    {
      icon: FaCheckCircle,
      number: "4",
      title: "Delivery Proof",
      description: "Receive digital proof of delivery instantly",
    },
  ];

  return (
    <section
      id="how"
      className="py-16 sm:py-20 md:py-28 bg-gradient-to-br from-color3/5 to-white"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2 className="text-3xl font-bold mb-4 text-color3">
            How parcelX Works
          </h2>
          <p className="text-base sm:text-lg text-color3">
            Simple, efficient, and transparent. Four easy steps to streamlined
            delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative group">
                <div className="bg-white hover:bg-red-50 transition rounded-2xl p-8 h-full flex flex-col items-center text-center shadow-sm hover:shadow-md">
                  
                  <div className="bg-red-100/95 rounded-full p-4 mb-4 shadow-md flex items-center justify-center">
                    <Icon className="text-color1" size={20} />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-color3 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-color3/80">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
