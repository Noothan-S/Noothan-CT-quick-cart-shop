import { FC, ReactNode } from "react";
import { useGetLoggedInUserQuery } from "../redux/features/auth/auth.api";
import Loading from "../components/loading";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { logOut } from "../redux/features/auth/auth.slice";
import { useAppDispatch } from "../redux/hooks";

interface ICheckUserStatusProps {
  children: ReactNode;
}
const CheckUserStatus: FC<ICheckUserStatusProps> = ({ children }) => {
  const { data: user, isError, isLoading } = useGetLoggedInUserQuery({});
  const dispatch = useAppDispatch();

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

  if (user?.data?.status !== "ACTIVE") {
    toast.info("Account Blocked");
    dispatch(logOut());
  }

  return children;
};

export default CheckUserStatus;
