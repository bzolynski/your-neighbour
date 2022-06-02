import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsMyAccountFormComponent } from './settings-my-account-form.component';

describe('SettingsMyAccountFormComponent', () => {
    let component: SettingsMyAccountFormComponent;
    let fixture: ComponentFixture<SettingsMyAccountFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SettingsMyAccountFormComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingsMyAccountFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
