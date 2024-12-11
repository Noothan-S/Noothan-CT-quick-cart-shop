import React, { useState } from "react";
import { Table, Rate, Space, Button, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IReviewData } from "../../constants/review.table.type";

const { Text } = Typography;

interface ReviewTableProps {
  reviews: IReviewData[];
  userRole: "VENDOR" | "ADMIN";
}

const ReviewTable: React.FC<ReviewTableProps> = ({ reviews, userRole }) => {
  const [data, setData] = useState<IReviewData[]>(reviews);

  const handleDelete = (id: string) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns: ColumnsType<IReviewData> = [
    {
      title: "Product",
      dataIndex: ["product", "title"],
      key: "product",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => <Rate disabled defaultValue={rating} />,
    },
    {
      title: "Review",
      dataIndex: "description",
      key: "description",
      render: (text) => <Text ellipsis={{ tooltip: text }}>{text}</Text>,
    },
    {
      title: "Customer",
      key: "customer",
      render: (_, record) => (
        <span>{`${record.user.profile.firstName} ${record.user.profile.lastName}`}</span>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => console.log("Respond to", record.id)}>
            Respond
          </Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  if (userRole === "ADMIN") {
    columns.splice(3, 0, {
      title: "Vendor",
      dataIndex: ["product", "vendor", "name"],
      key: "vendor",
    });
  }

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{ pageSize: 10 }}
    />
  );
};

export default ReviewTable;
