import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { InventoryMovementType } from '../models/inventory-movement-type.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventoryMovementTypeService {
  constructor(private httpClient: HttpClient) {
  }

  getAll() {
    return this.httpClient.get(`inventory/movement-type`).pipe(
      map(json => InventoryMovementType.parseArray(json['inventory_movement_types'])));
  }
}
