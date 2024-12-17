import { Button, Form, Input } from "antd";
import Logo from "../../../constants/logo";
import { MailOutlined } from "@ant-design/icons";

const ForgotPassword = () => {
  const [form] = Form.useForm();

  async function onFinish(data: { email: string }) {
    console.log(data);
  }

  return (
    <div className="bg-gray-50">
      <div className="flex flex-col items-center mt-20 md:mt-24 lg:mt-32 px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Logo />
        <div className="w-full !mt-5 bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:tp-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Forgot your password
            </h1>
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { type: "email", message: "Please enter a valid email!" },
                  {
                    required: true,
                    message: "Please enter your email address",
                  },
                ]}
              >
                <Input
                  size="large"
                  prefix={<MailOutlined />}
                  placeholder="john@example.com"
                />
              </Form.Item>

              <Form.Item style={{ marginTop: "24px" }}>
                <Button
                  color="danger"
                  variant="solid"
                  size="large"
                  htmlType="submit"
                  block
                >
                  Send Verification Email
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
