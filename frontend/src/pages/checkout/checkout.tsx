import { useState } from "react";
import { Form, Input, Button, Card, Divider, Typography, Space } from "antd";
import { UserOutlined, MailOutlined, HomeOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function Checkout() {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (values: any) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    console.log("Received values of form: ", values);
    alert("Order submitted successfully!");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "24px" }}>
      <Card>
        <Title level={2}>Checkout</Title>
        <Text type="secondary">
          Complete your order by providing your shipping information.
        </Text>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ marginTop: "24px" }}
        >
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[
              { required: true, message: "Please input your full name!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="John Doe" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="john@example.com" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input
              prefix={<HomeOutlined />}
              placeholder="123 Main St, City, Country"
            />
          </Form.Item>

          <Divider />

          <Title level={4}>Order Summary</Title>
          <Space direction="vertical" style={{ width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text>Subtotal</Text>
              <Text>$99.99</Text>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text>Shipping</Text>
              <Text>$9.99</Text>
            </div>
            <Divider style={{ margin: "12px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text strong>Total</Text>
              <Text strong>$109.98</Text>
            </div>
          </Space>

          <Form.Item style={{ marginTop: "24px" }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              block
            >
              {isSubmitting ? "Processing..." : "Place Order"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
