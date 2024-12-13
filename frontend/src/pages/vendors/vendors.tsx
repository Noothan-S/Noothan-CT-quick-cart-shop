import { Button, Result } from "antd";
import Loading from "../../components/loading";
import { useGetAllVendorsQuery } from "../../redux/features/user/user.api";
import { Link } from "react-router-dom";

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
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">w</div>
    </div>
  );
};

export default VendorsPage;
