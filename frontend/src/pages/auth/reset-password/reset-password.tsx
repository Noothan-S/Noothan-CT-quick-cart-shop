import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { decodeToken } from "../../../utils/jwt-decode";
import { Button, Form, Input, Result } from "antd";
import Logo from "../../../constants/logo";
import { config } from "../../../config";

const ResetPassword: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const [isPassed, setIsPassed] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const decodedToken = decodeToken(token);

  const onFinish = async (values: { password: string; confirm: string }) => {
    try {
      setIsLoading(true);
      fetch(`${config.server_url}/api/v1/auth/reset-password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword: values.password }),
      }).then((res) => {
        if (res.ok) {
          setIsSuccess(true);
          setIsLoading(false);
        } else {
          setIsError(true);
          setIsLoading(false);
        }
      });
    } catch (error) {
      console.log("Error when reset password", error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    if (!decodedToken) {
      setIsPassed(false);
    }
  }, [decodedToken]);

  if (!isPassed) {
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
  }

  console.log(decodedToken);

  if (isSuccess && isPassed)
    return (
      <Result
        status="success"
        title="Welcome Back"
        subTitle="Congratulations! You have successfully recovered your account. You can now log in to your account with your new password. Happy shopping."
        extra={[
          <Link to="/auth/login">
            <Button danger key="console">
              Login
            </Button>
          </Link>,
          <Link to="/">
            <Button key="buy">Go Home</Button>
          </Link>,
        ]}
      />
    );

  if (isError)
    return (
      <Result
        status="error"
        title="Password reset failed"
        subTitle="An error occurred while trying to change the password. Please try again."
        extra={[
          <Link to="/auth/login">
            <Button danger key="console">
              Login
            </Button>
          </Link>,
          <Link to="/">
            <Button key="buy">Go Home</Button>
          </Link>,
        ]}
      ></Result>
    );

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center px-6 py-8">
      <Logo />
      <div className="w-full max-w-md bg-white rounded-lg shadow mt-6 p-8">
        <h1 className="text-2xl font-bold mb-6">Reset your password</h1>
        <Form
          form={form}
          name="reset_password"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="password"
            label="New Password"
            rules={[
              { required: true, message: "Please input your new password!" },
              {
                pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/,
                message:
                  "Password must be at least 6 characters and include letter, number, and may special character!",
              },
            ]}
            hasFeedback
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm New Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your new password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item>
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              danger
              size="large"
              block
              className="mt-4"
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
