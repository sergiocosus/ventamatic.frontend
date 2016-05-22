import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { SupplierService } from './supplier.service.ts';

describe('Supplier Service', () => {
  beforeEachProviders(() => [SupplierService]);

  it('should ...',
      inject([SupplierService], (service: SupplierService) => {
    expect(service).toBeTruthy();
  }));
});
