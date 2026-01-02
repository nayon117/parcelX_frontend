import { Link } from "react-router";

const Mercent = () => {
  return (
    <section className="py-16 px-4 md:px-12 mb-12 rounded-lg bg-red-50/50">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12 text-center lg:text-left">
        
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-color3 mb-6">
            Join ParcelX
          </h1>
          <p className="text-color3 text-base md:text-lg mb-8">
            Expand your business with our reliable delivery network. Book parcels, track shipments in real-time, and reach customers across all 64 districts of Bangladesh with ease.
          </p>

          <div className="flex justify-center lg:justify-start gap-4">
            <Link to="/rider">
              <button className="bg-color1 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform cursor-pointer">
                Earn with ParcelX
              </button>
            </Link>
          </div>
        </div>

        {/* Illustration placeholder */}
        <div className="flex-1">
          <div className="w-full h-64 md:h-80 lg:h-96 bg-red-50/80 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-6xl text-color1">🚚</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Mercent;
