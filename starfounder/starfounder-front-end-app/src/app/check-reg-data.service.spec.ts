import { TestBed } from '@angular/core/testing';

import { CheckRegDataService } from './check-reg-data.service';

describe('CheckRegDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckRegDataService = TestBed.get(CheckRegDataService);
    expect(service).toBeTruthy();
  });
});
