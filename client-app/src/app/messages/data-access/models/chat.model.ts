import { IUser } from 'src/app/shared/data-access/models';
import { Message } from './message.model';

export interface Chat {
    id: number;
    lastMessage: Message;
    users: IUser[];
}
