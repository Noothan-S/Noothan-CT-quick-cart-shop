import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
export interface ICart {
  vendorId: string;
  item: {
    id: string;
    title: string;
    discount: number;
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
      // Check if the cart already has items
      if (state.length > 0) {
        const existingVendorId = state[0].vendorId;

        // If the vendorId is different, set a conflict flag and throw an error
        if (existingVendorId && existingVendorId !== action.payload.vendorId) {
          throw new Error("vendor_conflict");
        }
      }

      // Check if the product already exists in the cart
      const isExist = state.find(
        (cartItem) => cartItem.item.id === action.payload.item.id
      );

      if (isExist) {
        isExist.item.quantity += action.payload.item.quantity;
        isExist.item.payable += action.payload.item.payable;
        isExist.item.discount += action.payload.item.discount;
        return;
      }

      // Add the new product to the cart
      state.push(action.payload);
    },

    replaceCart: (_, action: PayloadAction<ICart[]>) => {
      // Replace the entire cart with the new vendor's products
      return action.payload;
    },

    updateQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        actionType: "increment" | "decrement";
      }>
    ) => {
      const targetedItem = state.find(
        (item) => item.item.id === action.payload.productId
      );

      if (targetedItem) {
        const itemPrice =
          targetedItem.item.payable / targetedItem.item.quantity;
        const itemDiscount =
          targetedItem.item.discount / targetedItem.item.quantity;

        if (action.payload.actionType === "increment") {
          targetedItem.item.quantity += 1;
          targetedItem.item.payable += itemPrice;
          targetedItem.item.discount += itemDiscount;
        }
      }
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const { addToCart, replaceCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
