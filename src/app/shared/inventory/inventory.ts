import {Model} from "../model";
import {Product} from "../product/product";

export class Inventory extends Model{

  description:string;
  price:number;
  quantity:number;

  product:Product;

  get correctPrice(){
    return this.price || this.product.global_price;
  }

  parse(obj) {
    super.parse(obj);
    this.product = new Product().parse(this.product);
    return this;
  }

  public static parseArray(objs:any){
    return objs.map(obj => {return new Inventory().parse(obj)})
  }

  get searchFields(){
    return [
      this.product.description,
      this.correctPrice,
      this.quantity,
    ];
  }
}
