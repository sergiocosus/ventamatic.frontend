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

}
