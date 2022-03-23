import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeViewNodeContainerComponent } from './tree-view-node-container.component';

describe('TreeViewNodeContainerComponent', () => {
  let component: TreeViewNodeContainerComponent;
  let fixture: ComponentFixture<TreeViewNodeContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeViewNodeContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeViewNodeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
