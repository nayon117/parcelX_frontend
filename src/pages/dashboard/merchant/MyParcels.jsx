import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { format } from "date-fns";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], isLoading, refetch } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the parcel!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        axiosSecure.delete(`/parcels/${id}`)
        .then(res=>{
          if(res.data.deletedCount>0){
            Swal.fire("Deleted!", "Parcel has been deleted.", "success");
            refetch();
          }
        })
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to delete parcel", "error");
      }
    }
  };

  const handlePay = (parcel) => {
    Swal.fire("Payment", `Proceed to pay ${parcel.cost}৳`, "info");
  };

  const handleView = (parcel) => {
    Swal.fire({
      title: "Parcel Details",
      html: `
        <p><b>Type:</b> ${parcel.type}</p>
        <p><b>Title:</b> ${parcel.title}</p>
        <p><b>Sender:</b> ${parcel.senderName} (${parcel.senderRegion})</p>
        <p><b>Receiver:</b> ${parcel.receiverName} (${parcel.receiverRegion})</p>
        <p><b>Cost:</b> ${parcel.cost}৳</p>
        <p><b>Payment Status:</b> ${parcel.payment_status}</p>
      `,
      width: "600px",
      confirmButtonText: "Close",
    });
  };

  if (isLoading) return <div>Loading parcels...</div>;

   if (parcels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center text-gray-500">
        <span className="text-6xl mb-4">📦</span>
        <h2 className="text-2xl font-bold mb-2">No Parcels Found</h2>
        <p className="text-gray-400">You haven't created any parcels yet.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Parcels</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra table-compact w-full">
          <thead>
            <tr className="text-black">
              <th>#</th>
              <th>Title</th>
              <th>Type</th>
              <th>Created Time</th>
              <th>Cost</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td className="max-w-[150px] truncate">{parcel.title}</td>
                <td>{parcel.type === "document" ? "📄 Document" : "📦 Non-Document"}</td>
                <td>{format(new Date(parcel.creation_date), "dd/MM/yyyy HH:mm")}</td>
                <td>{parcel.cost}৳</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-white font-semibold ${
                      parcel.payment_status === "paid" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {parcel.payment_status === "paid" ? "Paid" : "Unpaid"}
                  </span>
                </td>
                <td className="space-x-2 flex flex-wrap">
                  <button
                    className="btn btn-sm btn-info mb-1"
                    onClick={() => handleView(parcel)}
                  >
                    👁️ View
                  </button>
                  {parcel.payment_status === "unpaid" && (
                    <button
                      className="btn btn-sm btn-success mb-1"
                      onClick={() => handlePay(parcel)}
                    >
                      💳 Pay
                    </button>
                  )}
                  <button
                    className="btn btn-sm btn-error mb-1"
                    onClick={() => handleDelete(parcel._id)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
