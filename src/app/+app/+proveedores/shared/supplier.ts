import {SupplierCategory} from "../category/supplier-category";
import {Brand} from "../../../shared/product/brand/brand";

export class Supplier {
  public id:number;
  public name:string;
  public email:string;
  public created_at:string;
  public updated_at:string;
  public phone:string;
  public cellphone:string;
  public address:string;
  public rfc:string;
  public deleted_at:string;

  public supplier_category_id:string;
  public supplier_category:SupplierCategory;
  public brands:Brand[];

  parse(obj){
    for (var prop in obj) this[prop] = obj[prop];

    return this;
  }

  public static parseArray(objs:any){
    return objs.map(obj => {return new Supplier().parse(obj)})
  }

}
