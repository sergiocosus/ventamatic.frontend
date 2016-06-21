import {Model} from "../model";
import {Product} from "../product/product";
import {Branch} from "../../+app/+sucursales/shared/branch";
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
  created_at: string;
  updated_at: string;
  
  product:Product;
  branch:Branch;

  get correctPrice(){
    return this.price || this.product.global_price;
  }
  
  parse(obj) {
    super.parse(obj);
    this.product = new Product().parse(this.product);
    this.branch = new Branch().parse(this.branch);
  }

  get searchFields(){
    return [
      this.product.description,
      this.correctPrice,
      this.quantity,
    ];
  }
}
