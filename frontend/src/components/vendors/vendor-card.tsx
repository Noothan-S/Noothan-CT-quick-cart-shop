import React, { useEffect, useState } from "react";
import { Card, Avatar, Typography, Button, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { IVendorProfileData } from "../../interfaces/api.res.vendor.profile.type";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/auth.slice";
import { decrypt } from "../../utils/text_encryption";
import { toast } from "sonner";
import { useFollowUnfollowVendorMutation } from "../../redux/features/follow/follow.api";
import { Link } from "react-router-dom";
import UserRole from "../../constants/user_role";

const { Title, Text } = Typography;

const VendorProfileCard: React.FC<IVendorProfileData> = ({
  logo,
  name,
  description,
  follower,
  id,
}) => {
  const user = useAppSelector(useCurrentUser);
  const [followUnfollow] = useFollowUnfollowVendorMutation();
  const [isAlreadyFollowed, setIsAlreadyFollowed] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      const isAlreadyFollowed = follower.some(
        (item) => item.userId === decrypt(user.id)
      );

      if (isAlreadyFollowed) {
        setIsAlreadyFollowed(true);
      } else {
        setIsAlreadyFollowed(false);
      }
    }
  }, [follower, user]);

  async function handleFollowUnfollow(vendorId: string) {
    if (!user) {
      toast.info("You are not logged in!");
      return;
    } else if (decrypt(user.role) !== UserRole.customer) {
      toast.info("This Feature Only for Customers!");
      return;
    }

    try {
      const res = await followUnfollow({ vendorId }).unwrap();

      if (res.success) {
        toast.success("Success");
      }
    } catch (error) {
      toast.error("Something bad happened");
      console.log("Error when executing handleFollowUnfollow fn", error);
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
        <Link to={`/products?vendor=${id}`}>
          <Button key="viewProducts">View Products</Button>
        </Link>,
      ]}
    >
      <Card.Meta
        title={<Title level={4}>{name}</Title>}
        description={
          <Space direction="vertical">
            <Text>{description.slice(0, 70)}</Text>
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
