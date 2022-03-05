import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropPlaceholderComponent } from './drag-drop-placeholder.component';

describe('DragDropPlaceholderComponent', () => {
  let component: DragDropPlaceholderComponent;
  let fixture: ComponentFixture<DragDropPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragDropPlaceholderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragDropPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
