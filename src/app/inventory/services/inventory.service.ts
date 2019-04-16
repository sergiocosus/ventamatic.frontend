
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {Inventory} from '../classes/inventory.model';
import {ApiHttp} from '../../shared/services/api-http';

@Injectable()
export class InventoryService {
  constructor(private apiHttp: ApiHttp) {}

  getAll(branch_id: number, params = undefined) {
    return this.apiHttp.get(`branch/${branch_id}/inventory`, params).pipe(
      map(json => Inventory.parseArray(json.inventories)));
  }

  get(branch_id: number, product_id: number){
    return this.apiHttp.get(`branch/${branch_id}/inventory/${product_id}`).pipe(
      map(json => new Inventory().parse(json.inventory)));
  }

  search(branch_id: number, search: string){
    return this.apiHttp.get(`branch/${branch_id}/inventory/search`, {search: search}).pipe(
      map(json => Inventory.parseArray(json.inventories)));
  }

  getByBarCode(branch_id: number, bar_code: string){
    return this.apiHttp.get(`branch/${branch_id}/inventory/bar-code`, {bar_code: bar_code}).pipe(
      map(json => new Inventory().parse(json.inventory)));
  }

  post(branch_id: number, product_id: number, data){
    return this.apiHttp.post(`branch/${branch_id}/inventory/${product_id}`, data).pipe(
      map(json => Inventory.parseArray(json.inventories)));
  }

  put(inventory: Inventory) {
    return this.apiHttp.put(`branch/${inventory.branch_id}/inventory/${inventory.product_id}`, inventory).pipe(
      map(res => new Inventory().parse(res.inventory)));
  }
}
