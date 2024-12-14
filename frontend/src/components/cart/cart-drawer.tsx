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
const { Title, Text } = Typography;

interface ICartDrawerProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const ShoppingCartDrawer: FC<ICartDrawerProps> = ({ isOpen, setIsOpen }) => {
  const cart: ICart[] = useAppSelector((state: RootState) => selectCart(state));

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
                  <Text type="secondary">${order.item.payable.toFixed(2)}</Text>
                }
              />
              <div>
                <InputNumber
                  min={1}
                  value={order.item.quantity}
                  // onChange={(value) =>
                  //   updateQuantity(order.id, value as number)
                  // }
                />
              </div>
            </List.Item>
          )}
        />
        <Divider />
        <Space className="w-full justify-between">
          <Title level={4}>Total: $4343434</Title>
          <Button type="primary" size="large">
            Proceed to Checkout
          </Button>
        </Space>
      </Drawer>
    </>
  );
};

export default ShoppingCartDrawer;
