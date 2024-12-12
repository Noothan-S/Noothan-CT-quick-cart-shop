import React, { useState } from "react";
import { Table, Rate, Card, List, Button, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IReviewResponse } from "../../interfaces/api.res.reviews.type";
import ReviewResponseDrawer from "./review-response-drawer";
import { Link } from "react-router-dom";
import { IVendorResponse } from "../../interfaces/api.products.res.type";
import ReviewResponseEditDrawer from "./response-edit.dawer";

interface ReviewTableProps {
  reviews: IReviewResponse[];
  userRole: "VENDOR" | "ADMIN";
}

const ReviewTable: React.FC<ReviewTableProps> = ({ reviews, userRole }) => {
  const [clickedReviewForResponse, setClickedReviewForResponse] = useState<
    string | null
  >(null);

  const [targetedResponseForEdit, setTargetedResponseForEdit] =
    useState<IVendorResponse | null>(null);

  const columns: ColumnsType<IReviewResponse> = [
    {
      title: "Product",
      dataIndex: ["product", "title"],
      key: "product",
      render: (title, record) => {
        const filteredProduct = reviews.find(
          (review: IReviewResponse) => review.product.id === record.product.id
        );
        return (
          <Link to={`/products/item/${filteredProduct?.product.id}`}>
            {title}
          </Link>
        );
      },
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
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="">
          <Button
            size="small"
            onClick={() => setClickedReviewForResponse(record.id)}
          >
            Respond
          </Button>
          {userRole === "ADMIN" && <Button danger>Delete</Button>}
        </div>
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

  const expandedRowRender = (record: IReviewResponse) => (
    <Card title="Review Details" style={{ margin: 16 }}>
      <p className="mb-2">
        <strong>Full Review:</strong> {record.description}
      </p>
      <List
        header={<div>Responses</div>}
        bordered
        dataSource={record.vendorResponse}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                onClick={() => setTargetedResponseForEdit(item)}
                size="small"
              >
                Edit
              </Button>,
              <Popconfirm
                key="delete"
                description="Are you sure to delete this response?"
                title="Delete response"
                onConfirm={() => console.log(record.id, item.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button size="small" variant="filled" color="danger">
                  Delete
                </Button>
              </Popconfirm>,
            ]}
          >
            <div>
              <p> {item.description}</p>
              <small> {new Date(item.createdAt).toLocaleString()}</small>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );

  return (
    <>
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
      {clickedReviewForResponse && (
        <ReviewResponseDrawer
          reviewId={clickedReviewForResponse}
          setReviewId={setClickedReviewForResponse}
        />
      )}

      {targetedResponseForEdit && (
        <ReviewResponseEditDrawer
          targetedResponse={targetedResponseForEdit}
          setTargetedResponse={setTargetedResponseForEdit}
        />
      )}
    </>
  );
};

export default ReviewTable;
