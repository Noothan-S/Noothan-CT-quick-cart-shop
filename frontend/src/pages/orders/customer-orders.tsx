import { Table, Tag, Space, Result, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ICustomerOrder } from "../../interfaces/api.order.res.type";
import { useGetAllOrdersQuery } from "../../redux/features/orders/order.api";
import Loading from "../../components/loading";
import { Link } from "react-router-dom";
import LeaveReviewDrawer from "./components/leave-review-drawer";
import { useState } from "react";

const CustomerOrders = () => {
  const columns: ColumnsType<ICustomerOrder> = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text.slice(0, 8)}...</a>,
    },
    {
      title: "Vendor",
      dataIndex: ["vendor", "name"],
      key: "vendorName",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "PENDING" ? "gold" : "green"}>{status}</Tag>
      ),
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (paymentStatus) => (
        <Tag color={paymentStatus === "PAID" ? "green" : "red"}>
          {paymentStatus}
        </Tag>
      ),
    },
    {
      title: "Order Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Items",
      key: "items",
      render: (_, record) => (
        <Space direction="vertical">
          {record.items.map((item) => (
            <div key={item.id}>
              {item.product.title} x {item.quantity}
            </div>
          ))}
        </Space>
      ),
    },
    {
      title: "Action",
      key: "",
      render: (_, record) => (
        <Button
          onClick={() => handleOpenLeaveReviewDrawer(record.items[0].productId)}
          disabled={record.status !== "DELIVERED"}
        >
          Leave Review
        </Button>
      ),
    },
  ];

  const {
    data: orders,
    isLoading,
    isError,
  } = useGetAllOrdersQuery({ limit: 9000 });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [targetedProduct, setTargetedProduct] = useState<null | string>(null);

  function handleOpenLeaveReviewDrawer(orderId: string): void {
    setIsOpen(true);
    setTargetedProduct(orderId);
  }

  if (isLoading) return <Loading />;

  if (isError)
    return (
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={
          <Link to={"/"}>
            <Button color="danger" variant="filled">
              Back Home
            </Button>
          </Link>
        }
      />
    );

  return (
    <>
      <Table
        className="container px-4 mx-auto py-12"
        columns={columns}
        dataSource={orders.data}
        rowKey="id"
        pagination={{ pageSize: 8 }}
      />

      <LeaveReviewDrawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        productId={targetedProduct}
      />
    </>
  );
};

export default CustomerOrders;
