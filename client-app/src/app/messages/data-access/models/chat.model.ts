import { User } from '@models/';

export interface Chat {
    id: number;
    users: User[];
}
