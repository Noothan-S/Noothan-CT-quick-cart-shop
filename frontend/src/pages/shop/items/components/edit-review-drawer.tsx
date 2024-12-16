import { Button, Drawer, Space } from "antd";
import { Dispatch, FC, SetStateAction } from "react";
import { IReview } from "../../../../interfaces/api.products.res.type";

interface IEditReviewDrawerProps {
  setReview: Dispatch<SetStateAction<null | IReview>>;
  review: IReview | null;
}
const EditReviewDrawer: FC<IEditReviewDrawerProps> = ({
  setReview,
  review,
}) => {
  console.log(review);
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
        helooo
      </Drawer>
    </>
  );
};

export default EditReviewDrawer;
