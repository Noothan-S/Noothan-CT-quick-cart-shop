import React from "react";
import { useGetMyProfileQuery } from "../../../redux/features/user/profile.api";

const AllProduct: React.FC = () => {
  const { data: vendor } = useGetMyProfileQuery({});

  console.log(vendor);

  return <div>hello</div>;
};

export default AllProduct;
