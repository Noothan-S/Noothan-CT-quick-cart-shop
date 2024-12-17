import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface ICompare {
  productId: string;
  categoryId: string;
}

const initialState: ICompare[] = [];

export const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    addToCompare: (state, action: PayloadAction<ICompare>) => {
      if (state.length >= 3) {
        throw new Error("limit extend");
      }

      if (state.length > 1) {
        const existingCategoryId = state[0].categoryId;

        if (existingCategoryId !== action.payload.categoryId) {
          throw new Error("category_conflict");
        }
      }

      const isExist = state.some(
        (item: ICompare) => item.productId === action.payload.productId
      );

      if (isExist) {
        throw new Error("product_exist");
      }

      state.push(action.payload);
    },

    replaceCompare: (_, action: PayloadAction<ICompare[]>) => {
      return action.payload;
    },
  },
});

export const { addToCompare, replaceCompare } = compareSlice.actions;
export const selectCompare = (state: RootState) => state.compare;
export default compareSlice.reducer;
