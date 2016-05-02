import {
  beforeEachProviders,
  it,
  iit,
  describe,
  ddescribe,
  expect,
  inject,
  injectAsync
} from 'angular2/testing';
import {provide} from 'angular2/core';
import {AuthService} from './auth.service';

describe('Auth Service', () => {

  beforeEachProviders(() => [AuthService]);
  
  it('should ...', inject([AuthService], (service: AuthService) => {

  }));

});
