import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { useAppSelector } from "../../redux/hooks";
import { useCurrentToken } from "../../redux/features/auth/auth.slice";
import { ICart, selectCart } from "../../redux/features/cart/cart.slice";
import { RootState } from "../../redux/store";
import { config } from "../../config";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(config.stripe_publishable_key);

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message ?? "An unknown error occurred");
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // call order api

      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!stripe || isLoading}
        type="submit"
      >
        {isLoading ? "Processing..." : "Pay Now"}
      </button>
      {errorMessage && (
        <div className="text-red-500 text-sm">{errorMessage}</div>
      )}
    </form>
  );
}

export default function StripePayment() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const token = useAppSelector(useCurrentToken);
  const cart: ICart[] = useAppSelector((state: RootState) => selectCart(state));
  const navigate = useNavigate();

  if (!cart.length) {
    navigate("/");
  }

  // calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.item.payable * item.item.quantity,
    0
  );

  // calculate total discount
  const totalDiscount = cart.reduce(
    (total, item) => total + item.item.discount * item.item.quantity,
    0
  );

  useEffect(() => {
    fetch(`${config.server_url}/api/v1/payout/stripe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount: totalPrice - totalDiscount }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [token, totalDiscount, totalPrice]);

  if (!clientSecret) {
    return <div className="text-center">Loading...</div>;
  }

  console.log(clientSecret);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Make a Payment</h2>
        <Elements options={{ clientSecret }} stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      </div>
    </div>
  );
}
