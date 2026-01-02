export const Stats = () => {
  const stats = [
    { label: "50M+", description: "Parcels Delivered" },
    { label: "99.8%", description: "On-Time Rate" },
    { label: "64+", description: "Zilla Served" },
    { label: "24/7", description: "Support Available" },
  ];

  return (
    <section className="border-y border-color3/20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-color1 mb-2">
                {stat.label}
              </div>
              <p className="text-sm text-color3">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
