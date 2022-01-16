import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeRegisterFormComponent } from './welcome-register-form.component';

describe('WelcomeRegisterFormComponent', () => {
  let component: WelcomeRegisterFormComponent;
  let fixture: ComponentFixture<WelcomeRegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeRegisterFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
