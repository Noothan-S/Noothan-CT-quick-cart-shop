import { Button, Descriptions, Drawer, Input, Rate, Space } from "antd";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { IReview } from "../../../../interfaces/api.products.res.type";
import { StarFilled } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { Controller, FieldValue, useForm } from "react-hook-form";

interface IEditReviewDrawerProps {
  setReview: Dispatch<SetStateAction<null | IReview>>;
  review: IReview | null;
}
const EditReviewDrawer: FC<IEditReviewDrawerProps> = ({
  setReview,
  review,
}) => {
  const [updatedRating, setUpdatedRating] = useState<number>(
    review?.rating as number
  );

  const { handleSubmit, control } = useForm({
    defaultValues: {
      description: review?.description,
    },
  });

  async function handleUpdateReview(data: any) {
    console.log(data);
  }

  return (
    <>
      <Drawer
        title="Edit Review"
        width={400}
        onClose={() => setReview(null)}
        open={!!review}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={() => setReview(null)}>Cancel</Button>
            <Button type="primary" onClick={handleSubmit(handleUpdateReview)}>
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
                  {...field}
                  maxLength={200}
                  showCount
                  minLength={5}
                  rows={5}
                  size="large"
                />
              )}
            />
            <Rate
              value={updatedRating}
              onChange={(val) => setUpdatedRating(val)}
              character={<StarFilled />}
              className="text-2xl text-red-500"
            />
            <p className="text-lg">Current Rating: {review?.rating} stars</p>
          </div>
        </form>
      </Drawer>
    </>
  );
};

export default EditReviewDrawer;
