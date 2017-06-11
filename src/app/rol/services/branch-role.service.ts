import { Injectable } from '@angular/core';
import {BranchRole} from '../classes/branch-role';
import {ApiHttp} from '../../shared/services/api-http';

@Injectable()
export class BranchRoleService {
  private basePath = 'security/branch/role/';

  constructor(private apiHttp: ApiHttp) {}

  getAll() {
    return this.apiHttp.get(this.basePath)
      .map(json => BranchRole.parseArray(json.branch_roles));
  }

  get(branch_role_id) {
    return this.apiHttp.get(this.basePath + branch_role_id)
      .map(json => new BranchRole().parse(json.branch_role));
  }

  post(branchRole: BranchRole) {
    return this.apiHttp.post(this.basePath, branchRole)
      .map(json => new BranchRole().parse(json.branch_role));
  }

  put(branchRole: BranchRole) {
    return this.apiHttp.put(this.basePath + branchRole.id, branchRole)
      .map(json => new BranchRole().parse(json.branch_role));
  }

  delete(branch_role_id: number) {
    return this.apiHttp.delete(this.basePath + branch_role_id);
  }

}
