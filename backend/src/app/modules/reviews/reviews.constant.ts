const reviewIncludeObj = {
    product: {
        include: {
            vendor: true,
            category: {
                select: {
                    name: true
                }
            },
            review: {
                include: {
                    vendorResponse: {
                        include: {
                            vendor: true
                        }
                    },
                    user: {
                        select: {
                            profile: true
                        }
                    }
                }
            }
        }
    }
}

export const ReviewsConstants = {
    reviewIncludeObj
}