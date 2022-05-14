import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCarouselItemComponent } from './image-carousel-item.component';

describe('ImageCarouselItemComponent', () => {
    let component: ImageCarouselItemComponent;
    let fixture: ComponentFixture<ImageCarouselItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ImageCarouselItemComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ImageCarouselItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
