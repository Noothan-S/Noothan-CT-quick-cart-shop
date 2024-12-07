interface resBody {
  status: number;
  success: boolean;
  message: string;
  data: any;
  error?: string;
}

export type IApiResponse = resBody | { error: string } | undefined;
