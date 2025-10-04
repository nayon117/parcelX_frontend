import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaTimes } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  // Fetch active riders
  const { data: riders = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["activeRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/approved"); 
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center text-color2">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Error loading riders</p>;

  // Deactivate rider
  const handleDeactivate = async (rider) => {
    const result = await Swal.fire({
      title: `Deactivate ${rider.name}?`,
      text: `Are you sure you want to deactivate this rider?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#09383b",
      confirmButtonText: "Yes, deactivate",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/riders/${rider._id}/status`, { status: "deactivated" });
        Swal.fire("Deactivated!", `${rider.name} has been deactivated.`, "success");
        refetch();
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Something went wrong", "error");
      }
    }
  };

  // Filter riders by search
  const filteredRiders = riders.filter((rider) =>
    rider.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 my-12">
      <h2 className="text-2xl font-bold mb-4 text-color2">Active Riders</h2>

      <input
        type="text"
        placeholder="Search by name..."
        className="mb-4 p-2 rounded border border-gray-500 w-full md:w-1/3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredRiders.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 p-10 bg-white shadow rounded-lg text-center">
          <FaTimes className="text-6xl text-red-500 mb-4" />
          <h3 className="text-xl font-semibold text-color3">No Active Riders Found</h3>
          <p className="text-color3 mt-2">Try adjusting your search or check later.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden shadow">
            <thead className="bg-color2 text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Region</th>
                <th className="p-3 text-left">District</th>
                <th className="p-3 text-left">Bike</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRiders.map((rider) => (
                <tr key={rider._id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{rider.name}</td>
                  <td className="p-3">{rider.email}</td>
                  <td className="p-3">{rider.phone}</td>
                  <td className="p-3">{rider.region}</td>
                  <td className="p-3">{rider.district}</td>
                  <td className="p-3">{rider.bikeBrand} ({rider.bikeRegistration})</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDeactivate(rider)}
                      className="p-2 rounded bg-red-500 text-white hover:bg-red-600 flex items-center gap-2 cursor-pointer"
                      title="Deactivate"
                    >
                      <FaTimes />
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ActiveRiders;
