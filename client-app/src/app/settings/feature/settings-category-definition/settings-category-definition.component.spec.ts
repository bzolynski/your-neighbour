import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCategoryDefinitionComponent } from './settings-category-definition.component';

describe('SettingsCategoryDefinitionComponent', () => {
    let component: SettingsCategoryDefinitionComponent;
    let fixture: ComponentFixture<SettingsCategoryDefinitionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SettingsCategoryDefinitionComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingsCategoryDefinitionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
