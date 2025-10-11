import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import {  startOfToday, startOfWeek, startOfMonth, startOfYear, parseISO } from "date-fns";

const MyEarnings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: completedParcels = [], isLoading } = useQuery({
    queryKey: ["completedParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider/completed-parcels?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading earnings...</p>;

  const sameDistrictRate = 0.05; // 5%
  const otherDistrictRate = 0.1; // 10%

  let totalEarnings = 0;
  let totalCashedOut = 0;
  let totalPending = 0;

  let earningsByPeriod = {
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
    thisYear: 0,
    overall: 0,
  };

  const now = new Date();
  const startToday = startOfToday();
  const startWeek = startOfWeek(now, { weekStartsOn: 0 }); // Sunday
  const startMonth = startOfMonth(now);
  const startYear = startOfYear(now);

  completedParcels.forEach((parcel) => {
    const sameDistrict = parcel.senderRegion === parcel.receiverRegion;
    const rate = sameDistrict ? sameDistrictRate : otherDistrictRate;
    const earning = parcel.cost * rate;

    totalEarnings += earning;

    if (parcel.cashout_status === "cashed_out") totalCashedOut += earning;
    else totalPending += earning;

    const deliveredAt = parcel.delivered_at ? parseISO(parcel.delivered_at) : parseISO(parcel.creation_date);

    if (deliveredAt >= startToday) earningsByPeriod.today += earning;
    if (deliveredAt >= startWeek) earningsByPeriod.thisWeek += earning;
    if (deliveredAt >= startMonth) earningsByPeriod.thisMonth += earning;
    if (deliveredAt >= startYear) earningsByPeriod.thisYear += earning;
    earningsByPeriod.overall += earning;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">💰 My Earnings</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card p-4 bg-gray-100 rounded-lg shadow">
          <h3 className="font-semibold">Total Earnings</h3>
          <p className="text-xl font-bold">৳{totalEarnings.toFixed(2)}</p>
        </div>
        <div className="card p-4 bg-green-100 rounded-lg shadow">
          <h3 className="font-semibold">Cashed Out</h3>
          <p className="text-xl font-bold">৳{totalCashedOut.toFixed(2)}</p>
        </div>
        <div className="card p-4 bg-yellow-100 rounded-lg shadow">
          <h3 className="font-semibold">Pending</h3>
          <p className="text-xl font-bold">৳{totalPending.toFixed(2)}</p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-2">Earnings Analysis</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-4 bg-gray-200 rounded-lg shadow">
          <h4 className="font-semibold">Today</h4>
          <p className="text-lg">৳{earningsByPeriod.today.toFixed(2)}</p>
        </div>
        <div className="card p-4 bg-gray-200 rounded-lg shadow">
          <h4 className="font-semibold">This Week</h4>
          <p className="text-lg">৳{earningsByPeriod.thisWeek.toFixed(2)}</p>
        </div>
        <div className="card p-4 bg-gray-200 rounded-lg shadow">
          <h4 className="font-semibold">This Month</h4>
          <p className="text-lg">৳{earningsByPeriod.thisMonth.toFixed(2)}</p>
        </div>
        <div className="card p-4 bg-gray-200 rounded-lg shadow">
          <h4 className="font-semibold">This Year</h4>
          <p className="text-lg">৳{earningsByPeriod.thisYear.toFixed(2)}</p>
        </div>
        <div className="card p-4 bg-gray-200 rounded-lg shadow">
          <h4 className="font-semibold">Overall</h4>
          <p className="text-lg">৳{earningsByPeriod.overall.toFixed(2)}</p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-2">Completed Deliveries</h3>
      <div className="overflow-x-auto">
        <table className="table w-full bg-gray-100 text-black rounded-lg shadow-md">
          <thead className="bg-gray-300 text-black">
            <tr>
              <th>Tracking ID</th>
              <th>Title</th>
              <th>Sender → Receiver</th>
              <th>Cost</th>
              <th>Earning</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {completedParcels.map((parcel) => {
              const sameDistrict = parcel.senderRegion === parcel.receiverRegion;
              const rate = sameDistrict ? sameDistrictRate : otherDistrictRate;
              const earning = parcel.cost * rate;
              return (
                <tr key={parcel._id}>
                  <td>{parcel.tracking_id}</td>
                  <td>{parcel.title}</td>
                  <td>
                    {parcel.senderName} ({parcel.senderRegion}) → {parcel.receiverName} ({parcel.receiverRegion})
                  </td>
                  <td>৳{parcel.cost.toFixed(2)}</td>
                  <td>৳{earning.toFixed(2)}</td>
                  <td>{parcel.cashout_status || "pending"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEarnings;
