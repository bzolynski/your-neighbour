import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementFormItemImagesImageComponent } from './advertisement-form-item-images-image.component';

describe('AdvertisementFormItemImagesImageComponent', () => {
    let component: AdvertisementFormItemImagesImageComponent;
    let fixture: ComponentFixture<AdvertisementFormItemImagesImageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AdvertisementFormItemImagesImageComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AdvertisementFormItemImagesImageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
