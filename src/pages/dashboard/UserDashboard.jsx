import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { FaBox, FaMoneyBillWave, FaTruck, FaClock } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/Card";

const COLORS = ["#16a34a", "#2563eb", "#eab308", "#ef4444"];

const UserDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch user's parcels
  const { data: parcels = [] } = useQuery({
    queryKey: ["userParcels", user?.email],
    queryFn: async () => (await axiosSecure.get(`/parcels?email=${user.email}`)).data,
    enabled: !!user?.email,
  });

  // Fetch user payments
  const { data: payments = [] } = useQuery({
    queryKey: ["userPayments", user?.email],
    queryFn: async () => (await axiosSecure.get(`/payments?email=${user.email}`)).data,
    enabled: !!user?.email,
  });

  // Compute stats
  const totalSpent = payments.reduce((a, b) => a + Number(b.amount), 0);
  const pending = parcels.filter((p) => p.delivery_status === "pending").length;
  const delivered = parcels.filter((p) => p.delivery_status === "delivered").length;
  const onTheWay = parcels.filter((p) => p.delivery_status === "in_transit").length;

  const deliveryStatusData = [
    { _id: "Pending", count: pending },
    { _id: "On the Way", count: onTheWay },
    { _id: "Delivered", count: delivered },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Top Stats */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex items-center gap-3">
            <FaBox className="text-blue-500 text-2xl" />
            <CardTitle>Total Parcels</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{parcels.length}</CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-3">
            <FaMoneyBillWave className="text-green-500 text-2xl" />
            <CardTitle>Total Spent</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">${totalSpent}</CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-3">
            <FaTruck className="text-orange-500 text-2xl" />
            <CardTitle>Delivered</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{delivered}</CardContent>
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
                <Pie data={deliveryStatusData} dataKey="count" nameKey="_id" cx="50%" cy="50%" outerRadius={80}>
                  {deliveryStatusData.map((entry, index) => (
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
            <CardTitle>Latest Payment</CardTitle>
          </CardHeader>
          <CardContent>
            {payments.length > 0 ? (
              <div className="text-gray-700 space-y-2">
                <p><strong>Amount:</strong> ${payments[0].amount}</p>
                <p><strong>Date:</strong> {new Date(payments[0].paid_at).toLocaleDateString()}</p>
                <p><strong>Transaction ID:</strong> {payments[0].transactionId}</p>
              </div>
            ) : (
              <p className="text-gray-500">No payments found.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Parcels */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Parcels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3 text-left">Tracking ID</th>
                  <th className="p-3 text-left">Receiver</th>
                  <th className="p-3 text-left">Cost</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {parcels.slice(0, 5).map((p) => (
                  <tr key={p._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{p.tracking_id}</td>
                    <td className="p-3">{p.receiverName}</td>
                    <td className="p-3">${p.cost}</td>
                    <td className="p-3 capitalize">{p.delivery_status}</td>
                    <td className="p-3">{new Date(p.creation_date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default UserDashboard;
