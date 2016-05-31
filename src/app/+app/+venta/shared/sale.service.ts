import { Injectable } from '@angular/core';
import {ApiHttp} from "../../../shared/api-http";

@Injectable()
export class SaleService {
  private basePath = 'branch/1/sale';

  constructor(private apiHttp:ApiHttp) {}

  post(sale){
    return this.apiHttp.post(this.basePath, sale);
  }
}
