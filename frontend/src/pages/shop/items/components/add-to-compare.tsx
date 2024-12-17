import { Button } from "antd";
import { FC } from "react";
import { IProduct } from "../../../../interfaces/api.products.res.type";
import { useAppDispatch } from "../../../../redux/hooks";
import {
  addToCompare,
  ICompare,
} from "../../../../redux/features/compare/compare.slice";
import { toast } from "sonner";

const AddToCompare: FC<IProduct> = ({ id, categoryId }) => {
  const dispatch = useAppDispatch();

  const comparePayload: ICompare = {
    categoryId,
    productId: id,
  };

  function handleAddToCompare() {
    try {
      dispatch(addToCompare(comparePayload));
      toast.success("Item added");
    } catch (error: any) {
      if (error?.message === "category_conflict") {
        alert("Category conflict");
      } else if (error.message === "product_exist") {
        alert("product exist");
      }
    }
  }

  return (
    <Button
      onClick={handleAddToCompare}
      variant="outlined"
      size="large"
      color="danger"
    >
      Compare
    </Button>
  );
};

export default AddToCompare;
