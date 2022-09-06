import { MetaReducer } from '@ngrx/store';
import { authenticationMydrationMetaReducer } from './hydration/authentication-hydration.reducer';

export const metaReducers: MetaReducer[] = [authenticationMydrationMetaReducer];
