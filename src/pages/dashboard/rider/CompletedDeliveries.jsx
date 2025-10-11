import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const CompletedDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // Fetch completed deliveries
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["completedParcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rider/completed-parcels?email=${user.email}`
      );
      return res.data || []; // expect API returns array of parcels
    },
  });

  // Mutation to cashout a parcel
  const { mutateAsync: cashoutParcel } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/parcels/${id}/cashout`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["completedParcels"]);
    },
  });

  const handleCashout = async (parcel) => {
    const confirm = await Swal.fire({
      title: "Confirm Cashout",
      text: `Cash out earnings for parcel ${parcel.tracking_id}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Cash Out",
    });

    if (confirm.isConfirmed) {
      const result = await cashoutParcel(parcel._id);
      if (result.success) {
        Swal.fire("Success", "Cashout successful!", "success");
      } else {
        Swal.fire("Error", result.message, "error");
      }
    }
  };

  if (isLoading)
    return <p className="text-center py-6">Loading completed deliveries...</p>;

  // Calculate total earnings
  const sameDistrictRate = 0.05;
  const otherDistrictRate = 0.1;

  const totalEarnings = parcels
    .reduce((sum, parcel) => {
      const rate =
        parcel.senderDistrict === parcel.receiverDistrict
          ? sameDistrictRate
          : otherDistrictRate;
      return sum + parcel.cost * rate;
    }, 0)
    .toFixed(2);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Completed Deliveries
      </h2>

      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-green-600">
          Total Earnings: ৳{totalEarnings}
        </h3>
        <p className="text-gray-500 text-sm mt-1">
          Based on same-district (5%) and cross-district (10%) deliveries
        </p>
      </div>

      {parcels.length === 0 ? (
        <p className="text-center text-gray-500">
          No completed deliveries yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2">#</th>
                <th className="border px-3 py-2">Tracking ID</th>
                <th className="border px-3 py-2">Title</th>
                <th className="border px-3 py-2">Sender</th>
                <th className="border px-3 py-2">Receiver</th>
                <th className="border px-3 py-2">Status</th>
                <th className="border px-3 py-2">Cost</th>
                <th className="border px-3 py-2">Cashout</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, i) => (
                <tr key={parcel._id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">{i + 1}</td>
                  <td className="border px-3 py-2">{parcel.tracking_id}</td>
                  <td className="border px-3 py-2">{parcel.title}</td>
                  <td className="border px-3 py-2">{parcel.senderName}</td>
                  <td className="border px-3 py-2">{parcel.receiverName}</td>
                  <td className="border px-3 py-2 capitalize text-green-600">
                    {parcel.delivery_status}
                  </td>
                  <td className="border px-3 py-2">৳{parcel.cost}</td>
                  <td className="border px-3 py-2">
                    {parcel.cashout_status === "cashed_out" ? (
                      <span className="text-gray-500 text-sm italic">
                        Cashed Out
                      </span>
                    ) : (
                      <button
                        onClick={() => handleCashout(parcel)}
                        className="btn btn-xs btn-success"
                      >
                        Cash Out
                      </button>
                    )}
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

export default CompletedDeliveries;
