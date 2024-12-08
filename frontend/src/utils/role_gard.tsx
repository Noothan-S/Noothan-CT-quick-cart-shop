import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { useCurrentUser } from "../redux/features/auth/auth.slice";
import { decrypt } from "./text_encryption";

const RoleGard = ({
  children,
  role,
}: {
  children: ReactNode;
  role: string;
}) => {
  const location = useLocation();
  const user = useAppSelector(useCurrentUser);

  if (!user)
    return <Navigate to={"/auth/login"} replace state={location.pathname} />;
  if (decrypt(user.role) !== role) {
    return <Navigate to={"/"} replace />;
  }
  return children;
};

export default RoleGard;
