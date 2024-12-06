import { IServiceReturn } from "../../interfaces/service_return_type";

function orderServiceReturn(condition?: string, data?: any): IServiceReturn {
    switch (condition) {
        case 'invalid_uuid':
            return {
                status: 400,
                success: false,
                message: 'Invalid orderId format. Expect UUID',
                data: null
            };
        case 'order_not_found':
            return {
                status: 404,
                success: false,
                message: 'Order not found with that id',
                data: null
            };
        case 'permission_denied':
            return {
                status: 401,
                success: false,
                message: "Permission denied. You cannot edit another vendor's order",
                data: null
            };
        default:
            return {
                status: 200,
                success: true,
                message: "Order status successfully updated",
                data: data || null
            };
    }
}

export default orderServiceReturn