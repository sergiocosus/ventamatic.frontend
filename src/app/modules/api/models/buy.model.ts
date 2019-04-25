import { Model } from '@app/api/models/model';
import {User} from '@app/api/models/user';
import {Supplier} from '@app/api/models/supplier';
import {Branch} from '@app/api/models/branch';
import {Product} from '@app/api/models/product';

export class Buy extends Model {
  id: number;
  payment_type: any;
  payment_type_id: number;
  card_payment_id: number;
  iva: number;
  ieps: number;
  total: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  user: User;
  user_id: number;
  supplier: Supplier;
  supplier_id: number;
  branch: Branch;
  branch_id: number;
  supplier_bill_id: number;
  supplier_bill_total: number;
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
