import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTreeItemComponent } from './category-tree-item.component';

describe('CategoryTreeItemComponent', () => {
  let component: CategoryTreeItemComponent;
  let fixture: ComponentFixture<CategoryTreeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryTreeItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryTreeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
