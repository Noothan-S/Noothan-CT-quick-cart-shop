import { useState } from "react";
import CreateUser from "./create_user";
import UpdateUser from "./update_user";
import UpdateVendor from "./update_vendor";

const Register = () => {
  const [isPassed, setIsPassed] = useState<
    | false
    | {
        email: string;
        role: "CUSTOMER" | "VENDOR";
      }
  >(false);

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
