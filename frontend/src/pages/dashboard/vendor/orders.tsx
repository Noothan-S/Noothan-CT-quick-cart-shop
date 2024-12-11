import { Empty, Result } from "antd";
import VendorOrderTable from "../../../components/dashboard/vendors/vendor-order-table";
import Loading from "../../../components/loading";
import { useGetAllOrdersQuery } from "../../../redux/features/orders/order.api";

const VendorOrders = () => {
  const {
    data: orders,
    isLoading,
    isError,
  } = useGetAllOrdersQuery({ limit: 1000000000000 });

  if (isLoading) return <Loading />;
  if (!orders.data.length)
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;

  if (isError) return <Result status={"500"} />;

  return <VendorOrderTable orders={orders.data} />;
};

export default VendorOrders;
