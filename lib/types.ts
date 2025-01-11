export enum RoleEnum {
    ADMIN = 'admin',
    USER = 'user',
    SUPER_ADMIN = "superAdmin"
}
export interface UserPay {
    id?: string,
    name: string,
    homeNumber: number,
    PhoneNumber: string,
    role?: RoleEnum
    paymentDetails:
    {
        year: number,
        monthlyPay:
        { month: string, isPaid?: boolean }[],
    }[]
}

export interface UserAdmin {
    name: string,
    role: RoleEnum
}