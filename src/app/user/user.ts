import {Model} from "../shared/model";
import {Role} from "../+app/+roles/classes/role";
import {BranchRole} from "../+app/+roles/classes/branch-role";
export class User extends Model{
  public id:number;
  public name:string;
  public email:string;
  public created_at:string;
  public updated_at:string;
  public username:string;
  public last_name:string;
  public last_name_2:string;
  public phone:string;
  public cellphone:string;
  public address:string;
  public rfc:string;
  public deleted_at:string;

  public password;

  roles:Role[];
  branch_roles:BranchRole[];

  get fullName(){
    return `${this.name} ${this.last_name} ${this.last_name_2}`;
  }

  parse(obj): any {
    super.parse(obj);

    if(this.roles) {
      this.roles = Role.parseArray(this.roles);
    }

    return this;
  }

  public static parseArray(objs:any){
    return objs.map(obj => {return new User().parse(obj)})
  }

}
