import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementRootComponent } from './advertisement-root.component';

describe('AdvertisementRootComponent', () => {
  let component: AdvertisementRootComponent;
  let fixture: ComponentFixture<AdvertisementRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisementRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
