export interface IProduct {
  id: string;
  vendorId: string;
  categoryId: string;
  title: string;
  imgs: string[];
  description: string;
  price: number;
  discount: number;
  quantity: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  category: Category;
  coupon: any[];
  vendor: Vendor;
  review: any[];
  orderItem: any[];
  avgRating: number;
  totalSale: number;
}

export interface Category {
  name: string;
  id: string;
}

export interface Vendor {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  logo: string;
  description: string;
  isBlackListed: boolean;
  createdAt: string;
  updatedAt: string;
}
