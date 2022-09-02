import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard, CanDeactivateGuard, LoggedInGuard, RoleGuard, UserDetailsGuard } from './guards';
import { authenticationInterceptionProvider } from './interceptors';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthenticationEffects, authenticationReducer } from '@stores/authentication';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forRoot({ authentication: authenticationReducer }),
        EffectsModule.forRoot([AuthenticationEffects]),
    ],
    declarations: [],
    providers: [AuthGuard, CanDeactivateGuard, LoggedInGuard, RoleGuard, UserDetailsGuard, authenticationInterceptionProvider],
})
export class CoreModule2 {}
