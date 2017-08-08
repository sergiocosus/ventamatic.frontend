import {Model} from '../../shared/classes/model';
import {Branch} from '../../branch/models/branch';
import {Product} from '../../product/classes/product';

/**
 * Created by alx on 16/06/16.
 */
export class Inventory extends Model {
  id: number;
  branch_id: number;
  product_id: number;
  quantity: number;
  price: number;
  minimum: number;
  current_price?: number;
  current_total_cost?: number;
  created_at: string;
  updated_at: string;

  product: Product;
  branch: Branch;

  public static parseArray(objs: any) {
    return objs.map(obj => {return new Inventory().parse(obj); });
  }

  parse(obj) {
    super.parse(obj);
    this.product = new Product().parse(this.product);
    this.branch = new Branch().parse(this.branch);
    return this;
  }

  get searchFieldsHeader() {
    return [
      'Descripción',
      'Precio',
      'Cantidad',
    ];
  }

  get searchFields(){
    return [
      this.product.description,
      this.current_price,
      this.quantity,
    ];
  }
}
