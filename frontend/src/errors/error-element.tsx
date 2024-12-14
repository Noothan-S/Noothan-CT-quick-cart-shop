import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const ErrorElement: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to={"/"}>
            <Button danger>Back Home</Button>
          </Link>
        }
      />
    </div>
  );
};

export default ErrorElement;
