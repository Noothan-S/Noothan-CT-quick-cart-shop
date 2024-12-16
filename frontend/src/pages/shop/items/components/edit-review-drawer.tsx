import { Button, Drawer, Input, Rate, Space } from "antd";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { IReview } from "../../../../interfaces/api.products.res.type";
import { StarFilled } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { useForm } from "react-hook-form";

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
      rating: updatedRating,
    },
  });

  console.log(updatedRating);
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
            <Button type="primary">Submit</Button>
          </Space>
        }
      >
        <div className="flex flex-col items-center gap-4">
          <TextArea
            maxLength={200}
            showCount
            minLength={5}
            rows={5}
            size="large"
          />
          <Rate
            value={updatedRating}
            onChange={(val) => setUpdatedRating(val)}
            character={<StarFilled />}
            className="text-2xl text-red-500"
          />
          <p className="text-lg">Current Rating: {review?.rating} stars</p>
        </div>
      </Drawer>
    </>
  );
};

export default EditReviewDrawer;
