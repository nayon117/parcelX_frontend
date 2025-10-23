import illustration1 from "../../assets/safe-delivery.png";
import illustration2 from "../../assets/live-tracking.png";
// import illustration3 from "../../assets/big-deliveryman.png";
import illustration3 from "../../assets/customer-top.png";

const benefits = [
  {
    illustration: illustration1,
    title: "Fast & Reliable",
    description:
      "Our delivery network ensures your parcels reach on time across all districts of Bangladesh.",
  },
  {
    illustration: illustration2,
    title: "Easy Tracking",
    description:
      "Get real-time updates with our smart tracking system, keeping you informed every step.",
  },
  {
    illustration: illustration3,
    title: "Secure & Trusted",
    description:
      "We prioritize the safety of your parcels, offering secure handling and verified delivery.",
  },
];

const Benefits = () => {
  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-12">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              {/* Left illustration */}
              <img
                src={benefit.illustration}
                alt={benefit.title}
                className="h-24 w-24 md:h-32 md:w-32 object-contain"
              />
              {/* Divider */}
              <div className="hidden md:block h-32 border-l-2 border-dashed border-gray-500 mx-6"></div>

              {/* Right text */}
              <div className="mt-4 md:mt-0 text-center md:text-left">
                <h3 className="text-xl font-semibold text-color3 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
