import { User } from '@core/models/';

export interface Chat {
    id: number;
    users: User[];
}
