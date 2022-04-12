import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AUTHENTICATION_STATE_NAME, metaReducers } from './store/authentication.state';
import { authenticationReducer } from './store/authentication.reducer';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthentiacionInterceptor } from './interceptors/authentication.interceptor';
import { AuthenticationEffects } from './store/authentication.effects';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
        StoreModule.forFeature(AUTHENTICATION_STATE_NAME, authenticationReducer, { metaReducers }),
        EffectsModule.forFeature([AuthenticationEffects]),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthentiacionInterceptor,
            multi: true,
        },
    ],
})
export class AuthenticationModule {}
