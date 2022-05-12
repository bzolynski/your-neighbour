import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsMyItemsComponent } from './settings-my-items.component';

describe('SettingsMyItemsComponent', () => {
    let component: SettingsMyItemsComponent;
    let fixture: ComponentFixture<SettingsMyItemsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SettingsMyItemsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingsMyItemsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
