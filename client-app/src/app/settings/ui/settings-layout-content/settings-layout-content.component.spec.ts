import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsLayoutContentComponent } from './settings-layout-content.component';

describe('SettingsLayoutContentComponent', () => {
    let component: SettingsLayoutContentComponent;
    let fixture: ComponentFixture<SettingsLayoutContentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SettingsLayoutContentComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingsLayoutContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
