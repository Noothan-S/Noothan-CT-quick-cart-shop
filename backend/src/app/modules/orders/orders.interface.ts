import { OrderItem, Payment } from "@prisma/client";

type IOrderItem = OrderItem & { price: number }
export interface ICreateOrderPayload {
    userId: string;
    vendorId: string;
    items: IOrderItem[];
    paymentData?: Payment;
}