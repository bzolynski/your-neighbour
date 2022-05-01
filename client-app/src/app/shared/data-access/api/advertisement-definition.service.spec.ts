import { TestBed } from '@angular/core/testing';

import { AdvertisementDefinitionService } from './advertisement-definition.service';

describe('AdvertisementDefinitionService', () => {
    let service: AdvertisementDefinitionService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AdvertisementDefinitionService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
