import { Empty, Result } from "antd";
import Loading from "../../../components/loading";
import { useGetAllReviewsQuery } from "../../../redux/features/reviews/reviews.api";
import ReviewTable from "../../../components/dashboard/review-management-table";
import { useAppSelector } from "../../../redux/hooks";
import { useCurrentUser } from "../../../redux/features/auth/auth.slice";
import { decrypt } from "../../../utils/text_encryption";

const VendorReviews = () => {
  const { data: reviews, isLoading, isError } = useGetAllReviewsQuery({});
  const user = useAppSelector(useCurrentUser);

  if (isLoading) return <Loading />;
  if (isError) return <Result status={"500"} />;

  if (reviews.length < 1) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  return (
    <ReviewTable
      reviews={reviews}
      userRole={decrypt(user?.role) as "ADMIN" | "VENDOR"}
    />
  );
};

export default VendorReviews;
