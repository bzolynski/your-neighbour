import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementFormItemDetailsComponent } from './advertisement-form-item-details.component';

describe('AdvertisementFormItemDetailsComponent', () => {
  let component: AdvertisementFormItemDetailsComponent;
  let fixture: ComponentFixture<AdvertisementFormItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisementFormItemDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementFormItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
