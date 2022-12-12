import { TestBed } from '@angular/core/testing';

import { StartTripService } from './start-trip.service';

describe('StartTripService', () => {
  let service: StartTripService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StartTripService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
