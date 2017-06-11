import {Model} from '../../shared/classes/model';
import {Role} from '../../rol/classes/role';
import {BranchRole} from '../../rol/classes/branch-role';
import {Branch} from '../../branch/models/branch';
import {Permission} from '../../auth/classes/permission';

export class User extends Model {
  public id: number;
  public name: string;
  public email: string;
  public created_at: string;
  public updated_at: string;
  public username: string;
  public last_name: string;
  public last_name_2: string;
  public phone: string;
  public cellphone: string;
  public address: string;
  public rfc: string;
  public deleted_at: string;
  public protected: boolean;
  public password;

  roles: Role[];
  branch_roles: BranchRole[];
  branches: Branch[];
  permissions: Permission[];

  public static parseArray(objs: any) {
    return objs.map(obj => {return new User().parse(obj); });
  }

  get fullName(){
    return `${this.name} ${this.last_name} ${this.last_name_2}`;
  }

  can(permission_name) {
    let foundPermission;
    this.permissions.forEach(
      permission => {
        if (permission.name === permission_name) {
          foundPermission = permission;
        }
      }
    );

    return foundPermission;
  }

  getBranchesWithPermission(branch_permission_name) {
    return this.branches.filter(
      branch => {
        let found: any = false;
        branch.branch_roles.forEach(
          branchRole => {
            found = branchRole.branch_permissions.filter(
              branchPermission => {
                if (branchPermission.name === branch_permission_name) {
                  return true;
                }
              }
            ).length;
          }
        );
        return found;
      }
    );
  }

  canInAnyBranch(branch_permission_name) {
    if (this.getBranchesWithPermission(branch_permission_name).length) {
      return true;
    } else {
      return false;
    }
  }

  parse(obj): any {
    super.parse(obj);

    if (this.roles) {
      this.roles = Role.parseArray(this.roles);
    }

    if (this.permissions) {
      this.permissions = Permission.parseArray(this.permissions);
    }

    if (this.branches) {
      this.branches = Branch.parseArray(this.branches);
    }

    return this;
  }
}
