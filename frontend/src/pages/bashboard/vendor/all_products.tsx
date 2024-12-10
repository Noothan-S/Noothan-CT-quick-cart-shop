import React from "react";
import { useGetAllProductsQuery } from "../../../redux/features/products/products.api";
import { useAppSelector } from "../../../redux/hooks";
import { useCurrentUser } from "../../../redux/features/auth/auth.slice";
import { decrypt } from "../../../utils/text_encryption";
import Loading from "../../../components/loading";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const AllProduct: React.FC = () => {
  const user = useAppSelector(useCurrentUser);
  const { data, isLoading } = useGetAllProductsQuery({
    vendorId: decrypt(user.vendor),
  });

  if (isLoading) return <Loading />;
  if (data.data.length > 1) {
    return (
      <Result
        className="text-red-600"
        title="No Item Found"
        extra={
          <Link to={"/dashboard/vendor/add-product"}>
            {" "}
            <Button type="primary" key="console">
              Add One
            </Button>
          </Link>
        }
      />
    );
  }

  return <div>hello</div>;
};

export default AllProduct;
