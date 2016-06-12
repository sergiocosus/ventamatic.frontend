import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { SaleService } from './sale.service';

describe('Sale Service', () => {
  beforeEachProviders(() => [SaleService]);

  it('should ...',
      inject([SaleService], (service: SaleService) => {
    expect(service).toBeTruthy();
  }));
});
