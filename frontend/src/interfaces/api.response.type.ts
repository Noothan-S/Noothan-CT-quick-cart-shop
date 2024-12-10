interface resBody {
  status: number;
  success: boolean;
  message: string;
  data: any;
  error?: string;
}

export interface IProductMeta {
  total: number;
  totalPages: number;
  page: number;
  limit: number;
}

export type IApiResponse = resBody | { error: string } | undefined;
