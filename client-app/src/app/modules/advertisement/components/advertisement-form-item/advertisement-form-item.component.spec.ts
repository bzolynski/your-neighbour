import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementFormItemComponent } from './advertisement-form-item.component';

describe('AdvertisementFormItemComponent', () => {
  let component: AdvertisementFormItemComponent;
  let fixture: ComponentFixture<AdvertisementFormItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisementFormItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementFormItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
