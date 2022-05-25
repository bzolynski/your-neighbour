import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { delay, map } from 'rxjs/operators';
import { closeInfoBar, showInfoBar } from './info-bar.actions';
import { InfoBarState } from './info-bar.reducer';

const TIME_OPENED: number = 5000;

@Injectable()
export class InfoBarEffects {
    constructor(private actions$: Actions, private store: Store<InfoBarState>) {}
    closeBar$ = createEffect(() =>
        this.actions$.pipe(
            ofType(showInfoBar),
            delay(TIME_OPENED),
            map(() => closeInfoBar())
        )
    );
}
