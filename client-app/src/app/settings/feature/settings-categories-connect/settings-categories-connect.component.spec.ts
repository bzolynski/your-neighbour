import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCategoriesConnectComponent } from './settings-categories-connect.component';

describe('SettingsCategoriesConnectComponent', () => {
    let component: SettingsCategoriesConnectComponent;
    let fixture: ComponentFixture<SettingsCategoriesConnectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SettingsCategoriesConnectComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingsCategoriesConnectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
