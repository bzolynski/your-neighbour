import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContainerToggleButtonsComponent } from './list-container-toggle-buttons.component';

describe('ListContainerToggleButtonsComponent', () => {
    let component: ListContainerToggleButtonsComponent;
    let fixture: ComponentFixture<ListContainerToggleButtonsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ListContainerToggleButtonsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ListContainerToggleButtonsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
