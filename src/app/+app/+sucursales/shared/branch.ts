import {Model} from "../../../shared/model";

export class Branch extends Model{
  id:number;
  name:string;
  description:string;
  address:string;
  title_ticket:string;
  header_ticket:string;
  footer_ticket:string;
  image_hash:string;
  created_at:string;
  updated_at:string;
  deleted_at:string;

  public static parseArray(objs:any){
    return objs.map(obj => {return new Branch().parse(obj)})
  }
}
