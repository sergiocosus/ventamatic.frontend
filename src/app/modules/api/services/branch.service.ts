import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Branch } from '../models/branch';
import { CacheableRequest } from '../classes/cacheable-request';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private basePath = 'branch/';

  private allCache = new CacheableRequest<Branch[]>();

  constructor(private apiHttp: HttpClient) {
  }

  getAll(): Observable<Branch[]> {
    return this.apiHttp.get(this.basePath)
      .pipe(this.mapBranches());
  }

  getAllCached(params?, refresh = false) {
    return this.allCache.getCache(this.getAll(), refresh);
  }

  clearCache() {
    this.allCache.clear();
  }

  get(branch_id: number): Observable<Branch> {
    return this.apiHttp.get(this.basePath + branch_id)
      .pipe(this.mapBranch());
  }

  put(branch: Branch) {
    return this.apiHttp.put(this.basePath + branch.id, branch)
      .pipe(this.mapBranch());
  }

  getSearch(search: string) {
    return this.apiHttp.get(this.basePath + 'search', {params: {search}})
      .pipe(this.mapBranches());
  }

  protected mapBranch() {
    return map(response => new Branch().parse(response['branch']));
  }

  protected mapBranches() {
    return map(response => Branch.parseArray(response['branches']));
  }
}
