/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { BranchItemComponent } from './branch-item.component';

describe('Component: BranchItem', () => {
  it('should create an instance', () => {
    let component = new BranchItemComponent();
    expect(component).toBeTruthy();
  });
});
