import { Injectable } from '@angular/core';
import {ApiHttp} from "../api-http";
import {Buy} from "./buy";

@Injectable()
export class BuyService {

  constructor(private apiHttp:ApiHttp) {}

  post(branch_id, buy:BuyRequest){
    return this.apiHttp.post(`branch/${branch_id}/buy`, buy)
      .map(json => new Buy().parse(json.buy));
  }

}



export interface BuyRequest {
  iva:number;
  ieps:string;

  supplier_id:number;
  supplier_bill_id:string;

  payment_type_id: number;
  card_payment_id: string;
  total: number;
  products: {
    product_id:number;
    quantity:number;
    cost:number;
  }[];
}

