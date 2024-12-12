import { Dispatch, FC, SetStateAction } from "react";
import { Button, Col, Drawer, Row, Space } from "antd";

interface IReviewResponseDrawerProps {
  reviewId: string;
  setReviewId: Dispatch<SetStateAction<string | null>>;
}

const ReviewResponseDrawer: FC<IReviewResponseDrawerProps> = ({
  reviewId,
  setReviewId,
}) => {
  console.log({ reviewId });
  return (
    <>
      <Drawer
        title="Create a new account"
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
            <Button type="primary">Submit</Button>
          </Space>
        }
      >
        <Row gutter={16}>
          <Col span={24}>
            <label
              htmlFor="messages"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Message
              <span className="text-red-600"> *</span>
            </label>
          </Col>
        </Row>
      </Drawer>
    </>
  );
};

export default ReviewResponseDrawer;
