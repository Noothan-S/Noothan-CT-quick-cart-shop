
const findReviewForResponseIncludeObj = {
    product: {
        include: {
            vendor: {
                include: {
                    user: {
                        select: {
                            id: true
                        }
                    }
                }
            }
        }
    }
}

export const ReviewResponseConstants = {
    findReviewForResponseIncludeObj
}