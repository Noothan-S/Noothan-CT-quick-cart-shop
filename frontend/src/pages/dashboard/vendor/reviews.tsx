import { Empty, Result } from "antd";
import Loading from "../../../components/loading";
import { useGetAllReviewsQuery } from "../../../redux/features/reviews/reviews.api";
import ReviewTable from "../../../components/dashboard/review-management-table";

const VendorReviews = () => {
  const { data: reviews, isLoading, isError } = useGetAllReviewsQuery({});

  if (isLoading) return <Loading />;
  if (isError) return <Result status={"500"} />;

  if (reviews.length < 1) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  return <ReviewTable reviews={reviews} userRole="VENDOR" />;
};

export default VendorReviews;
