import { Injectable } from '@angular/core';
import {ApiHttp} from '../../shared/services/api-http';
import {Observable} from 'rxjs/Observable';
import {Branch} from '../models/branch';
import {ReplaySubject} from 'rxjs/ReplaySubject';

@Injectable()
export class BranchService {
  private basePath = 'branch/';

  private branchesSubject: ReplaySubject<Branch[]> = new ReplaySubject(1);
  private branchesRequest: Observable<Branch[]>;

  constructor(private apiHttp: ApiHttp) {}

  getAll(): Observable<Branch[]> {
    return this.apiHttp.get(this.basePath)
      .map(res => Branch.parseArray(res.branches));
  }

  getAllCached(params?, refresh = false) {
    if (refresh || !this.branchesRequest) {
      this.branchesRequest = this.getAll();

      this.branchesRequest.subscribe(
        result => this.branchesSubject.next(result),
        err => this.branchesSubject.error(err)
      );
    }

    return this.branchesSubject.asObservable();
  }


  get(branch_id: number): Observable<Branch>  {
    return this.apiHttp.get(this.basePath + branch_id)
      .map(res => new Branch().parse(res.inventory));
  }

  put(branch: Branch) {
    return this.apiHttp.put(this.basePath + branch.id, branch)
      .map(res => new Branch().parse(res.inventory));
  }

  getSearch(search: string) {
    return this.apiHttp.get(this.basePath + 'search', {search: search})
      .map(res => Branch.parseArray(res.branches));
  }
}
