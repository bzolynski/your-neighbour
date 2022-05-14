import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsMyAdvertisementsComponent } from './settings-my-advertisements.component';

describe('SettingsMyAdvertisementsComponent', () => {
    let component: SettingsMyAdvertisementsComponent;
    let fixture: ComponentFixture<SettingsMyAdvertisementsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SettingsMyAdvertisementsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingsMyAdvertisementsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
