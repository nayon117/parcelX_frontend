import location from '../../assets/location-merchant.png';

const Mercent = () => {
  return (
    <section className="hero bg-color2 py-16 px-4 md:px-12 mb-12 rounded-lg">
      <div className="hero-content flex flex-col lg:flex-row-reverse items-center gap-8">
        <img
          src={location}
          className="w-full max-w-sm rounded-lg shadow-2xl"
        />

        <div className="text-center lg:text-left flex-1">
          <h1 className="text-4xl md:text-5xl font-bold  mb-6">
            Join ParcelX as a Merchant
          </h1>
          <p className="text-gray-200 text-base md:text-lg mb-6">
            Expand your business with our reliable delivery network. Book
            parcels, track shipments in real-time, and reach customers across
            all 64 districts of Bangladesh with ease.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="bg-color1 text-color3 px-4 py-1.5 rounded-full font-semibold hover:scale-105 transition-transform">
              Become a Merchant
            </button>
            <button className="border-[#caeb66] border-2 rounded-full text-color1 px-4 py-1.5 font-semibold">
              Earn with ParcelX
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mercent;
