import React from "react";
import { Table, Button, Space, Typography } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { formatPrice } from "../../utils/format-price";
import { ICoupon } from "../../interfaces/api.res.coupon.type";
import { IsoToDate } from "../../utils/iso_to_date";

const coupons: ICoupon[] = [
  {
    key: "1",
    code: "SAVE150",
    parentage: 15,
    expiryDate: "2024-12-31T23:59:59.000Z",
    product: {
      title: "Multipurpose Wooden Trolly",
      price: 3000,
      vendor: {
        name: "Nazmul's Vendor",
      },
    },
  },
];

const CouponManagementTable: React.FC = () => {
  const columns: ColumnsType<ICoupon> = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Discount",
      dataIndex: "parentage",
      key: "parentage",
      render: (parentage: number) => `${parentage}%`,
    },
    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (date: string) => IsoToDate(date),
    },
    {
      title: "Product",
      dataIndex: ["product", "title"],
      key: "product",
    },
    {
      title: "Original Price",
      dataIndex: ["product", "price"],
      key: "price",
      render: (price: number) => formatPrice(price),
    },
    {
      title: "Vendor",
      dataIndex: ["product", "vendor", "name"],
      key: "vendor",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} />
          <Button icon={<DeleteOutlined />} danger />
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={coupons} />;
};

export default CouponManagementTable;
