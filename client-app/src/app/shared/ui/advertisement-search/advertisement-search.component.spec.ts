import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementSearchComponent } from './advertisement-search.component';

describe('AdvertisementSearchComponent', () => {
    let component: AdvertisementSearchComponent;
    let fixture: ComponentFixture<AdvertisementSearchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AdvertisementSearchComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AdvertisementSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
