import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeViewRootContainerGroupComponent } from './tree-view-root-container-group.component';

describe('TreeViewRootContainerGroupComponent', () => {
  let component: TreeViewRootContainerGroupComponent;
  let fixture: ComponentFixture<TreeViewRootContainerGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeViewRootContainerGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeViewRootContainerGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
