import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Buy } from '../models/buy.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BuyService {
  constructor(private httpClient: HttpClient) {
  }

  post(branch_id, buy: BuyRequest) {
    return this.httpClient.post(`branch/${branch_id}/buy`, buy).pipe(
      map(json => new Buy().parse(json['buy'])));
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

