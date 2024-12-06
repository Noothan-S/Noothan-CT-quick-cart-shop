import { IServiceReturn } from "../../interfaces/service_return_type";

function followServiceReturn(condition?: string, data?: any): IServiceReturn {

    switch (condition) {
        case 'invalid_uuid':
            return {
                status: 400,
                success: false,
                message: 'Invalid Vendor Id formate',
                data: null
            };

        case 'vendor_not_found':
            return {
                status: 404,
                success: false,
                message: 'Targeted vendor not exist or block listed',
                data: null
            };

        default:
            return {
                status: 200,
                success: true,
                message: 'Operation successful',
                data: data
            };
    }
}

export default followServiceReturn