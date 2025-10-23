import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ['parcels', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${id}`);
      return res.data;
    }
  });

  if (isPending) {
    return <div>Loading...</div>
  }

  const amount = parcelInfo.cost;
  const amountInCents = amount * 100; // Convert to cents

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError('');

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (pmError) {
      setError(pmError.message);
      setLoading(false);
      console.log("[error]", pmError);
      return;
    } else {
      setError('');
      console.log("[PaymentMethod]", paymentMethod);
    }

    // create payment intent
    const res = await axiosSecure.post('/payments/create-payment-intent', { 
      amount: amountInCents,
      id: id
    });

    const result = await stripe.confirmCardPayment(res.data.clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName || 'Anonymous',
          email: user?.email || 'unknown',
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
      setLoading(false);
    } else {
      setError('');
      if (result.paymentIntent.status === "succeeded") {
        // mark parcel paid also create payment record
        const paymentData = {
          id,
          email: user?.email,
          transactionId: result.paymentIntent.id,
          amount,
          paymentMethod: result.paymentIntent.payment_method_types[0],
        }
        const paymentRes = await axiosSecure.post('/payments', paymentData);
        if(paymentRes.data){
          Swal.fire({
            icon: 'success',
            title: 'Payment Successful',
            text: `Your transaction ID: ${result.paymentIntent.id}`,
            confirmButtonText: "Go to My Parcels",
          });
          navigate('/dashboard/myParcels');
        }
      }
      setLoading(false);
    }

    console.log('Payment Intent Response:', res.data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen font-montserrat">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-color2">
          Make a Payment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#1e293b",
                    fontFamily: "Montserrat, sans-serif",
                    "::placeholder": { color: "#9ca3af" }, 
                  },
                  invalid: { color: "#e11d48" },
                },
              }}
            />
          </div>

          <button
            type="submit"
            disabled={!stripe || loading}
            className="w-full py-3 rounded-lg font-semibold transition-colors bg-color1 text-color2 hover:bg-color2 hover:text-white cursor-pointer"
          >
            {loading ? "Processing..." : `Pay ${amount}$`}
          </button>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
