/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { SaleConfirmModalComponent } from './sale-confirm-modal.component';

describe('Component: SaleConfirmModal', () => {
  it('should create an instance', () => {
    let component = new SaleConfirmModalComponent();
    expect(component).toBeTruthy();
  });
});
