import { Table, Button, Space, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { formatPrice } from "../../utils/format-price";
import { ICoupon } from "../../interfaces/api.res.coupon.type";
import { IsoToDate } from "../../utils/iso_to_date";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/auth.slice";
import { decrypt } from "../../utils/text_encryption";
import { Link } from "react-router-dom";
import { useDeleteCouponMutation } from "../../redux/features/coupon/coupon.api";
import { toast } from "sonner";
import EditCouponDrawer from "./edit-coupon.drawer";
import { useState } from "react";

const CouponManagementTable = ({ coupons }: { coupons: ICoupon[] }) => {
  const user = useAppSelector(useCurrentUser);
  const [deleteCoupon] = useDeleteCouponMutation();
  const [clickedCoupon, setClickedCoupon] = useState<ICoupon | null>(null);

  async function handleDeleteCoupon(props: {
    productId: string;
    code: string;
  }) {
    try {
      const res = await deleteCoupon(props).unwrap();
      if (res.success) {
        toast.success(`${props.code} is successfully deleted. `);
      }
    } catch (error) {
      toast.error("Something bad happened!");
      console.log("Error to delete coupon", error);
    }
  }

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
      render: (product) => {
        const filteredProduct = coupons.find(
          (coupon) => coupon.product.title === product
        );
        return (
          <Link
            to={`/products/item/${filteredProduct?.product.id}`}
            target="_blank"
          >
            {product}
          </Link>
        );
      },
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
        <Space size="middle" className="mr-10">
          <Button
            onClick={() => setClickedCoupon(record)}
            icon={<EditOutlined />}
          />
          <Popconfirm
            title="Delete the coupon"
            description="Are you sure to delete this coupon?"
            onConfirm={() =>
              handleDeleteCoupon({
                productId: record.product.id,
                code: record.code,
              })
            }
            okType="danger"
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const filteredColumns = user
    ? decrypt(user.role) === "VENDOR"
      ? columns.filter((column) => column.key !== "vendor")
      : columns
    : undefined;

  return (
    <>
      <Table columns={filteredColumns} dataSource={coupons} />
      {clickedCoupon && (
        <EditCouponDrawer
          setClickedCoupon={setClickedCoupon}
          coupon={clickedCoupon}
        />
      )}
    </>
  );
};

export default CouponManagementTable;
