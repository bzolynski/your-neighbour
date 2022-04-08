import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementFormItemSelectComponent } from './advertisement-form-item-select.component';

describe('AdvertisementFormItemSelectComponent', () => {
    let component: AdvertisementFormItemSelectComponent;
    let fixture: ComponentFixture<AdvertisementFormItemSelectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AdvertisementFormItemSelectComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AdvertisementFormItemSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
