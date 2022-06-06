import { TestBed } from '@angular/core/testing';

import { FavoriteAdvertisementService } from './favorite-advertisement.service';

describe('FavoriteAdvertisementService', () => {
  let service: FavoriteAdvertisementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteAdvertisementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
