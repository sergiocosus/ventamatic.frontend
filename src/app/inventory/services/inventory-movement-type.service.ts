import { Injectable } from '@angular/core';
import {InventoryMovementType} from '../classes/inventory-movement-type.model';
import {ApiHttp} from '../../shared/services/api-http';

@Injectable()
export class InventoryMovementTypeService {
  constructor(private apiHttp: ApiHttp) {}

  getAll() {
    return this.apiHttp.get(`inventory/movement-type`)
      .map(json => InventoryMovementType.parseArray(json.inventory_movement_types));
  }
}
