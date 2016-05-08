import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { UserService } from './user.service';

describe('Auth Service', () => {
  beforeEachProviders(() => [UserService]);

  it('should ...',
    inject([UserService], (service: UserService) => {
      expect(service).toBeTruthy();
    }));
});
