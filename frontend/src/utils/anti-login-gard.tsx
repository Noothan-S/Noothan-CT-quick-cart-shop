import { FC, ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { useCurrentUser } from "../redux/features/auth/auth.slice";
import { Navigate } from "react-router-dom";

const AntiLoginGard: FC<{ children: ReactNode }> = ({ children }) => {
  const user = useAppSelector(useCurrentUser);

  if (user) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

export default AntiLoginGard;
