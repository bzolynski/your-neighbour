import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCategoriesDetailsComponent } from './settings-categories-details.component';

describe('SettingsCategoriesDetailsComponent', () => {
    let component: SettingsCategoriesDetailsComponent;
    let fixture: ComponentFixture<SettingsCategoriesDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SettingsCategoriesDetailsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingsCategoriesDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
