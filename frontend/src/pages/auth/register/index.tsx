import { useState } from "react";
import CreateUser from "./create_user";
import UpdateUser from "./update_user";

const Register = () => {
  const [isPassed, setIsPassed] = useState<false | string>(false);

  return <div>{!isPassed ? <CreateUser /> : <UpdateUser />}</div>;
};
export default Register;
