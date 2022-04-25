import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTopBarComponent } from './list-top-bar.component';

describe('ListTopBarComponent', () => {
    let component: ListTopBarComponent;
    let fixture: ComponentFixture<ListTopBarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ListTopBarComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ListTopBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
