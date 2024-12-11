import React, { useState } from "react";
import { Table, Rate, Typography, Card, List } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IReviewResponse } from "../../interfaces/api.res.reviews.type";

const { Text } = Typography;

interface ReviewTableProps {
  reviews: IReviewResponse[];
  userRole: "VENDOR" | "ADMIN";
}

const ReviewTable: React.FC<ReviewTableProps> = ({ reviews, userRole }) => {
  console.log(reviews);

  const columns: ColumnsType<IReviewResponse> = [
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
      title: "Customer",
      key: "customer",
      render: (_, record) => (
        <span>{`${record.user?.profile.firstName} ${record.user?.profile.lastName}`}</span>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

  if (userRole === "ADMIN") {
    columns.splice(3, 0, {
      title: "Vendor",
      dataIndex: ["product", "vendor", "name"],
      key: "vendor",
    });
  }

  const expandedRowRender = (record: IReviewResponse) => (
    <Card title="Review Details" style={{ margin: 16 }}>
      <p>
        <strong>Full Review:</strong> {record.description}
      </p>
      <List
        header={<div>Vendor Responses</div>}
        bordered
        dataSource={record.vendorResponse}
        renderItem={(item) => (
          <List.Item>
            <Text>{item.description}</Text>
            <Text type="secondary">
              {" "}
              - {new Date(item.createdAt).toLocaleString()}
            </Text>
          </List.Item>
        )}
      />
    </Card>
  );

  return (
    <Table
      columns={columns}
      dataSource={reviews}
      rowKey="id"
      expandable={{
        expandedRowRender,
        rowExpandable: (record) => record.description !== "",
      }}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default ReviewTable;
