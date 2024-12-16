import { Button, Result } from "antd";
import Loading from "../../components/loading";
import { useGetMyProfileQuery } from "../../redux/features/user/user.api";
import { Link } from "react-router-dom";
import VendorProfile from "./components/vendor-profile";
import CustomerProfile from "./components/customer-profile";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/auth.slice";
import { decrypt } from "../../utils/text_encryption";

const Profile = () => {
  const user = useAppSelector(useCurrentUser);
  const { data: profile, isLoading, isError } = useGetMyProfileQuery({});
  if (isLoading) return <Loading />;

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

  if (decrypt(user!.role) === "VENDOR") {
    return <VendorProfile vendor={profile} />;
  } else {
    return <CustomerProfile customer={profile} />;
  }
};

export default Profile;
