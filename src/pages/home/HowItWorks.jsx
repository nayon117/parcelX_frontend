import { FaPhoneAlt, FaBoxOpen, FaTruck, FaCheckCircle } from "react-icons/fa";

export default function HowItWorks() {
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
      className="py-16 sm:py-20 md:py-28 bg-gradient-to-br from-accent/5 to-background"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2 className="text-3xl font-bold mb-4 text-color3">
            How parcelX Works
          </h2>
          <p className="text-base sm:text-lg text-black/80">
            Simple, efficient, and transparent. Four easy steps to streamlined
            delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative group">
                <div className="bg-white/20 hover:bg-[#a4e5ff] transition rounded-2xl p-8 h-full flex flex-col items-center text-center shadow-sm hover:shadow-md">
                  {/* <div className="flex items-center justify-center w-12 h-12 bg-color2 text-accent-foreground rounded-full font-bold text-lg mb-4">
                    {step.number}
                  </div> */}
                  <Icon className="text-[#6ab5d4] mb-4" size={40} />
                  <h3 className="text-lg sm:text-xl font-bold text-color3 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-black/80">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-color1"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
