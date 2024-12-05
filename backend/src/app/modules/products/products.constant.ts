const productIncludeObj = {
    vendor: true,
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

export const ProductsConstants = {
    productIncludeObj
}