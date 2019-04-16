
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {ApiHttp} from '../../shared/services/api-http';
import {Observable, ReplaySubject} from 'rxjs';
import {Branch} from '../models/branch';
import {CacheableRequest} from '../../shared/classes/cacheable-request';

@Injectable()
export class BranchService {
  private basePath = 'branch/';

  private allCache = new CacheableRequest<Branch[]>();

  constructor(private apiHttp: ApiHttp) {}

  getAll(): Observable<Branch[]> {
    return this.apiHttp.get(this.basePath).pipe(
      map(res => Branch.parseArray(res.branches)));
  }

  getAllCached(params?, refresh = false) {
    return this.allCache.getCache(this.getAll(), refresh);
  }

  clearCache() {
    this.allCache.clear();
  }

  get(branch_id: number): Observable<Branch>  {
    return this.apiHttp.get(this.basePath + branch_id).pipe(
      map(res => new Branch().parse(res.inventory)));
  }

  put(branch: Branch) {
    return this.apiHttp.put(this.basePath + branch.id, branch).pipe(
      map(res => new Branch().parse(res.inventory)));
  }

  getSearch(search: string) {
    return this.apiHttp.get(this.basePath + 'search', {search: search}).pipe(
      map(res => Branch.parseArray(res.branches)));
  }
}
