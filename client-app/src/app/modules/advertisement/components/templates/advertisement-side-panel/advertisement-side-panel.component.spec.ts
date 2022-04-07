import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementSidePanelComponent } from './advertisement-side-panel.component';

describe('AdvertisementSidePanelComponent', () => {
  let component: AdvertisementSidePanelComponent;
  let fixture: ComponentFixture<AdvertisementSidePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisementSidePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementSidePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
