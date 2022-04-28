import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementOverviewComponent } from './advertisement-overview.component';

describe('AdvertisementOverviewComponent', () => {
    let component: AdvertisementOverviewComponent;
    let fixture: ComponentFixture<AdvertisementOverviewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AdvertisementOverviewComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AdvertisementOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
