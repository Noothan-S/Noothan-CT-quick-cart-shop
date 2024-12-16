import { CornerDownRight, Pen, Star, Trash2 } from "lucide-react";
import { IReview } from "../../../../interfaces/api.products.res.type";
import { IsoToDate } from "../../../../utils/iso_to_date";
import { useAppSelector } from "../../../../redux/hooks";
import { useCurrentUser } from "../../../../redux/features/auth/auth.slice";
import { decrypt } from "../../../../utils/text_encryption";
import { useState } from "react";
import EditReviewDrawer from "./edit-review-drawer";
import { Popconfirm } from "antd";
import { useDeleteReviewMutation } from "../../../../redux/features/reviews/reviews.api";
import { toast } from "sonner";

const CustomerReview = ({
  reviews,
  rating,
}: {
  reviews: IReview[];
  rating: number;
}) => {
  const user = useAppSelector(useCurrentUser);
  const [targetedReview, setTargetedReview] = useState<null | IReview>(null);
  const [deleteReview] = useDeleteReviewMutation();

  async function handleDeleteReview(reviewId: string) {
    try {
      const response = await deleteReview({ reviewId }).unwrap();
      if (response.success) {
        toast.success("Review successfully deleted");
      }
    } catch (error) {
      toast.error("Something bad happened!");
      console.log("Error when deleting review", error);
    }
  }

  return (
    <>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <div className="flex items-center mb-4">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= Math.round(rating)
                    ? "text-red-500 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-gray-600">{rating} out of 5</span>
        </div>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div className="border-b pb-4">
              <div key={review.id} className="">
                <div className="flex items-center mb-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating
                            ? "text-red-500 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 font-semibold">
                    {review.user.profile.firstName}{" "}
                    {review.user.profile.lastName}
                  </span>
                </div>
                <p className="text-gray-700 text-sm">
                  {IsoToDate(review.createdAt)}
                </p>
                <div className="flex gap-2 items-center">
                  <p className="text-gray-700">{review.description}</p>
                  {user && decrypt(user.id) === review.userId && (
                    <>
                      <Pen
                        onClick={() => setTargetedReview(review)}
                        className="cursor-pointer hover:scale-105 transition-all hover:text-red-500"
                        size={15}
                      />
                      <Popconfirm
                        title="Delete the review"
                        description="Are you sure to delete this review?"
                        onConfirm={() => handleDeleteReview(review.id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Trash2
                          className="cursor-pointer hover:scale-105 transition-all"
                          size={15}
                          color="red"
                        />
                      </Popconfirm>
                    </>
                  )}
                </div>
              </div>
              {review.vendorResponse.map((res) => (
                <div className="flex items-center mt-3 gap-2">
                  <CornerDownRight />
                  <div className="">
                    <p className="text-gray-700 text-sm">
                      {IsoToDate(res.createdAt)}
                    </p>
                    <p className="text-gray-700 ">{res.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {targetedReview && (
        <EditReviewDrawer
          review={targetedReview}
          setReview={setTargetedReview}
        />
      )}
    </>
  );
};

export default CustomerReview;
