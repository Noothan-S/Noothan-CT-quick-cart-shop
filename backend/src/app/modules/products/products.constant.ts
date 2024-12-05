const productIncludeObj = {
    vendor: true,
    category: {
        select: {
            name: true
        }
    },
    review: {
        include: {
            user: {
                select: {
                    profile: true
                }
            },
            vendorResponse: {
                include: {
                    vendor: true
                }
            }
        }
    }
}

const productCategoryIncludeObjForCoupon = {
    product: {
        include: {
            vendor: true,
            category: {
                select: {
                    name: true
                }
            }
        }
    }
}

export const ProductsConstants = {
    productIncludeObj,
    productCategoryIncludeObjForCoupon
}