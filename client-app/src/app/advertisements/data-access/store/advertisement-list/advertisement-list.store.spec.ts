import { TestBed } from '@angular/core/testing';

import { AdvertisementListStore } from './advertisement-list.store';

describe('AdvertisementListStore', () => {
    let store: AdvertisementListStore;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        store = TestBed.inject(AdvertisementListStore);
    });

    it('should be created', () => {
        expect(store).toBeTruthy();
    });
});
