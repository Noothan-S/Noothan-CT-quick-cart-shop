import { Button, Drawer, Space } from "antd";
import { Dispatch, FC, SetStateAction } from "react";

interface ICartDrawerProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const ShoppingCartDrawer: FC<ICartDrawerProps> = ({ isOpen, setIsOpen }) => {
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
        <div className="">heeh</div>
      </Drawer>
    </>
  );
};

export default ShoppingCartDrawer;
