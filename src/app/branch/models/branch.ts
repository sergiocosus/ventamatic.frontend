import {BranchRole} from '../../rol/classes/branch-role';
import {Model} from '../../shared/classes/model';

export class Branch extends Model {
  id: number;
  name: string;
  description: string;
  address: string;
  title_ticket: string;
  header_ticket: string;
  footer_ticket: string;
  image_hash: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;

  branch_roles: BranchRole[];
  /**
   * Temporal
   */
  image_base64: string;


  parse(obj): any {
    super.parse(obj);

    if (this.branch_roles) {
      this.branch_roles = BranchRole.parseArray(this.branch_roles);
    }

    return this;
  }

  public static parseArray(objs: any) {
    return objs.map(obj => {return new Branch().parse(obj); });
  }
}
