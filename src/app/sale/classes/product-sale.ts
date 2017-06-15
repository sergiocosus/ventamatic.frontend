import {Inventory} from '../../inventory/classes/inventory.model';

export interface ProductSale {
  inventory: Inventory;
  quantity: number;
}
