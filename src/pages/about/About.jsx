import React from "react";

const About = () => {
  return (
    <section className="font-montserrat bg-gray-200 text-color3 min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-color2 drop-shadow-lg">
          ParcelX - Beyond Delivery
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
          We don't just deliver parcels. We deliver trust, speed, and reliability across the nation. Every package, every time—epic precision in motion.
        </p>
        <a
          href="#mission"
          className="inline-block px-8 py-4 bg-color1 text-color2 font-bold rounded-lg hover:bg-yellow-400 transition-all duration-300"
        >
          Discover Our Mission
        </a>
      </div>

      {/* Mission & Vision */}
      <div id="mission" className="container mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-color2">Our Mission</h2>
          <p className="text-lg text-color3">
            At ParcelX, we strive to make logistics seamless, transparent, and lightning-fast. Every parcel carries a promise: safe, on-time, and delivered with excellence.
          </p>
        </div>
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-color2">Our Vision</h2>
          <p className="text-lg text-color3">
            To redefine parcel delivery in Bangladesh and beyond, combining cutting-edge technology with human precision. We envision a world where packages move as fast as your ambitions.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-color1 text-color2 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold mb-2">Speed</h3>
            <p>Lightning-fast deliveries powered by smart routing and real-time tracking.</p>
          </div>
          <div className="p-6 bg-color2 text-color1 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold mb-2">Reliability</h3>
            <p>Every parcel handled with care, ensuring safe and on-time delivery without compromise.</p>
          </div>
          <div className="p-6 bg-color3 text-color1 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold mb-2">Trust</h3>
            <p>We build relationships through transparency, updates, and accountability at every step.</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-color2">Join the ParcelX Experience</h2>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-color3">
          Whether you’re sending or receiving, we ensure an epic delivery experience like no other.
        </p>
        <a
          href="/dashboard/myParcels"
          className="inline-block px-10 py-4 bg-color1 text-color2 font-bold rounded-lg hover:bg-yellow-400 transition-all duration-300"
        >
          Track Your Parcel
        </a>
      </div>
    </section>
  );
};

export default About;
