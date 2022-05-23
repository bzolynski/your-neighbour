import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsMyAdvertisementsFormComponent } from './settings-my-advertisements-form.component';

describe('SettingsMyAdvertisementsFormComponent', () => {
  let component: SettingsMyAdvertisementsFormComponent;
  let fixture: ComponentFixture<SettingsMyAdvertisementsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsMyAdvertisementsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsMyAdvertisementsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
