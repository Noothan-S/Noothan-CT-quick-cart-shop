import {
  Form,
  Input,
  Button,
  Card,
  Divider,
  Typography,
  Space,
  Result,
  Modal,
} from "antd";
import { UserOutlined, MailOutlined, HomeOutlined } from "@ant-design/icons";
import { useGetMyProfileQuery } from "../../redux/features/user/user.api";
import Loading from "../../components/loading";
import { Link, useNavigate } from "react-router-dom";
import { ICart, selectCart } from "../../redux/features/cart/cart.slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { formatPrice } from "../../utils/format-price";
import { logOut, useCurrentUser } from "../../redux/features/auth/auth.slice";
import { useState } from "react";
import { decrypt } from "../../utils/text_encryption";
import UserRole from "../../constants/user_role";

const { Title, Text } = Typography;

export default function Checkout() {
  const [form] = Form.useForm();
  const { data: profile, isError, isLoading } = useGetMyProfileQuery({});
  const cart: ICart[] = useAppSelector((state: RootState) => selectCart(state));
  const navigate = useNavigate();
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();
  const [userConflict, setUserConflict] = useState<boolean>(false);

  if (!cart.length) {
    navigate("/");
  }

  // calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.item.payable * item.item.quantity,
    0
  );

  // calculate total discount
  const totalDiscount = cart.reduce(
    (total, item) => total + item.item.discount * item.item.quantity,
    0
  );

  const onFinish = async () => {
    if (decrypt(user?.role as string) !== UserRole.customer) {
      setUserConflict(true);
      return;
    }

    navigate("/payout");
  };

  if (isLoading) return <Loading />;
  if (isError) {
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Link to={"/"}>
          <Button danger>Back Home</Button>
        </Link>
      }
    />;
  }

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
          <Form.Item name="fullName" label="Full Name">
            <Input
              size="large"
              defaultValue={`${profile.firstName} ${profile.lastName}`}
              prefix={<UserOutlined />}
              placeholder="John Doe"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ type: "email", message: "Please enter a valid email!" }]}
          >
            <Input
              defaultValue={profile.email}
              size="large"
              prefix={<MailOutlined />}
              placeholder="john@example.com"
            />
          </Form.Item>

          <Form.Item name="address" label="Address">
            <Input
              size="large"
              defaultValue={profile.address}
              prefix={<HomeOutlined />}
              placeholder="123 Main St, City, Country"
            />
          </Form.Item>

          <Divider />

          <Title level={4}>Order Summary</Title>
          <Space direction="vertical" style={{ width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text>Subtotal</Text>
              <Text>{formatPrice(totalPrice)}</Text>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text>Discount</Text>
              <Text>{formatPrice(totalDiscount)}</Text>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text>Shipping</Text>
              <Text>$0.00</Text>
            </div>
            <Divider style={{ margin: "12px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text strong>Total</Text>
              <Text strong>{formatPrice(totalPrice - totalDiscount)}</Text>
            </div>
          </Space>

          <Form.Item style={{ marginTop: "24px" }}>
            <Button
              color="danger"
              variant="solid"
              size="large"
              htmlType="submit"
              block
            >
              Pay and Confirm Order
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Modal
        title="Order placement is restricted to customers"
        centered
        open={userConflict}
        okType="danger"
        onOk={() => dispatch(logOut())}
        okText="Login as Customer"
        cancelText="Go Home"
        onCancel={() => navigate("/")}
      >
        <p>
          This action is restricted to customer accounts. Vendors and admins
          cannot place orders.
        </p>
      </Modal>
    </div>
  );
}
