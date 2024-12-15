import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "antd";
import { useState } from "react";
import { parseCartDataForOrder } from "../../utils/parse-item-for-order";
import { useAppSelector } from "../../redux/hooks";
import { ICart, selectCart } from "../../redux/features/cart/cart.slice";
import { RootState } from "../../redux/store";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const cart: ICart[] = useAppSelector((state: RootState) => selectCart(state));

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
      const orderPayload = {
        ...parseCartDataForOrder(cart),
        paymentData: {
          txId: paymentIntent.id,
          gatewayData: paymentIntent.payment_method,
          amount: paymentIntent.amount,
        },
      };

      console.log(orderPayload);

      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <PaymentElement />
      <Button
        disabled={!stripe || isLoading}
        variant="solid"
        color="danger"
        block
        size="large"
        htmlType="submit"
      >
        {isLoading ? "Processing..." : "Pay Now"}
      </Button>

      {errorMessage && (
        <div className="text-red-500 text-sm">{errorMessage}</div>
      )}
    </form>
  );
};

export default PaymentForm;
