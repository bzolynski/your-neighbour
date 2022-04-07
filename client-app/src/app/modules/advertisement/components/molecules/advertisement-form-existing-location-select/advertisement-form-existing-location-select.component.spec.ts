import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementFormExistingLocationSelectComponent } from './advertisement-form-existing-location-select.component';

describe('AdvertisementFormExistingLocationSelectComponent', () => {
    let component: AdvertisementFormExistingLocationSelectComponent;
    let fixture: ComponentFixture<AdvertisementFormExistingLocationSelectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AdvertisementFormExistingLocationSelectComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AdvertisementFormExistingLocationSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
