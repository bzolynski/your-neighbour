import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsMyComponent } from './settings-my.component';

describe('SettingsMyComponent', () => {
  let component: SettingsMyComponent;
  let fixture: ComponentFixture<SettingsMyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsMyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsMyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
