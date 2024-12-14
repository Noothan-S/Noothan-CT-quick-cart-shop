import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface ICart {
  vendorId: string;
  id: string;
  title: string;
  img: string;
  quantity: number;
  payable: number;
}

const initialState: ICart[] = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICart>) => {
      console.log(action);
      console.log({ action });
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
