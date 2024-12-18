import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { decodeToken } from "../../../utils/jwt-decode";
import { Button, Result } from "antd";

const ResetPassword = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location?.search);
  const token = searchParams.get("token");
  const [isPassed, setIsPassed] = useState<boolean>(true);

  const decodedToken = decodeToken(token);

  useEffect(() => {
    if (!decodedToken) {
      setIsPassed(false);
    }
  }, [decodedToken]);

  if (!isPassed)
    return (
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Link to="/">
            <Button danger>Back Home</Button>
          </Link>
        }
      />
    );

  return <div>{token}</div>;
};

export default ResetPassword;
