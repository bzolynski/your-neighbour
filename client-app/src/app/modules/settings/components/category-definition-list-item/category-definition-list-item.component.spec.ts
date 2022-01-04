import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDefinitionListItemComponent } from './category-definition-list-item.component';

describe('CategoryDefinitionListItemComponent', () => {
  let component: CategoryDefinitionListItemComponent;
  let fixture: ComponentFixture<CategoryDefinitionListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryDefinitionListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDefinitionListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
