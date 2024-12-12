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
    where: {
      isDeleted: false,
    },
    include: {
      user: {
        select: {
          profile: true,
        },
      },
      vendorResponse: {
        where: {
          isDeleted: false,
        },
      },
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
