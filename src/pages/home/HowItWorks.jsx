import { FaBox, FaTruck, FaMapMarkedAlt, FaCheckCircle } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaBox className="text-color3 text-3xl" />,
      title: "Step 1: Book",
      text: "Schedule your parcel delivery easily through our app or website.",
    },
    {
      icon: <FaTruck className="text-color3 text-3xl" />,
      title: "Step 2: Pickup",
      text: "Our rider collects your package directly from your doorstep.",
    },
    {
      icon: <FaMapMarkedAlt className="text-color3 text-3xl" />,
      title: "Step 3: Track",
      text: "Track your parcel in real time with our smart tracking system.",
    },
    {
      icon: <FaCheckCircle className="text-color3 text-3xl" />,
      title: "Step 4: Deliver",
      text: "Your parcel is delivered quickly and securely to the recipient.",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-color3 mb-8 text-left">
          How It Works
        </h2>

        {/* Steps Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition text-left"
            >
              {step.icon}
              <h3 className="text-xl font-semibold text-color3 mt-4 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
