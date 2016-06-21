import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { InventoryService } from './inventory.service';

describe('Inventory Service', () => {
  beforeEachProviders(() => [InventoryService]);

  it('should ...',
      inject([InventoryService], (service: InventoryService) => {
    expect(service).toBeTruthy();
  }));
});
