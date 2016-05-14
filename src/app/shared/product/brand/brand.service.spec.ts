import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { BrandService } from './brand.service';

describe('Brand Service', () => {
  beforeEachProviders(() => [BrandService]);

  it('should ...',
      inject([BrandService], (service: BrandService) => {
    expect(service).toBeTruthy();
  }));
});
