import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Input, Row, Space } from "antd";

const EditCouponDrawer: React.FC = () => {
  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        New account
      </Button>
      <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
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
