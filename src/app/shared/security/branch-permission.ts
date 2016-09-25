import {Model} from "../model";

export class BranchPermission extends Model {
  id: number;
  name: string;
  display_name: string;
  description: string;
  created_at:string;
  updated_at:string;

  public static parseArray(objs:any){
    return objs.map(obj => {return new BranchPermission().parse(obj)})
  }
}
