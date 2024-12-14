import {
  Button,
  Card,
  Divider,
  Drawer,
  Image,
  InputNumber,
  List,
  Space,
  Typography,
} from "antd";
import { Dispatch, FC, SetStateAction } from "react";
import { ICart, selectCart } from "../../redux/features/cart/cart.slice";
import { RootState } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks";
import { Trash } from "lucide-react";
import ButtonGroup from "antd/es/button/button-group";
const { Title, Text } = Typography;
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { formatPrice } from "../../utils/format-price";

interface ICartDrawerProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const ShoppingCartDrawer: FC<ICartDrawerProps> = ({ isOpen, setIsOpen }) => {
  const cart: ICart[] = useAppSelector((state: RootState) => selectCart(state));

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

  return (
    <>
      <Drawer
        title="Cart"
        width={500}
        onClose={() => setIsOpen(false)}
        open={isOpen}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button variant="solid" color="danger">
              {" "}
              Proceed to Checkout
            </Button>
          </Space>
        }
      >
        <List
          dataSource={cart}
          renderItem={(order, indx) => (
            <List.Item
              key={indx}
              actions={[
                <Button key="delete" type="text" danger icon={<Trash />}>
                  Remove
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Image
                    src={order.item.img}
                    alt={order.item.title}
                    width={64}
                    height={64}
                    className="object-cover rounded"
                  />
                }
                title={order.item.title}
                description={
                  <Text type="secondary">
                    {formatPrice(order.item.payable)}
                  </Text>
                }
              />
              <div>
                <ButtonGroup size="small">
                  <Button
                    disabled={order.item.quantity <= 1}
                    icon={<MinusOutlined />}
                  />
                  <Button
                    disabled={order.item.quantity >= 20}
                    icon={<PlusOutlined />}
                  />
                </ButtonGroup>
              </div>
            </List.Item>
          )}
        />
        <Divider />
        <Space className="w-full justify-between">
          <Title level={5}>Discount: {formatPrice(totalDiscount)}</Title>
          <Title level={5}>Subtotal: {formatPrice(totalPrice)}</Title>
        </Space>
      </Drawer>
    </>
  );
};

export default ShoppingCartDrawer;
