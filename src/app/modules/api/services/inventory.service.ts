import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Inventory } from '../models/inventory.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  constructor(private httpClient: HttpClient) {
  }

  getAll(branch_id: number, params = undefined) {
    return this.httpClient.get(`branch/${branch_id}/inventory`, params)
      .pipe(this.mapInventories());
  }

  get(branch_id: number, product_id: number) {
    return this.httpClient.get(`branch/${branch_id}/inventory/${product_id}`)
      .pipe(this.mapInventory());
  }

  search(branch_id: number, search: string) {
    return this.httpClient.get(`branch/${branch_id}/inventory/search`, {params: {search}})
      .pipe(this.mapInventories());
  }

  getByBarCode(branch_id: number, bar_code: string) {
    return this.httpClient.get(`branch/${branch_id}/inventory/bar-code`, {params: {bar_code}})
      .pipe(this.mapInventory());
  }

  post(branch_id: number, product_id: number, data) {
    return this.httpClient.post(`branch/${branch_id}/inventory/${product_id}`, data)
      .pipe(this.mapInventories());
  }

  put(inventory: Inventory) {
    return this.httpClient.put(`branch/${inventory.branch_id}/inventory/${inventory.product_id}`, inventory)
      .pipe(this.mapInventory());
  }

  protected mapInventory() {
    return map(response => new Inventory().parse(response['inventory']));
  }

  protected mapInventories() {
    return map(response => Inventory.parseArray(response['inventories']));
  }
}
