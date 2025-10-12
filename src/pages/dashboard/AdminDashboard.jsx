import { useQuery } from "@tanstack/react-query";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { FaUsers, FaBox, FaBiking, FaMoneyBillWave } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/Card";


const COLORS = ["#16a34a", "#2563eb", "#eab308", "#ef4444"];

export default function AdminDashboard() {
  const axiosSecure = useAxiosSecure();

  // Fetch parcels
  const { data: parcels = [] } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => (await axiosSecure.get("/parcels")).data,
  });

  // Fetch users
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => (await axiosSecure.get("/users/search?email=")).data,
  });

  // Fetch approved riders
  const { data: riders = [] } = useQuery({
    queryKey: ["riders"],
    queryFn: async () => (await axiosSecure.get("/riders/approved")).data,
  });

  // Fetch payments
 const { data: payments = [] } = useQuery({
  queryKey: ["payments"],
  queryFn: async () => (await axiosSecure.get("/admin/payments")).data,
});

  // Compute stats
  const totalRevenue = payments.reduce((a, b) => a + Number(b.amount), 0);

  const deliveryStatusData = Object.entries(
    parcels.reduce((acc, p) => {
      acc[p.delivery_status] = (acc[p.delivery_status] || 0) + 1;
      return acc;
    }, {})
  ).map(([status, count]) => ({ _id: status, count }));

  // Monthly revenue
  const revenueByMonth = payments.reduce((acc, p) => {
    const month = new Date(p.paid_at).getMonth() + 1;
    acc[month] = (acc[month] || 0) + Number(p.amount);
    return acc;
  }, {});
  const monthlyRevenue = Object.entries(revenueByMonth).map(([m, total]) => ({
    _id: m,
    total,
  }));

  return (
    <div className="p-6 space-y-8">
      {/* Top Stats */}
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex items-center gap-3">
            <FaBox className="text-blue-500 text-2xl" />
            <CardTitle>Total Parcels</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{parcels.length}</CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center gap-3">
            <FaUsers className="text-green-500 text-2xl" />
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{users.length}</CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center gap-3">
            <FaBiking className="text-orange-500 text-2xl" />
            <CardTitle>Total Riders</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{riders.length}</CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center gap-3">
            <FaMoneyBillWave className="text-yellow-500 text-2xl" />
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">${totalRevenue}</CardContent>
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
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#2563eb" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
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
                  <th className="p-3 text-left">Sender</th>
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
                    <td className="p-3">{p.senderName}</td>
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
