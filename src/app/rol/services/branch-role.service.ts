
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {BranchRole} from '../classes/branch-role';
import {ApiHttp} from '../../shared/services/api-http';
import {ReplaySubject, Observable} from 'rxjs';

@Injectable()
export class BranchRoleService {
  private basePath = 'security/branch/role/';

  private branchRolesSubject: ReplaySubject<BranchRole[]> = new ReplaySubject(1);
  private branchRolesRequest: Observable<BranchRole[]>;

  constructor(private apiHttp: ApiHttp) {}

  getAll() {
    return this.apiHttp.get(this.basePath).pipe(
      map(json => BranchRole.parseArray(json.branch_roles)));
  }

  getAllCached(refresh = false) {
    if (refresh || !this.branchRolesRequest) {
      this.branchRolesRequest = this.getAll();

      this.branchRolesRequest.subscribe(
        result => this.branchRolesSubject.next(result),
        err => this.branchRolesSubject.error(err)
      );
    }

    return this.branchRolesSubject.asObservable();
  }

  clearCache() {
    this.branchRolesRequest = null;
  }

  get(branch_role_id) {
    return this.apiHttp.get(this.basePath + branch_role_id).pipe(
      map(json => new BranchRole().parse(json.branch_role)));
  }

  post(branchRole: BranchRole) {
    return this.apiHttp.post(this.basePath, branchRole).pipe(
      map(json => new BranchRole().parse(json.branch_role)));
  }

  put(branchRole: BranchRole) {
    return this.apiHttp.put(this.basePath + branchRole.id, branchRole).pipe(
      map(json => new BranchRole().parse(json.branch_role)));
  }

  delete(branch_role_id: number) {
    return this.apiHttp.delete(this.basePath + branch_role_id);
  }

}
