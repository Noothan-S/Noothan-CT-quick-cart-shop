import { FC } from "react";
import { Link } from "react-router-dom";
import { IVendor } from "../../../../interfaces/api.products.res.type";

const ShopInfo: FC<IVendor> = ({ name, id }) => {
  return (
    <div className="mb-6">
      <p className="text-sm text-muted-foreground">
        Sold by:{" "}
        <Link
          to={`/products?vendor=${id}`}
          className="text-primary hover:underline"
        >
          {name}
        </Link>
      </p>
    </div>
  );
};

export default ShopInfo;
