import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDefinitionFormComponent } from './category-definition-form.component';

describe('CategoryDefinitionFormComponent', () => {
  let component: CategoryDefinitionFormComponent;
  let fixture: ComponentFixture<CategoryDefinitionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryDefinitionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDefinitionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
