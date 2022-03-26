import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeViewPreviewComponent } from './tree-view-preview.component';

describe('TreeViewPreviewComponent', () => {
  let component: TreeViewPreviewComponent;
  let fixture: ComponentFixture<TreeViewPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeViewPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeViewPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
