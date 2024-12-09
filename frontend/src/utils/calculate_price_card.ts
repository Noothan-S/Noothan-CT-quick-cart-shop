export function calculateProductPriceForCard(price: number, discount: number) {
  const discountAmount: number = (price * discount) / 100;
  const totalPrice: number = price - discountAmount;

  return {
    discountAmount,
    totalPrice: parseInt(String(totalPrice)),
  };
}
