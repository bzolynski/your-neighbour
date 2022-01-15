import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDefinitionListComponent } from './category-definition-list.component';

describe('CategoryDefinitionListComponent', () => {
  let component: CategoryDefinitionListComponent;
  let fixture: ComponentFixture<CategoryDefinitionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryDefinitionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDefinitionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
