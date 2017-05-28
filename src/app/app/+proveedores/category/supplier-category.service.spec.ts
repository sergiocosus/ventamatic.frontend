/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SupplierCategoryService } from './supplier-category.service';

describe('Service: SupplierCategory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupplierCategoryService]
    });
  });

  it('should ...', inject([SupplierCategoryService], (service: SupplierCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
