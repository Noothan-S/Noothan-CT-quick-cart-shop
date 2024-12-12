import { Prisma } from "@prisma/client";

const productIncludeObj: Prisma.ProductInclude = {
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
    orderBy: {
      createdAt: "desc",
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
        orderBy: {
          createdAt: "desc",
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
