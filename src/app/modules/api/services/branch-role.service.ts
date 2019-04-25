import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BranchRole } from '../models/branch-role';
import { Observable, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BranchRoleService {
  private basePath = 'security/branch/role/';

  private branchRolesSubject: ReplaySubject<BranchRole[]> = new ReplaySubject(1);
  private branchRolesRequest: Observable<BranchRole[]>;

  constructor(private httpClient: HttpClient) {
  }

  getAll() {
    return this.httpClient.get(this.basePath)
      .pipe(this.mapBranchRoles());
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
    return this.httpClient.get(this.basePath + branch_role_id)
      .pipe(this.mapBranchRole());
  }

  post(branchRole: BranchRole) {
    return this.httpClient.post(this.basePath, branchRole)
      .pipe(this.mapBranchRole());
  }

  put(branchRole: BranchRole) {
    return this.httpClient.put(this.basePath + branchRole.id, branchRole)
      .pipe(this.mapBranchRole());
  }

  delete(branch_role_id: number) {
    return this.httpClient.delete(this.basePath + branch_role_id);
  }

  protected mapBranchRole() {
    return map(response => new BranchRole().parse(response['branch_role']));
  }

  protected mapBranchRoles() {
    return map(response => BranchRole.parseArray(response['branch_roles']));
  }
}
