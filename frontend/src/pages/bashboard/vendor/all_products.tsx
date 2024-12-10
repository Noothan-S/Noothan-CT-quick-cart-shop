import React, { useState } from "react";
import { useGetAllProductsQuery } from "../../../redux/features/products/products.api";
import { useAppSelector } from "../../../redux/hooks";
import { useCurrentUser } from "../../../redux/features/auth/auth.slice";
import { decrypt } from "../../../utils/text_encryption";
import Loading from "../../../components/loading";
import { Empty, Result } from "antd";
import Products from "../../../components/dashboard/products";

const AllProduct: React.FC = () => {
  const user = useAppSelector(useCurrentUser);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const { data, isLoading, isError } = useGetAllProductsQuery(
    user?.vendor
      ? { vendorId: decrypt(user.vendor), limit: 5, page: currentPage }
      : {},
    { skip: !user?.vendor }
  );

  if (isLoading) return <Loading />;
  if (isError) return <Result status={"500"} />;

  if (data.data.length < 1) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  return (
    <Products
      products={data.data}
      meta={data.meta}
      setCurrentPage={setCurrentPage}
    />
  );
};

export default AllProduct;
