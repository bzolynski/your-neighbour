import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingDividerComponent } from './landing-divider.component';

describe('LandingDividerComponent', () => {
  let component: LandingDividerComponent;
  let fixture: ComponentFixture<LandingDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingDividerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
