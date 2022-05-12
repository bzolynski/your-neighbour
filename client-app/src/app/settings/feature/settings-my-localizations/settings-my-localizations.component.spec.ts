import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsMyLocalizationsComponent } from './settings-my-localizations.component';

describe('SettingsMyLocalizationsComponent', () => {
    let component: SettingsMyLocalizationsComponent;
    let fixture: ComponentFixture<SettingsMyLocalizationsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SettingsMyLocalizationsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingsMyLocalizationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
