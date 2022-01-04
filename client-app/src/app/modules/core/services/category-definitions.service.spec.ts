import { TestBed } from '@angular/core/testing';

import { CategoryDefinitionsService } from './category-definitions.service';

describe('CategoryDefinitionsService', () => {
  let service: CategoryDefinitionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryDefinitionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
