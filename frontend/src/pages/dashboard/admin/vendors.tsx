import React, { useState } from "react";
import { Table, Button, message, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { IVendors } from "../../../interfaces/api.res.vendors";

const Vendors: React.FC = () => {
  const [vendors, setVendors] = useState<IVendors[]>([
    {
      id: "d6f44113-514a-4e67-ae7f-fc48d07e1e33",
      email: "vendor@example.com",
      name: "Nazmul's Vendor",
      phone: "+8801772757378",
      address: "Dhaka",
      logo: null,
      description: "eewewewewewe",
      isBlackListed: false,
      createdAt: "2024-12-09T09:38:41.488Z",
      updatedAt: "2024-12-09T09:38:41.488Z",
    },
  ]);

  const handleBlockUnblock = (record: IVendors) => {
    const updatedVendors = vendors.map((vendor) =>
      vendor.id === record.id
        ? { ...vendor, isBlackListed: !vendor.isBlackListed }
        : vendor
    );
    setVendors(updatedVendors);
    message.success(
      `Vendor ${record.isBlackListed ? "unblocked" : "blocked"} successfully`
    );
  };

  const columns: ColumnsType<IVendors> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Tag color={record.isBlackListed ? "red" : "green"}>
          {record.isBlackListed ? "Blacklisted" : "Active"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          size="small"
          type={record.isBlackListed ? "primary" : "default"}
          danger={!record.isBlackListed}
          onClick={() => handleBlockUnblock(record)}
        >
          {record.isBlackListed ? "Unblock" : "Block"}
        </Button>
      ),
    },
  ];

  return <Table columns={columns} dataSource={vendors} rowKey="id" />;
};

export default Vendors;
