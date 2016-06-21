import { Injectable } from '@angular/core';
import {ApiHttp} from "../../../shared/api-http";

@Injectable()
export class SaleService {

  constructor(private apiHttp:ApiHttp) {}

  post(branch_id, sale){
    return this.apiHttp.post(`branch/${branch_id}/sale`, sale);
  }
}
