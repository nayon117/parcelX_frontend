import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaCheck, FaTimes, FaEye } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PendingRiders = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch pending riders
  const { data: riders = [], isLoading, isError,refetch } = useQuery({
    queryKey: ["pendingRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center text-color2">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Error loading riders</p>;

  // View modal
  const handleView = (rider) => {
    Swal.fire({
      title: rider.name,
      html: `
        <div style="text-align:left; font-size:14px;">
          <p><b>Email:</b> ${rider.email}</p>
          <p><b>Phone:</b> ${rider.phone}</p>
          <p><b>Age:</b> ${rider.age}</p>
          <p><b>Region:</b> ${rider.region}</p>
          <p><b>District:</b> ${rider.district}</p>
          <p><b>NID:</b> ${rider.nid}</p>
          <p><b>Bike Brand:</b> ${rider.bikeBrand}</p>
          <p><b>Bike Reg:</b> ${rider.bikeRegistration}</p>
          <p><b>Status:</b> ${rider.status}</p>
          <p><b>Joined:</b> ${new Date(rider.created_at).toLocaleString()}</p>
        </div>
      `,
      confirmButtonText: "Close",
      confirmButtonColor: "#09383b",
    });
  };

  // Dynamic decision handler
 const handleDecision = async (rider, action) => {
  const isApprove = action === "approve";

  const result = await Swal.fire({
    title: `${isApprove ? "Approve" : "Reject"} Rider?`,
    text: `Do you want to ${action} ${rider.name}?`,
    icon: isApprove ? "question" : "warning",
    showCancelButton: true,
    confirmButtonColor: isApprove ? "#09383b" : "#d33",
    cancelButtonColor: "#888",
    confirmButtonText: `Yes, ${action}`,
    cancelButtonText: "Cancel",
  });

  if (result.isConfirmed) {
    try {
      await axiosSecure.patch(`/riders/${rider._id}/status`, { 
        status: action === "approve" ? "approved" : "rejected",
        email: rider.email
       });

      Swal.fire(
        isApprove ? "Approved!" : "Rejected",
        `${rider.name} has been ${action}d.`,
        "success"
      );

      // Refetch updated riders list
      refetch();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  }
};


  return (
    <div className="p-4 my-12">
    <h2 className="text-2xl font-bold mb-4 text-color2">Pending Riders</h2>

    {riders.length === 0 ? (
      <div className="flex flex-col items-center justify-center mt-20 p-10   rounded-lg text-center">
        <FaEye className="text-6xl text-color1 mb-4" />
        <h3 className="text-xl font-semibold text-color3">No Pending Requests</h3>
        <p className="text-color3 mt-2">All riders have been approved or rejected!</p>
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
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider) => (
              <tr key={rider._id} className="border-b hover:bg-gray-100">
                <td className="p-3">{rider.name}</td>
                <td className="p-3">{rider.email}</td>
                <td className="p-3">{rider.phone}</td>
                <td className="p-3">{rider.region}</td>
                <td className="p-3">{rider.district}</td>
                <td className="p-3 flex gap-3 justify-center">
                  <button
                    onClick={() => handleView(rider)}
                    className="p-2 rounded bg-color1 text-color2 hover:opacity-90 cursor-pointer"
                    title="View"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleDecision(rider, "approve")}
                    className="p-2 rounded bg-green-500 text-white hover:bg-green-600 cursor-pointer"
                    title="Approve"
                  >
                    <FaCheck />
                  </button>
                  <button
                    onClick={() => handleDecision(rider, "reject")}
                    className="p-2 rounded bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                    title="Reject"
                  >
                    <FaTimes />
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

export default PendingRiders;
