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
    isDeleted: boolean;
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

interface IOrderVendor {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  logo: string | null;
  description: string;
  isBlackListed: boolean;
}

export interface IAdminOrder {
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
  vendor: IOrderVendor;
}
