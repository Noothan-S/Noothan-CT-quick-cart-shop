function calculateAvgRatingAndTotalSale(item: any) {
  const avgRating =
    item.review?.length > 0
      ? item.review.reduce((sum: number, rev: any) => sum + rev.rating, 0) /
        item.review.length
      : 0;

  const totalSale =
    item.orderItem?.length > 0
      ? item.orderItem.reduce(
          (sum: number, order: any) => sum + order.quantity,
          0
        )
      : 0;

  return {
    ...item,
    avgRating: parseFloat(String(avgRating)).toFixed(1),
    totalSale,
  };
}

export default calculateAvgRatingAndTotalSale;
