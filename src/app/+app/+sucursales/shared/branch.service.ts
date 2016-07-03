import { Injectable } from '@angular/core';
import { ApiHttp } from "../../../shared/api-http";
import { Branch } from "./branch";
import {Observable} from "rxjs/Rx";

@Injectable()
export class BranchService {
  private basePath = 'branch/';

  constructor(private apiHttp:ApiHttp) {}

  getAll():Observable<Branch[]> {
    return this.apiHttp.get(this.basePath)
      .map(res => Branch.parseArray(res.branches));
  }

  get(branch_id:number):Observable<Branch>  {
    return this.apiHttp.get(this.basePath + branch_id)
      .map(res => new Branch().parse(res.branch));
  }
  
  put(branch:Branch){
    return this.apiHttp.put(this.basePath + branch.id, branch)
      .map(res => new Branch().parse(res.branch));
  }
}
