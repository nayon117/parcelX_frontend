import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserPlus } from "react-icons/fa";
import Loader from "../../../components/shared/Loader";
import Swal from "sweetalert2";

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["assignableParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels?payment_status=paid&delivery_status=not_collected");
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

   const handleAssignRider = async (parcel) => {
    try {
      // 1️⃣ Fetch riders for the parcel's sender center
      const res = await axiosSecure.get(`/riders?district=${parcel.senderCenter}`);
      const riders = res.data;

      if (riders.length === 0) {
        return Swal.fire({
          icon: "info",
          title: "No Riders Found",
          text: `No riders available for ${parcel.senderCenter}`,
        });
      }

      // 2️⃣ Map riders for SweetAlert select
      const options = riders.reduce((acc, rider) => {
        acc[rider._id] = `${rider.name} (${rider.email})`;
        return acc;
      }, {});

      // 3️⃣ Show SweetAlert2 modal with select dropdown
      const { value: selectedRiderId } = await Swal.fire({
        title: `Assign Rider for ${parcel.tracking_id}`,
        input: "select",
        inputOptions: options,
        inputPlaceholder: "Select a rider",
        showCancelButton: true,
      });

      if (!selectedRiderId) return; 

      // 4️⃣ Call backend API to assign rider
      await axiosSecure.post(`/parcels/${parcel._id}/assign-rider`, {
        riderId: selectedRiderId,
      });

      Swal.fire({
        icon: "success",
        title: "Rider Assigned",
        text: "The rider has been successfully assigned to the parcel.",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while assigning the rider.",
      });
    }
  };


  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-color2">
        Assign Rider to Parcels
      </h2>

      {parcels.length === 0 ? (
        <div className="text-center text-gray-500 font-medium">
          No parcels waiting for rider assignment.
        </div>
      ) : (
        <div className="overflow-x-auto  rounded-lg shadow-lg">
          <table className="table w-full text-sm md:text-base">
            <thead className=" text-black">
              <tr>
                <th>#</th>
                <th>Tracking ID</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>From</th>
                <th>To</th>
                <th>Cost</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((p, idx) => (
                <tr key={p._id}>
                  <td>{idx + 1}</td>
                  <td className="font-semibold">{p.tracking_id}</td>
                  <td>
                    <div>
                      <p>{p.senderName}</p>
                      <p className="text-xs text-gray-500">{p.senderContact}</p>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p>{p.receiverName}</p>
                      <p className="text-xs text-gray-500">{p.receiverContact}</p>
                    </div>
                  </td>
                  <td>
                    <p className="text-sm">{p.senderCenter}</p>
                    <p className="text-xs text-gray-400">{p.senderRegion}</p>
                  </td>
                  <td>
                    <p className="text-sm">{p.receiverCenter}</p>
                    <p className="text-xs text-gray-400">{p.receiverRegion}</p>
                  </td>
                  <td>{p.cost} ৳</td>
                  <td>
                    <button
                      className="btn btn-sm bg-color2 flex items-center gap-2"
                      onClick={() => handleAssignRider(p)}
                    >
                      <FaUserPlus /> Assign
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

export default AssignRider;
