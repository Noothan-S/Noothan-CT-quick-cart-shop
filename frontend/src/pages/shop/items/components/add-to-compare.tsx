import { Button } from "antd";
import { FC } from "react";
import { IProduct } from "../../../../interfaces/api.products.res.type";

const AddToCompare: FC<IProduct> = () => {
  return (
    <Button variant="outlined" size="large" color="danger">
      Compare
    </Button>
  );
};

export default AddToCompare;
