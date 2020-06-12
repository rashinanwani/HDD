import { TestBed } from '@angular/core/testing';

import { GetDataServiceService } from './get-data-service.service';

describe('GetDataServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetDataServiceService = TestBed.get(GetDataServiceService);
    expect(service).toBeTruthy();
  });
});