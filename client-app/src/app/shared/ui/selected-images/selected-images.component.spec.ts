import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectedImagesComponent } from './selected-images.component';
describe('SelectedImagesComponent', () => {
    let component: SelectedImagesComponent;
    let fixture: ComponentFixture<SelectedImagesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SelectedImagesComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectedImagesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
