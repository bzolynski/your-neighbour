import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsSideBarGroupComponent } from './settings-side-bar-group.component';

describe('SettingsSideBarGroupComponent', () => {
  let component: SettingsSideBarGroupComponent;
  let fixture: ComponentFixture<SettingsSideBarGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsSideBarGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsSideBarGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
