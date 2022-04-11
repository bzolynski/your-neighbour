import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementFormItemImagesComponent } from './advertisement-form-item-images.component';

describe('AdvertisementFormItemPhotosComponent', () => {
    let component: AdvertisementFormItemImagesComponent;
    let fixture: ComponentFixture<AdvertisementFormItemImagesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AdvertisementFormItemImagesComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AdvertisementFormItemImagesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
