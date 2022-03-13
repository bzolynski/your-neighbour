import { TestBed } from '@angular/core/testing';

import { TreeViewService } from './tree-view.service';

describe('TreeViewServiceService', () => {
  let service: TreeViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreeViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
