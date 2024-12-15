import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { useAppSelector } from "../../redux/hooks";
import { ICart, selectCart } from "../../redux/features/cart/cart.slice";
import { RootState } from "../../redux/store";
import { config } from "../../config";
import { useNavigate } from "react-router-dom";
import { useCreatePaymentIntentMutation } from "../../redux/features/orders/order.api";
import Loading from "../../components/loading";
import PaymentForm from "./payment-form";

const stripePromise = loadStripe(config.stripe_publishable_key);

export default function StripePayment() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const cart: ICart[] = useAppSelector((state: RootState) => selectCart(state));
  const navigate = useNavigate();
  const [createPaymentIntent] = useCreatePaymentIntentMutation();

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
    (async function () {
      const res = await createPaymentIntent({
        amount: totalPrice - totalDiscount,
      }).unwrap();

      if (!res.success) {
        throw new Error("Something bad happened");
      }

      setClientSecret(res.data.clientSecret);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPrice, totalDiscount]);

  if (!clientSecret) {
    return <Loading />;
  }

  return (
    <div className="w-full max-w-lg mx-auto py-20">
      <div className="bg-white shadow-md rounded-lg p-6">
        <Elements options={{ clientSecret }} stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      </div>
    </div>
  );
}
