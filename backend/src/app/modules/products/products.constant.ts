const productIncludeObj = {
  category: {
    select: {
      name: true,
      id: true,
    },
  },
  coupon: true,
  vendor: true,
  review: {
    include: {
      user: {
        select: {
          profile: true,
        },
      },
      vendorResponse: true,
    },
  },
};

const productCategoryIncludeObjForCoupon = {
  product: {
    include: {
      vendor: true,
      category: {
        select: {
          name: true,
        },
      },
    },
  },
};

export const ProductsConstants = {
  productIncludeObj,
  productCategoryIncludeObjForCoupon,
};
