import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { advertisementCreationReducer, ADVERTISEMENT_CREATION_STATE_NAME } from './store/advertisement-creation.state';
import { AdvertisementCreationRoutingModule } from './advertisement-creation-routing.module';
import { RouterModule } from '@angular/router';
import { ItemDetailsEffects } from './store/item-details/item-details.effects';
import { ItemImagesEffects } from './store/item-images/item-images.effects';
import { AngularMaterialModule } from 'src/app/modules/angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import {
    AdvertisementFormComponent,
    AdvertisementFormExistingLocationSelectComponent,
    AdvertisementFormItemComponent,
    AdvertisementFormItemDetailsComponent,
    AdvertisementFormItemImagesComponent,
    AdvertisementFormItemImagesImageComponent,
    AdvertisementFormItemSelectComponent,
    AdvertisementFormItemSelectedImagesComponent,
} from './components';
import { AdvertisementCreationComponent } from './advertisement-creation.component';

@NgModule({
    declarations: [
        AdvertisementCreationComponent,
        AdvertisementFormComponent,
        AdvertisementFormItemComponent,
        AdvertisementFormItemImagesComponent,
        AdvertisementFormItemDetailsComponent,
        AdvertisementFormExistingLocationSelectComponent,
        AdvertisementFormItemImagesImageComponent,
        AdvertisementFormItemSelectComponent,
        AdvertisementFormItemSelectedImagesComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        AdvertisementCreationRoutingModule,
        StoreModule.forFeature(ADVERTISEMENT_CREATION_STATE_NAME, advertisementCreationReducer),
        EffectsModule.forFeature([ItemDetailsEffects, ItemImagesEffects]),
    ],
})
export class AdvertisementCreationModule {}
