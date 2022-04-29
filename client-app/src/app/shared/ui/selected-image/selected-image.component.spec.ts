import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedImageComponent } from './advertisement-form-item-images-image.component';

describe('SelectedImageComponent', () => {
    let component: SelectedImageComponent;
    let fixture: ComponentFixture<SelectedImageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SelectedImageComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectedImageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
