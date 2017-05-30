import { Injectable } from '@angular/core';
import {ApiHttp} from "../../../shared/api-http";
import {Sale} from "./sale";

@Injectable()
export class SaleService {

  constructor(private apiHttp:ApiHttp) {}

  post(branch_id, sale:SaleRequest){
    return this.apiHttp.post(`branch/${branch_id}/sale`, sale)
      .map(json => new Sale().parse(json.sale));
  }
}

export interface SaleRequest {
  client_id: number;
  payment_type_id: number;
  card_payment_id: string;
  total: number;
  client_payment: number;
  products: {
    product_id:number;
    quantity:number;
  }[];
}

