import {Model} from "../../../shared/model";
import {Branch} from "../../+sucursales/shared/branch";
import {Client} from "../../+clientes/shared/client";
import {Product} from "../../../shared/product/product";
import {User} from "../../../user/user";

export class Sale extends Model{
  branch:Branch;
  branch_id:number;
  card_payment_id:number;
  client:Client;
  client_id:number;
  client_payment:number;
  created_at:string;
  id:number;
  payment_type:any;
  payment_type_id:number;
  products:Product[];
  total:number;
  updated_at:string;
  user:User;
  user_id:number;

  parse(obj){
    super.parse(obj);

    this.branch = new Branch().parse(this.branch);
    this.client = new Client().parse(this.client);
    this.products = Product.parseArray(this.products);
    this.user = new User().parse(this.user);
    this.parseDateTime('created_at');

    return this;
  }
}
