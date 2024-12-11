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
import { ICoupon } from "../../interfaces/api.res.coupon.type";
import { useGetAllProductsQuery } from "../../redux/features/products/products.api";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/auth.slice";
import { decrypt } from "../../utils/text_encryption";
import Loading from "../loading";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { createOrUpdateCouponValidationSchema } from "../../validations/coupon.create.validation";
import { zodResolver } from "@hookform/resolvers/zod";

type updateCouponFormInputs = z.infer<
  typeof createOrUpdateCouponValidationSchema
>;
interface IEditCouponDrawerProps {
  coupon: ICoupon;
  setClickedCoupon: Dispatch<SetStateAction<null | ICoupon>>;
}

const EditCouponDrawer = ({
  coupon,
  setClickedCoupon,
}: IEditCouponDrawerProps) => {
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
    formState: { errors },
  } = useForm<updateCouponFormInputs>({
    resolver: zodResolver(createOrUpdateCouponValidationSchema),
    defaultValues: {
      code: coupon.code,
      parentage: coupon.parentage,
      productId: coupon.product.id,
    },
  });

  const onSubmit = (data: updateCouponFormInputs) => {
    console.log("Form Data:", data);
  };

  return (
    <>
      <Drawer
        title={`Edit ${coupon.code.slice(0, 10)} ${
          coupon.code.length > 10 ? "..." : ""
        }`}
        width={400}
        onClose={() => setClickedCoupon(null)}
        open={!!coupon}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={() => setClickedCoupon(null)}>Cancel</Button>
            <Button type="primary" onClick={handleSubmit(onSubmit)}>
              Submit
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
              {/* <Col span={24}>
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
                    <DatePicker {...field} className="w-full" size="large" />
                  )}
                />
              </Col> */}
            </Row>
          </form>
        )}
      </Drawer>
    </>
  );
};

export default EditCouponDrawer;
