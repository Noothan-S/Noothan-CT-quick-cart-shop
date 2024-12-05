const productIncludeObj = {
    vendor: true,
    review: {
        include: {
            user: {
                select: {
                    profile: true
                }
            }
        }
    }
}

export const ProductsConstants = {
    productIncludeObj
}