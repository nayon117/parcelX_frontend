import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaBoxOpen, FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const PendingDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // Fetch all pending deliveries for the logged-in rider
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["riderParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/rider?email=${user.email}`);
      return res.data;
    },
  });

  // Mutation for updating parcel status
const { mutateAsync: updateStatus } = useMutation({
  mutationFn: async ({ id, newStatus }) => {
    const res = await axiosSecure.patch(`/parcels/${id}/status`, {
      delivery_status: newStatus,
      rider_email: user.email,
    });
    return res.data;
  },
  onSuccess: () => {
    queryClient.invalidateQueries(["riderParcels"]);
  },
});


  const handleUpdate = async (parcel, newStatus) => {
  const confirmText =
    newStatus === "in_transit"
      ? "Mark this parcel as picked up?"
      : "Mark this parcel as delivered?";
  const result = await Swal.fire({
    title: "Confirm Action",
    text: confirmText,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, confirm",
  });

  if (result.isConfirmed) {
    await updateStatus({ id: parcel._id, newStatus });
    Swal.fire(
      "Updated!",
      `Parcel marked as ${newStatus.replace("_", " ")}.`,
      "success"
    );
  }
};


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📦 Pending Deliveries</h2>

      {isLoading ? (
        <p>Loading deliveries...</p>
      ) : parcels.length === 0 ? (
        <p className="text-gray-500">No pending deliveries right now.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full bg-gray-100 text-black rounded-lg shadow-md">
            <thead className="bg-gray-300 text-black">
              <tr>
                <th>Tracking ID</th>
                <th>Title</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>From → To</th>
                <th>Cost</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel) => (
                <tr key={parcel._id} className="hover:bg-gray-200">
                  <td>{parcel.tracking_id}</td>
                  <td className="font-semibold">{parcel.title}</td>
                  <td>{parcel.senderName}</td>
                  <td>{parcel.receiverName}</td>
                  <td>
                    {parcel.senderCenter} → {parcel.receiverCenter}
                  </td>
                  <td>৳{parcel.cost}</td>
                  <td>
                    <span
                      className={`badge ${
                        parcel.delivery_status === "rider_assigned"
                          ? "badge-warning"
                          : "badge-info"
                      }`}
                    >
                      {parcel.delivery_status.replace("_", " ")}
                    </span>
                  </td>
                  <td>
                    {parcel.delivery_status === "rider_assigned" ? (
                      <button
                        onClick={() =>
                          handleUpdate(parcel, "in_transit")
                        }
                        className="btn btn-xs btn-success"
                      >
                        <FaBoxOpen className="mr-1" /> Picked Up
                      </button>
                    ) : parcel.delivery_status === "in_transit" ? (
                      <button
                        onClick={() =>
                          handleUpdate(parcel, "delivered")
                        }
                        className="btn btn-xs btn-primary"
                      >
                        <FaCheckCircle className="mr-1" /> Delivered
                      </button>
                    ) : null}
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

export default PendingDeliveries;
