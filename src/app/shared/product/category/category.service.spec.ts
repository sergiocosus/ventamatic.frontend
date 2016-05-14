import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { CategoryService } from './category.service';

describe('Category Service', () => {
  beforeEachProviders(() => [CategoryService]);

  it('should ...',
      inject([CategoryService], (service: CategoryService) => {
    expect(service).toBeTruthy();
  }));
});
