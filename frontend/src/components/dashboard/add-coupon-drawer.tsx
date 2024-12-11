import { Dispatch, SetStateAction } from "react";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Input,
  Result,
  Row,
  Select,
  Space,
} from "antd";
import { useGetAllProductsQuery } from "../../redux/features/products/products.api";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/auth.slice";
import { decrypt } from "../../utils/text_encryption";
import Loading from "../loading";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { createCouponValidationSchema } from "../../validations/coupon.validation";
import { useAssignNewCouponMutation } from "../../redux/features/coupon/coupon.api";
import { toast } from "sonner";

type updateCouponFormInputs = z.infer<typeof createCouponValidationSchema>;
interface IEditCouponDrawerProps {
  isOpenDrawer: boolean;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

const AssignNewCouponDrawer = ({
  isOpenDrawer,
  setIsDrawerOpen,
}: IEditCouponDrawerProps) => {
  const [assignNewCoupon] = useAssignNewCouponMutation();
  const user = useAppSelector(useCurrentUser);
  const { data, isLoading, isError } = useGetAllProductsQuery(
    user?.vendor
      ? { vendorId: decrypt(user.vendor), limit: 900000 }
      : { limit: 900000 }
  );

  const selectProductOptions = data?.data.map(
    (product: Record<string, unknown>) => ({
      value: product.id,
      label: product.title,
    })
  );

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<updateCouponFormInputs>({
    resolver: zodResolver(createCouponValidationSchema),
  });

  const onSubmit = async (data: updateCouponFormInputs) => {
    try {
      const res = await assignNewCoupon(data).unwrap();
      if (res.success) {
        toast.success(`New Coupon successfully assigned`);
        setIsDrawerOpen(false);
        reset();
      }
    } catch (error) {
      toast.error("Something bad happened");
      setIsDrawerOpen(false);
      reset();
      console.log("Error when assign new coupon", error);
    }
  };

  return (
    <>
      <Drawer
        title="Assign New Coupon"
        width={400}
        onClose={() => setIsDrawerOpen(false)}
        open={isOpenDrawer}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
            <Button type="primary" onClick={handleSubmit(onSubmit)}>
              Assign
            </Button>
          </Space>
        }
      >
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <Result status={"500"} />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            {" "}
            {/* Attach the onSubmit handler */}
            <Row gutter={16} className="flex flex-col gap-3">
              <Col span={24}>
                <label
                  htmlFor="product"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Product
                  <span className="text-red-600"> *</span>
                </label>
                <Controller
                  name="productId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      showSearch
                      className="w-full"
                      size="large"
                      placeholder="eg. iPhone 14 pro max"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      loading={isLoading}
                      options={selectProductOptions}
                    />
                  )}
                />

                {errors.productId && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.productId.message}
                  </p>
                )}
              </Col>

              <Col span={24}>
                <label
                  htmlFor="code"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Coupon Code
                  <span className="text-red-600"> *</span>
                </label>
                <Controller
                  name="code"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      maxLength={15}
                      showCount
                      placeholder="eg. SAVE10"
                      size="large"
                    />
                  )}
                />
                {errors.code && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.code.message}
                  </p>
                )}
              </Col>

              <Col span={24}>
                <label
                  htmlFor="parentage"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Parentage
                  <span className="text-red-600"> *</span>
                </label>
                <Controller
                  name="parentage"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="number"
                      {...field}
                      placeholder="eg. 10"
                      size="large"
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 0)
                      }
                    />
                  )}
                />
                {errors.parentage && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.parentage.message}
                  </p>
                )}
              </Col>
              <Col span={24}>
                <label
                  htmlFor="expiryDate"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Expiry Date
                  <span className="text-red-600"> *</span>
                </label>
                <Controller
                  name="expiryDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      className="w-full"
                      size="large"
                      onChange={(date) => {
                        field.onChange(date ? date.toISOString() : null);
                      }}
                      value={field.value ? dayjs(field.value) : null}
                    />
                  )}
                />
              </Col>
            </Row>
          </form>
        )}
      </Drawer>
    </>
  );
};

export default AssignNewCouponDrawer;
