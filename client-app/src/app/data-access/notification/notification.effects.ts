import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { delay, map } from 'rxjs/operators';
import { addInfoBarMessage, removeInfoBarMessage } from './notification.actions';
import { NotificationState } from './notification.reducer';

const TIME_OPENED: number = 5000;

@Injectable()
export class NotificationEffects {
    constructor(private actions$: Actions, private store: Store<NotificationState>) {}

    removeMessage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addInfoBarMessage),
            delay(TIME_OPENED),
            map(({ message, messageType }) => removeInfoBarMessage({ message, messageType }))
        )
    );
}
