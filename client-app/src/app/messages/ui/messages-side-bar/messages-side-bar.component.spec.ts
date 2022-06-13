import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesSideBarComponent } from './messages-side-bar.component';

describe('MessagesSideBarComponent', () => {
    let component: MessagesSideBarComponent;
    let fixture: ComponentFixture<MessagesSideBarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MessagesSideBarComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MessagesSideBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
