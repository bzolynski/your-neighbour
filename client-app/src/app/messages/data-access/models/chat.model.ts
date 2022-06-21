import { IUser } from 'src/app/shared/data-access/models';

export interface Chat {
    id: number;
    users: IUser[];
}
