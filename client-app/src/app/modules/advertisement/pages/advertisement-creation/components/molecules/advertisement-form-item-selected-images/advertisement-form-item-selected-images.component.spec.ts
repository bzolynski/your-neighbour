import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementFormItemSelectedImagesComponent } from './advertisement-form-item-selected-images.component';

describe('AdvertisementFormItemSelectedImagesComponent', () => {
    let component: AdvertisementFormItemSelectedImagesComponent;
    let fixture: ComponentFixture<AdvertisementFormItemSelectedImagesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AdvertisementFormItemSelectedImagesComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AdvertisementFormItemSelectedImagesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
