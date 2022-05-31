import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCategoryDefinitionsDetailsComponent } from './settings-category-definitions-details.component';

describe('SettingsCategoryDefinitionsDetailsComponent', () => {
    let component: SettingsCategoryDefinitionsDetailsComponent;
    let fixture: ComponentFixture<SettingsCategoryDefinitionsDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SettingsCategoryDefinitionsDetailsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingsCategoryDefinitionsDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
