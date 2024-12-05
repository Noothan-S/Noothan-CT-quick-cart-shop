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