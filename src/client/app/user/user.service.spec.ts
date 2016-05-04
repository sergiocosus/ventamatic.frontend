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
import {UserService} from './user.service.ts';

describe('User Service', () => {

  beforeEachProviders(() => [UserService]);
  
  it('should ...', inject([UserService], (service: UserService) => {

  }));

});
