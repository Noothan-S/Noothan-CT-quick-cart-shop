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
      console.log(action);
    },
  },
});

export const { addToCompare } = compareSlice.actions;
export const selectCompare = (state: RootState) => state.compare;
export default compareSlice.reducer;
