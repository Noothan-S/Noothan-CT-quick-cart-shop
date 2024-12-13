import { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { useCurrentUser } from "../redux/features/auth/auth.slice";

interface IProtectedRouteProps {
  children: ReactNode;
}
const ProtectedRoute: FC<IProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const user = useAppSelector(useCurrentUser);

  if (!user) {
    return <Navigate to={"/auth/login"} replace state={location.pathname} />;
  }

  return children;
};

export default ProtectedRoute;
