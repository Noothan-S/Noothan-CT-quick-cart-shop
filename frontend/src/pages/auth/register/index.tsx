import { useState } from "react";
import CreateUser from "./create_user";
import UpdateUser from "./update_user";
import UpdateVendor from "./update_vendor";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { useCurrentUser } from "../../../redux/features/auth/auth.slice";

const Register = () => {
  const navigate = useNavigate();
  const user = useAppSelector(useCurrentUser);
  const [isPassed, setIsPassed] = useState<
    | false
    | {
        email: string;
        role: "CUSTOMER" | "VENDOR";
      }
  >(false);

  if (user) {
    navigate("/profile");
  }

  return (
    <div>
      {!isPassed ? (
        <CreateUser setIsPassed={setIsPassed} />
      ) : isPassed.role === "CUSTOMER" ? (
        <UpdateUser
          metadata={{
            email: isPassed.email,
            setIsPassed: setIsPassed,
          }}
        />
      ) : (
        <UpdateVendor
          metadata={{
            email: isPassed.email,
            setIsPassed: setIsPassed,
          }}
        />
      )}
    </div>
  );
};
export default Register;
