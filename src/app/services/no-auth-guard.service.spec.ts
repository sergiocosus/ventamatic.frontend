/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NoAuthGuardService } from './no-auth-guard.service';

describe('Service: NoAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoAuthGuardService]
    });
  });

  it('should ...', inject([NoAuthGuardService], (service: NoAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
