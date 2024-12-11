export interface IReviewData {
  id: string;
  productId: string;
  userId: string;
  description: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  product: {
    title: string;
    vendor: {
      name: string;
    };
  };
  user: {
    profile: {
      firstName: string;
      lastName: string;
    };
  };
  vendorResponse: Array<{
    description: string;
  }>;
}
