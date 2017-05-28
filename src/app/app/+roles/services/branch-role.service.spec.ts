/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BranchRoleService } from './branch-role.service';

describe('Service: BranchRole', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BranchRoleService]
    });
  });

  it('should ...', inject([BranchRoleService], (service: BranchRoleService) => {
    expect(service).toBeTruthy();
  }));
});
