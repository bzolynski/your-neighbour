import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeRegisterComponent } from './welcome-register.component';

describe('WelcomeRegisterComponent', () => {
    let component: WelcomeRegisterComponent;
    let fixture: ComponentFixture<WelcomeRegisterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WelcomeRegisterComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WelcomeRegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
