import { Injectable } from '@angular/core';
import {ApiHttp} from '../../shared/api-http';
import {Inventory} from '../classes/inventory.model';

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

  post(branch_id:number, product_id:number, data){
    return this.apiHttp.post(`branch/${branch_id}/inventory/${product_id}`, data)
      .map(json => new Inventory().parse(json.inventory));
  }

  put(inventory:Inventory){
    return this.apiHttp.put(`branch/${inventory.branch_id}/inventory/${inventory.product_id}`, inventory)
      .map(res => new Inventory().parse(res.inventory));
  }
}
