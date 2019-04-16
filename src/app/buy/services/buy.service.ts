
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {Buy} from '../classes/buy.model';
import {ApiHttp} from '../../shared/services/api-http';


@Injectable()
export class BuyService {
  constructor(private apiHttp: ApiHttp) {}

  post(branch_id, buy: BuyRequest) {
    return this.apiHttp.post(`branch/${branch_id}/buy`, buy).pipe(
      map(json => new Buy().parse(json.buy)));
  }

}



export interface BuyRequest {
  iva: number;
  ieps: string;
  supplier_id: number;
  supplier_bill_id: string;
  payment_type_id: number;
  card_payment_id: string;
  total: number;
  supplier_bill_total: number;
  products: {
    product_id: number;
    quantity: number;
    cost: number;
  }[];
}

