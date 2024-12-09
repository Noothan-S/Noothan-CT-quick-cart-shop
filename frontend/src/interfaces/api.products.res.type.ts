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
  category: ICategory;
  coupon: any[];
  avgRating: number;
  totalSale: number;
  vendor: IVendor;
  review: IReview[];
}

export interface ICategory {
  name: string;
  id: string;
}

export interface IVendor {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  logo: any;
  description: string;
  isBlackListed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IReview {
  id: string;
  productId: string;
  userId: string;
  description: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  user: IUser;
  vendorResponse: IVendorResponse[];
}

export interface IVendorResponse {
  id: string;
  reviewId: string;
  vendorId: string;
  description: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  profile: IProfile;
}

export interface IProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  img: any;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
