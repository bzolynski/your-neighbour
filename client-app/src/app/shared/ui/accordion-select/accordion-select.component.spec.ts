import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionSelectComponent } from './accordion-select.component';

describe('AccordionSelectComponent', () => {
    let component: AccordionSelectComponent;
    let fixture: ComponentFixture<AccordionSelectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AccordionSelectComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AccordionSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
