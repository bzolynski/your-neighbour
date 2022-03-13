import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeViewRootComponent } from './tree-view-root.component';

describe('TreeViewRootComponent', () => {
  let component: TreeViewRootComponent;
  let fixture: ComponentFixture<TreeViewRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeViewRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeViewRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
