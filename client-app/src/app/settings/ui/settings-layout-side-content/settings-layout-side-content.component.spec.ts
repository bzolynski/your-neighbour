import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsLayoutSideContentComponent } from './settings-layout-side-content.component';

describe('SettingsLayoutSideContentComponent', () => {
    let component: SettingsLayoutSideContentComponent;
    let fixture: ComponentFixture<SettingsLayoutSideContentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SettingsLayoutSideContentComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingsLayoutSideContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
