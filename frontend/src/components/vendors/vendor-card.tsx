import React from "react";
import { Card, Avatar, Typography, Button, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { IVendorProfileData } from "../../interfaces/api.res.vendor.profile.type";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/auth.slice";
import { decrypt } from "../../utils/text_encryption";
import { toast } from "sonner";

const { Title, Text } = Typography;

const VendorProfileCard: React.FC<IVendorProfileData> = ({
  logo,
  name,
  description,
  follower,
  id,
}) => {
  const user = useAppSelector(useCurrentUser);

  const isAlreadyFollowed = follower.some(
    (item) => item.userId === decrypt(user?.id)
  );

  async function handleFollowUnfollow(vendorId: string) {
    if (!user) {
      toast.info("You are not logged in!");
      return;
    }
  }

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
        <Button onClick={() => handleFollowUnfollow(id)} key="follow" danger>
          {isAlreadyFollowed ? "Unfollow" : "Follow"}
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
