import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSidePanelComponent } from './list-side-panel.component';

describe('ListSidePanelComponent', () => {
    let component: ListSidePanelComponent;
    let fixture: ComponentFixture<ListSidePanelComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ListSidePanelComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ListSidePanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
