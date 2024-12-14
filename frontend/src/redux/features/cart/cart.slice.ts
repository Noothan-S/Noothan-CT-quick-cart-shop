import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface ICart {
  vendorId?: string;
  item: {
    id: string;
    title: string;
    img: string;
    quantity: number;
    payable: number;
  };
}

const initialState: ICart[] = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICart>) => {
      const isExist = state.find(
        (item) => item.item.id === action.payload.item.id
      );

      if (isExist) {
        isExist.item.quantity = action.payload.item.quantity;
        isExist.item.payable = action.payload.item.payable;
        return;
      }

      state.push(action.payload);
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
