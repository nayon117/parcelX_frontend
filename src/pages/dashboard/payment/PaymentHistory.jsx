import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { format } from "date-fns";
import { MdPayment, MdOutlineReceiptLong } from "react-icons/md";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-color2 font-semibold text-lg">
        Loading Payment History...
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-color2 space-y-4">
        <MdPayment size={60} className="text-color1" />
        <h2 className="text-2xl font-bold">No Payments Yet</h2>
        <p className="text-gray-500 text-center max-w-sm">
          You haven’t made any payments yet. Once you make a payment, it will
          appear here.
        </p>
      </div>
    );
  }



  return (
    <div className="p-6 font-montserrat text-color3">
      <h2 className="text-2xl font-bold mb-6 text-color2 flex items-center space-x-2">
        <MdOutlineReceiptLong size={24} />
        <span>Payment History</span>
      </h2>
      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-color2 text-white">
            <tr>
              <th className="text-left">#</th>
              <th className="text-left">Parcel ID</th>
              <th className="text-left">Amount ($)</th>
              <th className="text-left">Transaction ID</th>
              <th className="text-left">Paid At</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr
                key={payment._id}
                className="hover:bg-gray-100 transition-colors duration-200"
              >
                <td>{index + 1}</td>
                <td
                  className="truncate max-w-xs"
                  title={payment.parcelId}
                >
                  {payment.parcelId}
                </td>
                <td>{payment.amount}</td>
                <td
                  className="truncate max-w-xs"
                  title={payment.transactionId}
                >
                  {payment.transactionId}
                </td>
                <td>{format(new Date(payment.paid_at), "PPpp")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
