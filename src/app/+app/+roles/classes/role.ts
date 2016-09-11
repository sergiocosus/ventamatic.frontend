import {Model} from "../../../shared/model";
import {Permission} from "../../../shared/security/permission";

export class Role extends Model{
  id: number;
  name: string;
  display_name: string;
  description: string;
  created_at:string;
  updated_at:string;
  permissions:Permission[];



  public static parseArray(objs:any){
    return objs.map(obj => {return new Role().parse(obj)})
  }

}
