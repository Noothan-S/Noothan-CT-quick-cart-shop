import { FC } from "react";
import { Link } from "react-router-dom";
import { Vendor } from "../../../../interfaces/api.products.res.type";

const ShopInfo: FC<Vendor> = ({ name, id }) => {
  return (
    <div className="mb-6">
      <p className="text-sm text-muted-foreground">
        Sold by:{" "}
        <Link to={`/shop/${id}`} className="text-primary hover:underline">
          {name}
        </Link>
      </p>
    </div>
  );
};

export default ShopInfo;
