const newOrderCreateIncludeObj = {
    items: {
        include: {
            product: true
        }
    }
};

const fetchOrdersForCustomer = {
    vendor: true,
    items: {
        include: {
            product: true
        }
    }
}

const fetchOrdersVendor = {
    user: {
        select: {
            profile: true
        }
    },
    items: {
        include: {
            product: true
        }
    }
}

const fetchOrdersAdmin = {
    user: {
        select: {
            profile: true
        }
    },
    items: {
        include: {
            product: true
        }
    },
    vendor: true
}

const fetchOrderForUpdateStatus = {
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

export const OrderConstants = {
    newOrderCreateIncludeObj,
    fetchOrdersForCustomer,
    fetchOrdersVendor,
    fetchOrdersAdmin,
    fetchOrderForUpdateStatus
}