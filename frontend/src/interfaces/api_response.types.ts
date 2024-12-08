// Define the shape of the API response
export type Base = {
  status: number;
  success: boolean;
  message: string;
};

export type TApiResponse<T> = Base & {
  data: T;
};

// getting all categories
export type GetCategoriesResponse = TApiResponse<Category[]>;

// Define the shape of each category
export type Category = {
  id: string;
  name: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
