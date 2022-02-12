import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeLandingPageComponent } from './welcome-landing-page.component';

describe('LandingPageComponent', () => {
  let component: WelcomeLandingPageComponent;
  let fixture: ComponentFixture<WelcomeLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeLandingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
