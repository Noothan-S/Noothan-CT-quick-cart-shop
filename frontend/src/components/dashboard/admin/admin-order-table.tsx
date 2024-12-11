"use client";

import React, { useState } from "react";
import {
  Table,
  Badge,
  Button,
  Descriptions,
  Space,
  Tag,
  Typography,
  Popover,
} from "antd";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import {
  IAdminOrder,
  IOrderItem,
  IOrderUserProfile,
  IVendorOrder,
} from "../../../interfaces/api.order.res.type";
import { useUpdateOrderStatusMutation } from "../../../redux/features/orders/order.api";
import { toast } from "sonner";

const { Text } = Typography;

const AdminOrderTable: React.FC<{ orders: IAdminOrder[] }> = ({ orders }) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const content = (orderId: string) => (
    <div className="flex gap-2">
      <Button
        size="small"
        variant="solid"
        color="danger"
        onClick={() => handleUpdateStatus(orderId, "CANCELLED")}
      >
        Cancel
      </Button>
      <Button
        size="small"
        type="primary"
        onClick={() => handleUpdateStatus(orderId, "PROCESSING")}
      >
        Processing
      </Button>
      <Button
        size="small"
        type="primary"
        onClick={() => handleUpdateStatus(orderId, "DELIVERED")}
      >
        Delivered
      </Button>
    </div>
  );

  const toggleExpand = (record: IAdminOrder) => {
    setExpandedRowKeys((keys) =>
      keys.includes(record.id)
        ? keys.filter((key) => key !== record.id)
        : [...keys, record.id]
    );
  };

  async function handleUpdateStatus(
    orderId: string,
    actionType: "PROCESSING" | "DELIVERED" | "CANCELLED"
  ) {
    try {
      const res = await updateOrderStatus({ actionType, orderId });

      if (res.data.success) {
        toast.success("Order status Updated");
      }
    } catch (error) {
      toast.error("Error updating status");
      console.error("Error updating status:", error);
    }
  }

  const columns: TableColumnsType<IAdminOrder> = [
    {
      title: "",
      key: "expand",
      width: 50,
      render: (_, record) => (
        <Button
          type="text"
          icon={
            expandedRowKeys.includes(record.id) ? (
              <DownOutlined />
            ) : (
              <RightOutlined />
            )
          }
          onClick={() => toggleExpand(record)}
        />
      ),
    },
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      render: (id: string) => id.slice(0, 8) + "...",
    },
    {
      title: "Vendor",
      dataIndex: ["vendor", "name"],
      key: "vendorName",
    },
    {
      title: "Customer",
      dataIndex: ["user", "profile"],
      key: "customer",
      render: (profile: IOrderUserProfile) =>
        `${profile.firstName} ${profile.lastName}`,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "totalItems",
      render: (items: IOrderItem[]) =>
        items.reduce((sum, item) => sum + item.quantity, 0),
    },
    {
      title: "Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Badge
          status={
            status === "PENDING"
              ? "warning"
              : status === "CANCELLED"
              ? "error"
              : status === "DELIVERED"
              ? "success"
              : "processing"
          }
          text={status}
        />
      ),
    },
    {
      title: "Payment",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (paymentStatus: string) => (
        <Badge
          status={paymentStatus === "PAID" ? "success" : "error"}
          text={paymentStatus}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record: IVendorOrder) => (
        <Popover
          content={content(record.id)}
          title="Update order status"
          trigger="click"
        >
          <Button size="small">Update Status</Button>
        </Popover>
      ),
    },
  ];

  const expandedRowRender = (record: IAdminOrder) => {
    const itemColumns: TableColumnsType<IOrderItem> = [
      {
        title: "Product",
        dataIndex: ["product", "title"],
        key: "title",
        render: (title: string, item: IOrderItem) => (
          <Space>
            {title}
            {item.product.isDeleted && <Tag color="red">Deleted</Tag>}
          </Space>
        ),
      },
      { title: "Quantity", dataIndex: "quantity", key: "quantity" },
      {
        title: "Price",
        dataIndex: ["product", "price"],
        key: "price",
        render: (price: number) => `$${price.toFixed(2)}`,
      },
      {
        title: "Discount",
        dataIndex: ["product", "discount"],
        key: "discount",
        render: (discount: number) => `${discount}%`,
      },
      {
        title: "Total",
        key: "total",
        render: (_, item) => {
          const discountedPrice =
            (item.product.price * (100 - item.product.discount)) / 100;
          return `$${(discountedPrice * item.quantity).toFixed(2)}`;
        },
      },
    ];

    return (
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Descriptions title="Vendor Details" bordered column={2}>
          <Descriptions.Item label="Name">
            {record.vendor.name}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {record.vendor.email}
          </Descriptions.Item>
          <Descriptions.Item label="Phone">
            {record.vendor.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {record.vendor.address}
          </Descriptions.Item>
          <Descriptions.Item label="Description">
            {record.vendor.description.slice(0, 100)}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            {record.vendor.isBlackListed ? (
              <Tag color="red">Blacklisted</Tag>
            ) : (
              <Tag color="green">Active</Tag>
            )}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions title="Customer Details" bordered column={2}>
          <Descriptions.Item label="Name">{`${record.user.profile.firstName} ${record.user.profile.lastName}`}</Descriptions.Item>
          <Descriptions.Item label="Email">
            {record.user.profile.email}
          </Descriptions.Item>
          <Descriptions.Item label="Phone">
            {record.user.profile.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {record.user.profile.address}
          </Descriptions.Item>
        </Descriptions>
        <Text strong>Order Items:</Text>
        <Table
          columns={itemColumns}
          dataSource={record.items}
          pagination={false}
          rowKey="id"
        />
      </Space>
    );
  };

  return (
    <Table
      columns={columns}
      dataSource={orders}
      expandable={{
        expandedRowRender,
        expandedRowKeys,
        onExpand: (_, record) => toggleExpand(record),
      }}
      rowKey="id"
    />
  );
};

export default AdminOrderTable;
