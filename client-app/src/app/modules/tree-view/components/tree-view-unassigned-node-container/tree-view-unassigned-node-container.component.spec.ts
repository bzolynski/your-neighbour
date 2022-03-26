import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeViewUnassignedNodeContainerComponent } from './tree-view-unassigned-node-container.component';

describe('TreeViewUnassignedNodeContainerComponent', () => {
  let component: TreeViewUnassignedNodeContainerComponent;
  let fixture: ComponentFixture<TreeViewUnassignedNodeContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeViewUnassignedNodeContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeViewUnassignedNodeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
