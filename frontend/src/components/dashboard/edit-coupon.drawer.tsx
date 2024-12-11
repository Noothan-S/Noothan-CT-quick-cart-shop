import { Dispatch, SetStateAction } from "react";
import { Button, Col, Drawer, Input, Row, Space } from "antd";
import { ICoupon } from "../../interfaces/api.res.coupon.type";

interface IEditCouponDrawerProps {
  coupon: ICoupon;
  setClickedCoupon: Dispatch<SetStateAction<null | ICoupon>>;
}
const EditCouponDrawer = ({
  coupon,
  setClickedCoupon,
}: IEditCouponDrawerProps) => {
  return (
    <>
      <Drawer
        title={`Edit ${coupon.code}`}
        width={720}
        onClose={() => setClickedCoupon(null)}
        open={!!coupon}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={() => setClickedCoupon(null)}>Cancel</Button>
            <Button type="primary">Submit</Button>
          </Space>
        }
      >
        <form>
          <Row gutter={16}>
            <Col span={24}>
              <Input placeholder="name" />
            </Col>
          </Row>
        </form>
      </Drawer>
    </>
  );
};

export default EditCouponDrawer;
