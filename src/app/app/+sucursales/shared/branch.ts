import {Model} from "../../../shared/model";
import {BranchRole} from "../../+roles/classes/branch-role";

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

  branch_roles:BranchRole[];


  parse(obj): any {
    super.parse(obj);

    if(this.branch_roles){
      this.branch_roles = BranchRole.parseArray(this.branch_roles);
    }

    return this;
  }

  public static parseArray(objs:any){
    return objs.map(obj => {return new Branch().parse(obj)})
  }
}
