import { Result } from "antd";
import VendorOrderTable from "../../../components/dashboard/vendors/vendor-order-table";
import Loading from "../../../components/loading";
import { useGetAllOrdersQuery } from "../../../redux/features/orders/order.api";

const VendorOrders = () => {
  const { data: orders, isLoading, isError } = useGetAllOrdersQuery({});

  if (isLoading) return <Loading />;
  if (isError) return <Result status={"500"} />;

  return <VendorOrderTable orders={orders.data} />;
};

export default VendorOrders;
