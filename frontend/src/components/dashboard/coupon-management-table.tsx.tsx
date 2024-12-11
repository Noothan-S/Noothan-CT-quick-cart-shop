import { Table, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { formatPrice } from "../../utils/format-price";
import { ICoupon } from "../../interfaces/api.res.coupon.type";
import { IsoToDate } from "../../utils/iso_to_date";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/auth.slice";
import { decrypt } from "../../utils/text_encryption";
import { Link } from "react-router-dom";

const CouponManagementTable = ({ coupons }: { coupons: ICoupon[] }) => {
  const user = useAppSelector(useCurrentUser);

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
        <Space size="middle">
          <Button icon={<EditOutlined />} />
          <Button icon={<DeleteOutlined />} danger />
        </Space>
      ),
    },
  ];

  const filteredColumns = user
    ? decrypt(user.role) === "VENDOR"
      ? columns.filter((column) => column.key !== "vendor")
      : columns
    : undefined;

  return <Table columns={filteredColumns} dataSource={coupons} />;
};

export default CouponManagementTable;
