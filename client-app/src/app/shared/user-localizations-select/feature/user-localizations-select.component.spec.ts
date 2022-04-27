import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLocalizationsSelectComponent } from './user-localizations-select.component';

describe('UserLocalizationsSelectComponent', () => {
  let component: UserLocalizationsSelectComponent;
  let fixture: ComponentFixture<UserLocalizationsSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLocalizationsSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLocalizationsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
