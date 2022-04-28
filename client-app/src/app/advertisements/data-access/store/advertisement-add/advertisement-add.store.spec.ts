import { TestBed } from '@angular/core/testing';

import { AdvertisementAddStore } from './advertisement-add.store';

describe('AdvertisementAddStore', () => {
    let store: AdvertisementAddStore;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        store = TestBed.inject(AdvertisementAddStore);
    });

    it('should be created', () => {
        expect(store).toBeTruthy();
    });
});
