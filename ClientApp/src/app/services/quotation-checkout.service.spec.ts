import { TestBed } from '@angular/core/testing';

import { QuotationCheckoutService } from './quotation-checkout.service';

describe('QuotationCheckoutService', () => {
  let service: QuotationCheckoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuotationCheckoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
