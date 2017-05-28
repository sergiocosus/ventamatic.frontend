import {Model} from "../../shared/model";
import {User} from "../user";
import {Branch} from "../../app/+sucursales/shared/branch";

export class Schedule extends Model{
  public id:number;
  public user_id:number;
  public branch_id:number;
  public schedule_status_id:number;
  public initial_amount:number;
  public system_amount:number;
  public final_amount:number;
  public created_at:Date;
  public updated_at:Date;
  public deleted_at:string;

  public user:User;
  public branch:Branch;
  public schedule_status:any;

  /**
   * TODO put correct data type
   */
  public inventory: any;
    parse(obj):Schedule {
      super.parse(obj);

      this.user = new User().parse(this.user);
      this.branch = new Branch().parse(this.branch);

      this.parseDateTime('created_at');
      this.parseDateTime('updated_at');
      return this;
    }

    public static parseArray(objs:any){
    return objs.map(obj => {return new Schedule().parse(obj)})
  }
}
