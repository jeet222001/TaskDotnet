import { TestBed } from '@angular/core/testing';

import { PricechangeService } from './pricechange.service';

describe('PricechangeService', () => {
  let service: PricechangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PricechangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
