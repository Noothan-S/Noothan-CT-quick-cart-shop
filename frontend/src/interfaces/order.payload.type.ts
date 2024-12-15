export interface INewOrderPayload {
  vendorId: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
}
