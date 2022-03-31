import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementTopBarComponent } from './advertisement-top-bar.component';

describe('AdvertisementTopBarComponent', () => {
  let component: AdvertisementTopBarComponent;
  let fixture: ComponentFixture<AdvertisementTopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisementTopBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
