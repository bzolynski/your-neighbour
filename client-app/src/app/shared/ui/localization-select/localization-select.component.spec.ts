import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizationSelectComponent } from './localization-select.component';

describe('LocalizationSelectComponent', () => {
    let component: LocalizationSelectComponent;
    let fixture: ComponentFixture<LocalizationSelectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LocalizationSelectComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LocalizationSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
