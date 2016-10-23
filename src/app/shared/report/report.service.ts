import { Injectable } from '@angular/core';
import {ApiHttp} from "../api-http";
import {Model} from "../model";

@Injectable()
export class ReportService {

  private basePath= 'report/';

  constructor(private apiHttp:ApiHttp) {}

  getSale(params?:any){
    return this.apiHttp.get(this.basePath + 'sale', params)
      .map(res => {
        res.sales.forEach(
          sale => {
            sale.created_at = Model.parseDateTime(sale.created_at);
          }
        );
        return res.sales;
      });
  }

  getBuy(params?:any){
    return this.apiHttp.get(this.basePath + 'buy', params)
      .map(res => {
        res.buys.forEach(
          buy => {
            buy.created_at = Model.parseDateTime(buy.created_at);
          }
        );
        return res.buys;
      });
  }

}
