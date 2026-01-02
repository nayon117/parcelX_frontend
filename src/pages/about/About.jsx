import { FaTruck, FaUsers, FaBolt, FaHeart, FaArrowRight } from "react-icons/fa"; // specific imports

const About = () => {
  const values = [
    {
      icon: <FaTruck className="w-8 h-8 text-color1" />,
      title: "Excellence",
      description: "We pursue excellence in every aspect of our operations, from technology to customer service.",
    },
    {
      icon: <FaUsers className="w-8 h-8 text-color1" />,
      title: "Integrity",
      description: "Transparency and honesty guide our relationships with customers, partners, and team members.",
    },
    {
      icon: <FaBolt className="w-8 h-8 text-color1" />,
      title: "Innovation",
      description: "We constantly innovate to solve logistics challenges and exceed customer expectations.",
    },
  ];

  const team = [
    { name: "Sarah Johnson", role: "CEO & Founder", image: "👩‍💼" },
    { name: "Michael Chen", role: "CTO & Co-founder", image: "👨‍💻" },
    { name: "Emily Rodriguez", role: "COO", image: "👩‍🔬" },
  ];

  const events = [
    { year: "2020", title: "Founded", description: "ParcelX launched with a vision to revolutionize parcel delivery." },
    { year: "2021", title: "Expansion", description: "Expanded operations to 50 countries and processed 1M+ parcels." },
    { year: "2022", title: "Innovation", description: "Introduced AI-powered routing and real-time tracking technology." },
    { year: "2023", title: "Growth", description: "Reached 25M parcels delivered and launched sustainability initiatives." },
    { year: "2024", title: "Global Leader", description: "Now operating in 195+ countries with 50M+ parcels annually." },
  ];

  const impacts = [
    { metric: "50M+", label: "Parcels Delivered", icon: "📦" },
    { metric: "195+", label: "Countries Served", icon: "🌍" },
    { metric: "99.8%", label: "Satisfaction Rate", icon: "⭐" },
    { metric: "500K+", label: "Active Businesses", icon: "🏢" },
  ];

  return (
    <div className="font-montserrat min-h-screen bg-white text-color3">

      {/* Hero */}
      <section className="relative py-20 md:py-32 text-center bg-white overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-100 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-200 rounded-full blur-3xl"></div>
        <div className="relative max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-color3">
            Our Story: Redefining <span className="text-color1">Delivery</span>
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-color3 leading-relaxed">
            Founded with a vision to revolutionize the parcel delivery industry, ParcelX combines cutting-edge
            technology with a commitment to excellence.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        <div className="p-10 rounded-3xl border border-color2 bg-red-50">
          <div className="w-14 h-14 rounded-xl bg-color1 flex items-center justify-center mb-6">
            <FaBolt className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-color3">Our Mission</h2>
          <p className="text-lg text-color3 leading-relaxed">
            To provide the world's fastest, most reliable, and most affordable parcel delivery solutions,
            empowering businesses of all sizes to reach their customers seamlessly.
          </p>
        </div>
        <div className="p-10 rounded-3xl border border-color2 bg-red-50">
          <div className="w-14 h-14 rounded-xl bg-color1 flex items-center justify-center mb-6">
            <FaHeart className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-color3">Our Vision</h2>
          <p className="text-lg text-color3 leading-relaxed">
            To become the global standard for intelligent logistics, where every parcel is delivered safely,
            on time, and with sustainability at the forefront.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-color3 text-center mb-12">Our Core Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-red-100/50 flex items-center justify-center mx-auto mb-6">
                {v.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-color3">{v.title}</h3>
              <p className="text-color3">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-32 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-color3 text-center mb-12">Meet Our Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div key={i} className="p-8 rounded-2xl border border-color2 bg-white text-center">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-semibold text-color3 mb-2">{member.name}</h3>
                <p className="text-color3 mb-4">{member.role}</p>
                <p className="text-sm text-color3 leading-relaxed">
                  Dedicated to delivering excellence and innovation in every aspect of ParcelX's mission.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-color3 text-center mb-16">Our Journey</h2>
        <div className="space-y-12">
          {events.map((e, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-6 md:gap-12">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-color1 flex items-center justify-center text-white font-bold">
                  {i + 1}
                </div>
                {i < events.length - 1 && <div className="w-1 h-24 bg-color1 mt-4"></div>}
              </div>
              <div className="pb-8">
                <span className="text-color1 font-semibold">{e.year}</span>
                <h3 className="text-2xl font-bold text-color3 mt-2 mb-2">{e.title}</h3>
                <p className="text-color3">{e.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Impact */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-b border-color2">
        <h2 className="text-4xl font-bold text-color3 text-center mb-12">Our Impact</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {impacts.map((imp, i) => (
            <div key={i} className="p-8 rounded-2xl bg-white text-center border border-color2">
              <div className="text-4xl mb-4">{imp.icon}</div>
              <div className="text-3xl font-bold text-color1 mb-2">{imp.metric}</div>
              <p className="text-color3">{imp.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-color3 mb-6">Ready to Be Part of Our Story?</h2>
        <p className="text-color3 mb-8 max-w-2xl mx-auto leading-relaxed">
          Join thousands of businesses already delivering smarter with ParcelX. Let's build the future of logistics together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-color1 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:scale-105 transition-transform">
            Get Started Today <FaArrowRight className="w-4 h-4" />
          </button>
          <button className="border border-color2 text-color3 px-6 py-3 rounded-full hover:bg-red-50 transition-transform">
            Contact Our Team
          </button>
        </div>
      </section>
    </div>
  )
}

export default About;
