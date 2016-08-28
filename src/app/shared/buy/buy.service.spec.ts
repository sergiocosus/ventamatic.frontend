/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { BuyService } from './buy.service';

describe('Buy Service', () => {
  beforeEachProviders(() => [BuyService]);

  it('should ...',
      inject([BuyService], (service: BuyService) => {
    expect(service).toBeTruthy();
  }));
});
