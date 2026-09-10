import { TestBed } from '@angular/core/testing';

import { ParcelsService } from './parcel.service';

describe('ParcelService', () => {
  let service: ParcelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParcelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
