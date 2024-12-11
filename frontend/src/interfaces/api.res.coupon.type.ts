export interface ICoupon {
  key: string;
  code: string;
  parentage: number;
  expiryDate: string;
  product: {
    title: string;
    price: number;
    id: string;
    vendor: {
      name: string;
    };
  };
}
