import { Dispatch, FC, SetStateAction } from "react";
import { Button, Col, Drawer, Row, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { responseReviewValidationSchema } from "../../validations/review.res.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { IVendorResponse } from "../../interfaces/api.products.res.type";
import { useUpdateReviewResponseMutation } from "../../redux/features/reviews/reviews.api";

interface IReviewResponseDrawerProps {
  targetedResponse: IVendorResponse;
  setTargetedResponse: Dispatch<SetStateAction<IVendorResponse | null>>;
}

type TResponseEditFormFieldsValues = z.infer<
  typeof responseReviewValidationSchema
>;

const ReviewResponseEditDrawer: FC<IReviewResponseDrawerProps> = ({
  targetedResponse,
  setTargetedResponse,
}) => {
  const [updateResponse] = useUpdateReviewResponseMutation();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TResponseEditFormFieldsValues>({
    resolver: zodResolver(responseReviewValidationSchema),
    defaultValues: {
      description: targetedResponse.description,
    },
  });

  async function handleNewResponse(data: TResponseEditFormFieldsValues) {
    try {
      const res = await updateResponse({
        responseId: targetedResponse.id,
        ...data,
      }).unwrap();
      if (res.success) {
        toast.success("Response successfully update");
      }
      setTargetedResponse(null);
      reset();
    } catch (error) {
      toast.error("Something bad happened!");
      setTargetedResponse(null);
      reset();
      console.log("Error when creating new response for review", error);
    }
  }

  return (
    <>
      <Drawer
        title="Edit Response"
        width={400}
        onClose={() => setTargetedResponse(null)}
        open={!!targetedResponse}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={() => setTargetedResponse(null)}>Cancel</Button>
            <Button onClick={handleSubmit(handleNewResponse)} type="primary">
              Update
            </Button>
          </Space>
        }
      >
        <form onSubmit={handleSubmit(handleNewResponse)}>
          <Row gutter={16}>
            <Col span={24}>
              <label
                htmlFor="messages"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Message
                <span className="text-red-600"> *</span>
              </label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextArea {...field} rows={5} maxLength={100} showCount />
                )}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </Col>
          </Row>
        </form>
      </Drawer>
    </>
  );
};

export default ReviewResponseEditDrawer;
