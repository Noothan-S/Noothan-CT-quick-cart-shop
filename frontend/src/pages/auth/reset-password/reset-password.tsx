import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { decodeToken } from "../../../utils/jwt-decode";
import { Button, Form, Input, Result, message } from "antd";
import Logo from "../../../constants/logo";

const ResetPassword: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const [isPassed, setIsPassed] = useState<boolean>(true);
  const [form] = Form.useForm();
  const decodedToken = decodeToken(token);

  useEffect(() => {
    if (!decodedToken) {
      setIsPassed(false);
    }
  }, [decodedToken]);

  const onFinish = async (values: { password: string; confirm: string }) => {
    try {
      // Here you would typically send the new password to your backend
      console.log("New password:", values.password);
      message.success("Password reset successfully!");
      // Redirect to login page or show success message
    } catch (error) {
      message.error("Failed to reset password. Please try again.");
    }
  };

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

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center px-6 py-8">
      <Logo />
      <div className="w-full max-w-md bg-white rounded-lg shadow mt-6 p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Reset your password
        </h1>
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
