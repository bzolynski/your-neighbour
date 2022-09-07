import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard, CanDeactivateGuard, LoggedInGuard, RoleGuard, UserDetailsGuard } from './guards';
import { authenticationInterceptionProvider } from './interceptors';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthenticationEffects, authenticationReducer, AUTHENTICATION_STATE_KEY } from '@stores/authentication';
import { metaReducers } from './stores';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(AUTHENTICATION_STATE_KEY, authenticationReducer, { metaReducers }),
        EffectsModule.forFeature([AuthenticationEffects]),
    ],
    providers: [AuthGuard, CanDeactivateGuard, LoggedInGuard, RoleGuard, UserDetailsGuard, authenticationInterceptionProvider],
})
export class CoreModule2 {}
