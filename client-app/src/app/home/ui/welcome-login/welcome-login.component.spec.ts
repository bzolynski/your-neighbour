import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeLoginComponent } from './welcome-login.component';

describe('WelcomeLoginComponent', () => {
    let component: WelcomeLoginComponent;
    let fixture: ComponentFixture<WelcomeLoginComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WelcomeLoginComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WelcomeLoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
