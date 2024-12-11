export interface IOrderUserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  img: string | null;
}

export interface IOrderItem {
  id: string;
  productId: string;
  orderId: string;
  quantity: number;
  product: {
    id: string;
    title: string;
    price: number;
    discount: number;
  };
}

export interface IVendorOrder {
  id: string;
  userId: string;
  vendorId: string;
  totalPrice: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
  user: {
    profile: IOrderUserProfile;
  };
  items: IOrderItem[];
}
