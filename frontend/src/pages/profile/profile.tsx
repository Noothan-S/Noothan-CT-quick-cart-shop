import { Button, Result } from "antd";
import Loading from "../../components/loading";
import { useGetMyProfileQuery } from "../../redux/features/user/user.api";
import { Link } from "react-router-dom";
import VendorProfile from "./components/vendor-profile";

const Profile = () => {
  const { data: profile, isLoading, isError } = useGetMyProfileQuery({});
  if (isLoading) return <Loading />;

  console.log(profile);

  if (isError)
    return (
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={
          <Link to={"/"}>
            <Button color="danger" variant="filled">
              Back Home
            </Button>
          </Link>
        }
      />
    );

  return <VendorProfile vendor={profile} />;
};

export default Profile;
