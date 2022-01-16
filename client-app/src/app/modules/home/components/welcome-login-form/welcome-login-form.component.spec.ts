import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeLoginFormComponent } from './welcome-login-form.component';

describe('WelcomeLoginFormComponent', () => {
  let component: WelcomeLoginFormComponent;
  let fixture: ComponentFixture<WelcomeLoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeLoginFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
