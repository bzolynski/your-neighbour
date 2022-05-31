import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCategoryDefinitionsDetailsFormComponent } from './settings-category-definitions-details-form.component';

describe('SettingsCategoryDefinitionsDetailsFormComponent', () => {
    let component: SettingsCategoryDefinitionsDetailsFormComponent;
    let fixture: ComponentFixture<SettingsCategoryDefinitionsDetailsFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SettingsCategoryDefinitionsDetailsFormComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingsCategoryDefinitionsDetailsFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
