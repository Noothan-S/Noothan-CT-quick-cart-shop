
export interface ICreateUser {
    email: string;
    password: string;
    role: "CUSTOMER" | "VENDOR";
};

export interface IUpdateProfile {
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    address?: string;
    img?: string;
};

export interface IUpdateVendor {
    email: string;
    name: string;
    phone?: string;
    address?: string;
    logo?: string;
    isBlackListed?: string;
    description: string;
};

export type TUpdateProfileOrVendor = IUpdateProfile | IUpdateVendor;