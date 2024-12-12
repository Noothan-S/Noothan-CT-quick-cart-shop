import { Dispatch, FC, SetStateAction } from "react";
import { Button, Col, Drawer, Row, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { responseReviewValidationSchema } from "../../validations/review.res.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useResponseReviewMutation } from "../../redux/features/reviews/reviews.api";

interface IReviewResponseDrawerProps {
  reviewId: string;
  setReviewId: Dispatch<SetStateAction<string | null>>;
}

type TNewResponseFormFieldsValues = z.infer<
  typeof responseReviewValidationSchema
>;

const ReviewResponseDrawer: FC<IReviewResponseDrawerProps> = ({
  reviewId,
  setReviewId,
}) => {
  const [responseReview] = useResponseReviewMutation();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TNewResponseFormFieldsValues>({
    resolver: zodResolver(responseReviewValidationSchema),
  });

  async function handleNewResponse(data: TNewResponseFormFieldsValues) {
    try {
      const res = await responseReview({ reviewId, ...data }).unwrap();
      if (res.success) {
        toast.success("Successfully respond");
      }
      setReviewId(null);
      reset();
    } catch (error) {
      toast.error("Something bad happened!");
      setReviewId(null);
      reset();
      console.log("Error when creating new response for review", error);
    }
  }

  return (
    <>
      <Drawer
        title="Respond Review"
        width={400}
        onClose={() => setReviewId(null)}
        open={!!reviewId}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={() => setReviewId(null)}>Cancel</Button>
            <Button onClick={handleSubmit(handleNewResponse)} type="primary">
              Response
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

export default ReviewResponseDrawer;
