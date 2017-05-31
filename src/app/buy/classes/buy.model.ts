import {Supplier} from "../../app/+proveedores/shared/supplier";
import {User} from "../../user/user";
import {Branch} from "../../app/+sucursales/shared/branch";
import {Model} from '../../shared/model';
import {Product} from '../../shared/product/product';

export class Buy extends Model{
  id:number;
  payment_type:any;
  payment_type_id:number;
  card_payment_id:number;
  iva:number;
  ieps:number;
  total:number;
  created_at:string;
  updated_at:string;
  deleted_at:string;
  user:User;
  user_id:number;
  supplier: Supplier;
  supplier_id:number;
  branch: Branch;
  branch_id:number;
  supplier_bill_id:number;
  products: Product[];

  parse(obj){
    super.parse(obj);

    this.branch = new Branch().parse(this.branch);
    this.supplier = new Supplier().parse(this.supplier);
    this.products = Product.parseArray(this.products);
    this.user = new User().parse(this.user);
    this.parseDateTime('created_at');

    return this;
  }

}
