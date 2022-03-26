import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeViewRootContainerComponent } from './tree-view-root-container.component';

describe('TreeViewRootContainerComponent', () => {
  let component: TreeViewRootContainerComponent;
  let fixture: ComponentFixture<TreeViewRootContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeViewRootContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeViewRootContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
