import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizationCardComponent } from './localization-card.component';

describe('LocalizationCardComponent', () => {
    let component: LocalizationCardComponent;
    let fixture: ComponentFixture<LocalizationCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LocalizationCardComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LocalizationCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
