import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { BranchService } from './branch.service';

describe('Branch Service', () => {
  beforeEachProviders(() => [BranchService]);

  it('should ...',
      inject([BranchService], (service: BranchService) => {
    expect(service).toBeTruthy();
  }));
});
