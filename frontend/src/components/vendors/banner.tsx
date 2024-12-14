import { Space } from "antd";
import { FC } from "react";
import { ShopOutlined } from "@ant-design/icons";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";

const VendorBanner: FC = () => {
  return (
    <div className="text-center mb-16 bg-gradient-to-r from-red-300 py-10 px-6 to-red-400">
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <ShopOutlined style={{ fontSize: "48px" }} />
        <Title level={2} style={{ color: "block", margin: 0 }}>
          Discover Our Trusted Vendors
        </Title>
        <Paragraph
          style={{ fontSize: "16px", maxWidth: "600px", margin: "0 auto" }}
        >
          Explore a wide range of high-quality products and services from our
          carefully selected vendors. Find the perfect match for your needs and
          start shopping with confidence.
        </Paragraph>
      </Space>
    </div>
  );
};

export default VendorBanner;
