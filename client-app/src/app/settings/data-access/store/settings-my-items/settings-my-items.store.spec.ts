import { TestBed } from '@angular/core/testing';

import { SettingsMyItemsStore } from './settings-my-items.store';

describe('SettingsMyItemsStore', () => {
    let service: SettingsMyItemsStore;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SettingsMyItemsStore);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
