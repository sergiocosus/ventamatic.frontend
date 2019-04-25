import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Sale } from '../models/sale';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SaleService {
  constructor(private apiHttp: HttpClient) {
  }

  post(branch_id, sale: SaleRequest) {
    return this.apiHttp.post(`branch/${branch_id}/sale`, sale).pipe(
      map(json => new Sale().parse(json['sale'])));
  }

  delete(sale_id: number) {
    return this.apiHttp.delete(`branch/sale/${sale_id}`);
  }
}

export interface SaleRequest {
  client_id: number;
  payment_type_id: number;
  card_payment_id: string;
  total: number;
  client_payment: number;
  products: {
    product_id: number;
    quantity: number;
  }[];
}

