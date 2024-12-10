import React from "react";
import { useGetAllProductsQuery } from "../../../redux/features/products/products.api";
import { useAppSelector } from "../../../redux/hooks";
import { useCurrentUser } from "../../../redux/features/auth/auth.slice";
import { decrypt } from "../../../utils/text_encryption";
import Loading from "../../../components/loading";
import { Empty } from "antd";
import Products from "../../../components/dashboard/products";

const AllProduct: React.FC = () => {
  const user = useAppSelector(useCurrentUser);

  const { data, isLoading } = useGetAllProductsQuery(
    user?.vendor ? { vendorId: decrypt(user.vendor) } : {},
    { skip: !user }
  );

  if (isLoading) return <Loading />;
  if (data.data.length < 1) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  return <Products products={data.data} />;
};

export default AllProduct;
