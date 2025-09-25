import "leaflet/dist/leaflet.css";
import CoverageMap from "./CoverageMap";
import { useLoaderData } from "react-router";
import { useState } from "react";

const Coverage = () => {
  const serviceCenters = useLoaderData();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="p-6 space-y-8 my-12">
      <h2 className="text-3xl font-bold text-center text-color2">
        We are available in 64 districts
      </h2>

      {/* Search Box */}
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search district..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-bordered w-full max-w-md bg-white text-black"
        />
      </div>

      <CoverageMap serviceCenters={serviceCenters} searchQuery={searchQuery} />
    </div>
  );
};

export default Coverage;
