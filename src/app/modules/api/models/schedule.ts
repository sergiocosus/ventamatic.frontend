import { User } from './user';
import { Branch } from '@app/api/models/branch';
import { Model } from '@app/api/models/model';

export class Schedule extends Model {
  public id: number;
  public user_id: number;
  public branch_id: number;
  public schedule_status_id: number;
  public initial_amount: number;
  public system_amount: number;
  public final_amount: number;
  public note: string;
  public created_at: Date;
  public updated_at: Date;
  public deleted_at: string;

  public user: User;
  public branch: Branch;
  public schedule_status: any;

  public static parseArray(objs: any) {
    return objs.map(obj => {
      return new Schedule().parse(obj);
    });
  }

  parse(obj): Schedule {
    super.parse(obj);

    this.user = new User().parse(this.user);
    this.branch = new Branch().parse(this.branch);

    this.parseDateTime('created_at');
    this.parseDateTime('updated_at');
    return this;
  }
}
