export interface IReviewResponse {
  id: string;
  productId: string;
  userId: string;
  description: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  product: IReviewProduct;
  vendorResponse: IReviewVendorResponse[];
  user: IReviewUser;
}

export interface IReviewProduct {
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
}

export interface IReviewVendorResponse {
  id: string;
  reviewId: string;
  vendorId: string;
  description: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IReviewUser {
  profile: IReviewProfile;
}

export interface IReviewProfile {
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
