/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { ProductCartComponent } from './product-cart.component';

describe('Component: ProductCart', () => {
  it('should create an instance', () => {
    let component = new ProductCartComponent();
    expect(component).toBeTruthy();
  });
});
