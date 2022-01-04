import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDefinitionSettingsComponent } from './category-definition-settings.component';

describe('CategoryDefinitionSettingsComponent', () => {
  let component: CategoryDefinitionSettingsComponent;
  let fixture: ComponentFixture<CategoryDefinitionSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryDefinitionSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDefinitionSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
