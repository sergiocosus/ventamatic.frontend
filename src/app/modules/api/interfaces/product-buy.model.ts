import {Product} from '@app/api/models/product';

export interface ProductBuy {
  product: Product;
  quantity: number;
  cost: number;
  inventoryMovementType: { text: string, id: number };
}
