import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCategoriesFormComponent } from './settings-categories-form.component';

describe('SettingsCategoriesFormComponent', () => {
    let component: SettingsCategoriesFormComponent;
    let fixture: ComponentFixture<SettingsCategoriesFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SettingsCategoriesFormComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingsCategoriesFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
