import { createAction, props } from '@ngrx/store';
import { InfoBarMessageType } from 'src/app/shared/ui/info-bar/info-bar.component';
export const showInfoBar = createAction('[InfoBar] Show', props<{ message: string; messageType: InfoBarMessageType }>());
export const closeInfoBar = createAction('[InfoBar] Close');
