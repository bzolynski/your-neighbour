import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsMyItemsFormComponent } from './settings-my-items-form.component';

describe('SettingsMyItemsFormComponent', () => {
    let component: SettingsMyItemsFormComponent;
    let fixture: ComponentFixture<SettingsMyItemsFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SettingsMyItemsFormComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingsMyItemsFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
