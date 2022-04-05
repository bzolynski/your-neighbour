import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementFormItemPhotosComponent } from './advertisement-form-item-photos.component';

describe('AdvertisementFormItemPhotosComponent', () => {
  let component: AdvertisementFormItemPhotosComponent;
  let fixture: ComponentFixture<AdvertisementFormItemPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisementFormItemPhotosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementFormItemPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
