import {Product} from '@app/api/models/product';

export interface ProductBuy {
  product: Product;
  quantity: number;
  cost: number;
  inventory_movement_type: { text: string, id: number };
}
