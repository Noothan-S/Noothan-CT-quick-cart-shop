import { Empty, Result } from "antd";
import Loading from "../../../components/loading";
import { useGetAllOrdersQuery } from "../../../redux/features/orders/order.api";
import AdminOrderTable from "../../../components/dashboard/admin/admin-order-table";

const AdminOrders = () => {
  const {
    data: orders,
    isLoading,
    isError,
  } = useGetAllOrdersQuery({ limit: 1000000000 });

  if (isLoading) return <Loading />;
  if (isError) return <Result status={"500"} />;
  if (!orders.data.length)
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;

  return <AdminOrderTable orders={orders.data} />;
};

export default AdminOrders;
