import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BouncyLoadingBackdropComponent } from './bouncy-loading-backdrop.component';

describe('BouncyLoadingBackdropComponent', () => {
    let component: BouncyLoadingBackdropComponent;
    let fixture: ComponentFixture<BouncyLoadingBackdropComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BouncyLoadingBackdropComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BouncyLoadingBackdropComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
