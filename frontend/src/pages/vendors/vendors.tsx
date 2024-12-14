import { Button, Result } from "antd";
import Loading from "../../components/loading";
import { useGetAllVendorsQuery } from "../../redux/features/user/user.api";
import { Link } from "react-router-dom";
import VendorProfileCard from "../../components/vendors/vendor-card";
import { IVendorProfileData } from "../../interfaces/api.res.vendor.profile.type";
import VendorBanner from "../../components/vendors/banner";
import PopularProducts from "../../components/home/popular_products";

const VendorsPage = () => {
  const { data: vendors, isLoading, isError } = useGetAllVendorsQuery({});

  if (isLoading) return <Loading />;

  if (isError)
    return (
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={
          <Link to={"/"}>
            <Button danger>Back Home</Button>
          </Link>
        }
      />
    );
  return (
    <div className="pb-12 bg-gray-50">
      <VendorBanner />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {vendors.data.map((vendor: IVendorProfileData) => (
            <VendorProfileCard {...vendor} />
          ))}
        </div>
      </div>
      <PopularProducts />
    </div>
  );
};

export default VendorsPage;
