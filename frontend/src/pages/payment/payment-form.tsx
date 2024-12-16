import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button, Result } from "antd";
import { useState } from "react";
import { parseCartDataForOrder } from "../../utils/parse-item-for-order";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  clearCart,
  ICart,
  selectCart,
} from "../../redux/features/cart/cart.slice";
import { RootState } from "../../redux/store";
import { useCreateNewOrderMutation } from "../../redux/features/orders/order.api";
import { INewOrderPayload } from "../../interfaces/order.payload.type";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const cart: ICart[] = useAppSelector((state: RootState) => selectCart(state));
  const [createNewOrder] = useCreateNewOrderMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function handleCreateNewOrder(
    payload: INewOrderPayload
  ): Promise<void> {
    try {
      const res = await createNewOrder(payload).unwrap();
      if (res.success) {
        setIsSuccess(true);
      }

      setTimeout(() => {
        navigate("/");
        dispatch(clearCart());
      }, 5000);
    } catch (error) {
      toast.error("Something bad happened!");
      setIsLoading(false);
      navigate("/");
      console.log("Error when creating new order", error);
    }
  }

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
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      const orderPayload = {
        ...parseCartDataForOrder(cart),
        paymentData: {
          txId: paymentIntent.id,
          gatewayData: paymentIntent.payment_method,
          amount: paymentIntent.amount,
        },
      };

      handleCreateNewOrder(orderPayload);
    }
  };

  if (isSuccess) {
    return (
      <Result
        status="success"
        title="Successfully Purchased"
        subTitle={`Order number: ${Math.random()}. Order Confirmation takes 1-5 hours, please wait.`}
        extra={[
          <Link to="/">
            <Button
              onClick={() => dispatch(clearCart())}
              type="default"
              key="console"
            >
              Go Home
            </Button>
          </Link>,
          <Link to="/products">
            <Button onClick={() => dispatch(clearCart())} danger>
              Buy Again
            </Button>
            ,
          </Link>,
        ]}
      />
    );
  } else {
    return (
      <form className="space-y-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Make Payment</h2>
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
  }
};

export default PaymentForm;
