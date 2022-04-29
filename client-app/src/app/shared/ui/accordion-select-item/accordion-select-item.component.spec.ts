import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionSelectItemComponent } from './accordion-select-item.component';

describe('AccordionSelectItemComponent', () => {
    let component: AccordionSelectItemComponent;
    let fixture: ComponentFixture<AccordionSelectItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AccordionSelectItemComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AccordionSelectItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
