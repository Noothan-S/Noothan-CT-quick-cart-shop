import { Button, Drawer, Rate, Space } from "antd";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { StarFilled } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { Controller, useForm } from "react-hook-form";
import { useLeaveNewReviewMutation } from "../../../redux/features/reviews/reviews.api";
import { toast } from "sonner";

interface IEditReviewDrawerProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  productId: string | null;
}
export const LeaveReviewDrawer: FC<IEditReviewDrawerProps> = ({
  isOpen,
  setIsOpen,
  productId,
}) => {
  console.log(productId);
  const [rating, setRating] = useState<number>(0);
  const { handleSubmit, control } = useForm({});
  const [leaveNewReview] = useLeaveNewReviewMutation();
  async function handleUpdateReview(data: any) {
    try {
      const response = await leaveNewReview({
        ...data,
        productId,
        rating,
      }).unwrap();
      if (response) {
        toast.success("Review successfully send!");
      }
      setIsOpen(false);
    } catch (error) {
      toast.error("Something bad happened!");
      setIsOpen(false);
      console.log("Error when leave review", error);
    }
  }

  return (
    <>
      <Drawer
        title="Edit Review"
        width={400}
        onClose={() => setIsOpen(false)}
        open={isOpen}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button danger onClick={handleSubmit(handleUpdateReview)}>
              Submit
            </Button>
          </Space>
        }
      >
        <form onSubmit={handleSubmit(handleUpdateReview)}>
          <div className="flex flex-col items-center gap-4">
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextArea
                  required
                  {...field}
                  maxLength={200}
                  showCount
                  minLength={5}
                  rows={5}
                  placeholder="eg. Very nice product. highly recommended"
                  size="large"
                />
              )}
            />
            <Rate
              value={rating}
              onChange={(val) => setRating(val)}
              character={<StarFilled />}
              className="text-2xl text-red-500"
            />
          </div>
        </form>
      </Drawer>
    </>
  );
};

export default LeaveReviewDrawer;
