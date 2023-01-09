import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard, CanDeactivateGuard, LoggedInGuard, RoleGuard, UserDetailsGuard } from './guards';
import {
    authenticationInterceptionProvider,
    errorHandlingInterceptionProvider,
    httpRequestLoaderInterceptionProvider,
} from './interceptors';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthenticationEffects, authenticationReducer, AUTHENTICATION_STATE_KEY } from '@core/stores/authentication';
import { metaReducers } from './stores';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(AUTHENTICATION_STATE_KEY, authenticationReducer, { metaReducers }),
        EffectsModule.forFeature([AuthenticationEffects]),
    ],
    providers: [
        AuthGuard,
        CanDeactivateGuard,
        LoggedInGuard,
        RoleGuard,
        UserDetailsGuard,
        authenticationInterceptionProvider,
        errorHandlingInterceptionProvider,
        httpRequestLoaderInterceptionProvider,
    ],
})
export class CoreModule {}
