import { Injectable } from '@angular/core';
import {ApiHttp} from '../../shared/api-http';
import {InventoryMovementType} from '../classes/inventory-movement-type.model';

@Injectable()
export class InventoryMovementTypeService {
  constructor(private apiHttp: ApiHttp) {}

  getAll() {
    return this.apiHttp.get(`inventory/movement-type`)
      .map(json => InventoryMovementType.parseArray(json.inventory_movement_types));
  }
}
