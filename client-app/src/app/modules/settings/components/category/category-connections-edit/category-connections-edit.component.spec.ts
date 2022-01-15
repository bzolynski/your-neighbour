import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryConnectionsEditComponent } from './category-connections-edit.component';

describe('CategoryConnectionsEditComponent', () => {
  let component: CategoryConnectionsEditComponent;
  let fixture: ComponentFixture<CategoryConnectionsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryConnectionsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryConnectionsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
