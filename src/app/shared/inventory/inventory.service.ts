import { Injectable } from '@angular/core';
import {ApiHttp} from "../api-http";
import {Inventory} from "./inventory";

@Injectable()
export class InventoryService {
  constructor(private apiHttp:ApiHttp) {}

  getAll(branch_id:number){
    return this.apiHttp.get(`branch/${branch_id}/inventory`)
      .map(json => Inventory.parseArray(json.inventories))
  }

  get(branch_id:number, product_id:number){
    return this.apiHttp.get(`branch/${branch_id}/inventory/${product_id}`)
      .map(json => new Inventory().parse(json.inventory));
  }

  search(branch_id:number, search:string){
    return this.apiHttp.get(`branch/${branch_id}/inventory/search`, {search:search})
      .map(json => Inventory.parseArray(json.inventories));
  }

  getByBarCode(branch_id:number, bar_code: string){
    return this.apiHttp.get(`branch/${branch_id}/inventory/bar-code`,{bar_code:bar_code})
      .map(json => new Inventory().parse(json.inventory));
  }
}
