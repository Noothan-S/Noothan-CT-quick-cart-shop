export async function handleUpdateOrderStatus(
  orderId: string,
  actionType: "PENDING" | "PROCESSING" | "DELIVERED" | "CANCELLED"
) {
  console.log({ actionType, orderId });
}
