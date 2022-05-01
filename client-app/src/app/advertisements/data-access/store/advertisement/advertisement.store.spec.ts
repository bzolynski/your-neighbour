import { TestBed } from '@angular/core/testing';

import { AdvertisementStore } from './advertisement.store';

describe('AdvertisementStore', () => {
    let store: AdvertisementStore;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        store = TestBed.inject(AdvertisementStore);
    });

    it('should be created', () => {
        expect(store).toBeTruthy();
    });
});
