
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {Sale} from '../classes/sale';
import {ApiHttp} from '../../shared/services/api-http';


@Injectable()
export class SaleService {
  constructor(private apiHttp: ApiHttp) {}

  post(branch_id, sale: SaleRequest) {
    return this.apiHttp.post(`branch/${branch_id}/sale`, sale).pipe(
      map(json => new Sale().parse(json.sale)));
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

