
export interface IAuthUser {
    id: string;
    email: string;
    role: 'ADMIN' | 'VENDOR' | 'CUSTOMER';
}