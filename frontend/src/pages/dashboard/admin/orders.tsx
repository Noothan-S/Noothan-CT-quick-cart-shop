import { Empty, Result } from "antd";
import Loading from "../../../components/loading";
import { useGetAllOrdersQuery } from "../../../redux/features/orders/order.api";
import AdminOrderTable from "../../../components/dashboard/admin/admin-order-table";

const AdminOrders = () => {
  const {
    data: orders,
    isLoading,
    isError,
  } = useGetAllOrdersQuery({ limit: 100000000000 });

  if (isLoading) return <Loading />;
  if (!orders.data.length)
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  if (isError) return <Result status={"500"} />;

  return <AdminOrderTable orders={orders.data} />;
};

export default AdminOrders;
