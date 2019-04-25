import {Inventory} from '@app/api/models/inventory.model';

export interface ProductSale {
  inventory: Inventory;
  quantity: number;
}
