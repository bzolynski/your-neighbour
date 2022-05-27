import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsLayoutRouterComponent } from './settings-layout-router.component';

describe('SettingsLayoutRouterComponent', () => {
    let component: SettingsLayoutRouterComponent;
    let fixture: ComponentFixture<SettingsLayoutRouterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SettingsLayoutRouterComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingsLayoutRouterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
