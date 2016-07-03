/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { InputLabelComponent } from './input-label.component';

describe('Component: InputLabel', () => {
  it('should create an instance', () => {
    let component = new InputLabelComponent();
    expect(component).toBeTruthy();
  });
});
