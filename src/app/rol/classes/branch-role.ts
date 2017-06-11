import {Model} from '../../shared/classes/model';
import {BranchPermission} from '../../auth/classes/branch-permission';

export class BranchRole extends Model {
  id: number;
  name: string;
  display_name: string;
  description: string;
  created_at: string;
  updated_at: string;
  branch_permissions: (BranchPermission|any)[];

  pivot?: any;

  public static parseArray(objs: any) {
    return objs.map(obj => {return new BranchRole().parse(obj); });
  }

}
