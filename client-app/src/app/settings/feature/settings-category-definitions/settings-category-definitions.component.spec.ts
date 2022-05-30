import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCategoryDefinitionsComponent } from './settings-category-definitions.component';

describe('SettingsCategoryDefinitionsComponent', () => {
  let component: SettingsCategoryDefinitionsComponent;
  let fixture: ComponentFixture<SettingsCategoryDefinitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsCategoryDefinitionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsCategoryDefinitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
