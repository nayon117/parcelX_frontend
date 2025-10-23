import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/Card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { FaBox, FaCheckCircle, FaMoneyBillWave } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#ef4444"];

const RiderDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // ✅ Fetch all parcels assigned to this rider
  const { data: activeParcels = [] } = useQuery({
    queryKey: ["riderActiveParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/rider?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // ✅ Fetch all completed parcels for this rider
  const { data: completedParcels = [] } = useQuery({
    queryKey: ["riderCompletedParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/rider/completed-parcels?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // ✅ Calculate stats
  const totalDelivered = completedParcels.length;
  const totalActive = activeParcels.length;
  const totalParcels = totalDelivered + totalActive;

  // ✅ Correct earnings calculation
  const sameDistrictRate = 0.05; // 5%
  const otherDistrictRate = 0.1; // 10%

  const totalEarnings = completedParcels.reduce((sum, p) => {
    const rate = p.senderRegion === p.receiverRegion ? sameDistrictRate : otherDistrictRate;
    return sum + (Number(p.cost) || 0) * rate;
  }, 0);

  // ✅ Chart data
  const statusData = [
    { name: "Active", value: totalActive },
    { name: "Delivered", value: totalDelivered },
  ];

  // ✅ Monthly earnings chart
  const earningsByMonth = completedParcels.reduce((acc, p) => {
    const date = new Date(p.delivered_at || p.creation_date);
    const month = date.toLocaleString("default", { month: "short" });
    const rate = p.senderRegion === p.receiverRegion ? sameDistrictRate : otherDistrictRate;
    acc[month] = (acc[month] || 0) + (Number(p.cost) || 0) * rate;
    return acc;
  }, {});
  const monthlyEarnings = Object.entries(earningsByMonth).map(([month, total]) => ({ month, total }));

  return (
    <div className="p-6 space-y-8">
      {/* Top Stats */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex items-center gap-3">
            <FaBox className="text-blue-500 text-2xl" />
            <CardTitle>Total Parcels</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{totalParcels}</CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-3">
            <FaCheckCircle className="text-green-500 text-2xl" />
            <CardTitle>Delivered Parcels</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{totalDelivered}</CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-3">
            <FaMoneyBillWave className="text-yellow-500 text-2xl" />
            <CardTitle>Total Earnings</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">${totalEarnings.toFixed(2)}</CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Delivery Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyEarnings}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#16a34a" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Completed Parcels */}
      <Card>
        <CardHeader>
          <CardTitle>Recently Delivered Parcels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3 text-left">Tracking ID</th>
                  <th className="p-3 text-left">Receiver</th>
                  <th className="p-3 text-left">Cost</th>
                  <th className="p-3 text-left">Delivered On</th>
                </tr>
              </thead>
              <tbody>
                {completedParcels.slice(0, 5).map((p) => (
                  <tr key={p._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{p.tracking_id}</td>
                    <td className="p-3">{p.receiverName}</td>
                    <td className="p-3">${p.cost}</td>
                    <td className="p-3">{new Date(p.delivered_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiderDashboard;
