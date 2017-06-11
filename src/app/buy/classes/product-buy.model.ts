import {Product} from '../../product/classes/product';

export interface ProductBuy {
  product: Product;
  quantity: number;
  cost: number;
  inventoryMovementType: { text: string, id: number };
}
