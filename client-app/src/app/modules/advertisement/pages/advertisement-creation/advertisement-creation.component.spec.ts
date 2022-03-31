import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementCreationComponent } from './advertisement-creation.component';

describe('AdvertisementCreationComponent', () => {
  let component: AdvertisementCreationComponent;
  let fixture: ComponentFixture<AdvertisementCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisementCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
