import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDefinitionDetailsComponent } from './category-definition-details.component';

describe('CategoryDefinitionDetailsComponent', () => {
  let component: CategoryDefinitionDetailsComponent;
  let fixture: ComponentFixture<CategoryDefinitionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryDefinitionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDefinitionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
