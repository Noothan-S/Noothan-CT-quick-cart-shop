import { Button, Empty, FloatButton, Result, Typography } from "antd";
import CouponManagementTable from "../../../components/dashboard/coupon-management-table.tsx";
import Loading from "../../../components/loading.tsx";
import { useGetAllCouponsQuery } from "../../../redux/features/coupon/coupon.api.ts";
import { Plus } from "lucide-react";
import { useState } from "react";
import AssignNewCouponDrawer from "../../../components/dashboard/add-coupon-drawer.tsx";

const AdminCoupons = () => {
  const { data: coupons, isLoading, isError } = useGetAllCouponsQuery({});
  const [isOpenDrawer, setIsDrawerOpen] = useState<boolean>(false);

  if (isLoading) return <Loading />;
  if (isError) return <Result status={"500"} />;

  if (coupons.data.length < 1) {
    return (
      <Empty
        className="flex flex-col items-center"
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{ height: 60 }}
        description={
          <Typography.Text>No Available Coupon Found</Typography.Text>
        }
      >
        <Button onClick={() => setIsDrawerOpen(true)} type="primary">
          Create One
        </Button>
      </Empty>
    );
  }

  return (
    <>
      <CouponManagementTable coupons={coupons.data} />
      <FloatButton
        onClick={() => setIsDrawerOpen(true)}
        icon={<Plus />}
        tooltip={<div>Assign new coupon</div>}
      />

      <AssignNewCouponDrawer
        isOpenDrawer={isOpenDrawer}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </>
  );
};

export default AdminCoupons;
