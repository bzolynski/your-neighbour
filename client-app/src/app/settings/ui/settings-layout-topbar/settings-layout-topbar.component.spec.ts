import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsLayoutTopbarComponent } from './settings-layout-topbar.component';

describe('SettingsLayoutTopbarComponent', () => {
    let component: SettingsLayoutTopbarComponent;
    let fixture: ComponentFixture<SettingsLayoutTopbarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SettingsLayoutTopbarComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingsLayoutTopbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
