import React from "react";
import { Card, Avatar, Typography, Button, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { IVendorProfileData } from "../../interfaces/api.res.vendor.profile.type";

const { Title, Text } = Typography;

const VendorProfileCard: React.FC<IVendorProfileData> = ({
  logo,
  name,
  description,
  follower,
}) => {
  return (
    <Card
      hoverable
      cover={
        <div
          style={{
            height: 200,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#f0f2f5",
          }}
        >
          <Avatar src={logo} size={120} icon={<UserOutlined />}>
            {name.charAt(0)}
          </Avatar>
        </div>
      }
      actions={[
        <Button key="follow" danger>
          Follow
        </Button>,
        <Button key="viewProducts">View Products</Button>,
      ]}
    >
      <Card.Meta
        title={<Title level={4}>{name}</Title>}
        description={
          <Space direction="vertical">
            <Text>{description}</Text>
            <Text type="secondary">
              <UserOutlined /> {follower.length} followers
            </Text>
          </Space>
        }
      />
    </Card>
  );
};

export default VendorProfileCard;
