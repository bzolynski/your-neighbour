export type Role = 'Administrator' | 'User';

export interface IUser {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    roles: Role[];
}
