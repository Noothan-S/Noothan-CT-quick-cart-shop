import { Dispatch, SetStateAction } from "react";
import { Button, Col, DatePicker, Drawer, Input, Row, Space } from "antd";
import { ICoupon } from "../../interfaces/api.res.coupon.type";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { updateCouponValidationSchema } from "../../validations/coupon.validation";
import { useUpdateCouponMutation } from "../../redux/features/coupon/coupon.api";
import { toast } from "sonner";

type updateCouponFormInputs = z.infer<typeof updateCouponValidationSchema>;
interface IEditCouponDrawerProps {
  coupon: ICoupon;
  setClickedCoupon: Dispatch<SetStateAction<null | ICoupon>>;
}

const EditCouponDrawer = ({
  coupon,
  setClickedCoupon,
}: IEditCouponDrawerProps) => {
  const [updateCoupon] = useUpdateCouponMutation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<updateCouponFormInputs>({
    resolver: zodResolver(updateCouponValidationSchema),
    defaultValues: {
      parentage: coupon.parentage,
      expiryDate: coupon.expiryDate,
    },
  });

  const onSubmit = async (data: updateCouponFormInputs) => {
    try {
      const payload = {
        code: coupon.code,
        productId: coupon.product.id,
        ...data,
      };

      const res = await updateCoupon(payload).unwrap();

      if (res.success) {
        toast.success("Coupon successfully updated");
        setClickedCoupon(null);
      }
    } catch (error) {
      toast.error("Something bad happened");
      setClickedCoupon(null);
      console.log("error when updating coupon", error);
    }
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
              Update
            </Button>
          </Space>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {" "}
          {/* Attach the onSubmit handler */}
          <Row gutter={16} className="flex flex-col gap-3">
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
              {errors.expiryDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.expiryDate.message}
                </p>
              )}
            </Col>
          </Row>
        </form>
      </Drawer>
    </>
  );
};

export default EditCouponDrawer;
