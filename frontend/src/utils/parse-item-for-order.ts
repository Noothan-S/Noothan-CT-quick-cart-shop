import { INewOrderPayload } from "../interfaces/order.payload.type";
import { ICart } from "../redux/features/cart/cart.slice";

export function parseCartDataForOrder(input: ICart[]): INewOrderPayload {
  return {
    vendorId: input[0]?.vendorId,
    items: input.map(({ item }) => ({
      productId: item.id,
      quantity: item.quantity,
      price: parseFloat((item.payable - item.discount).toFixed(2)),
    })),
  };
}
