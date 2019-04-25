import { Role } from '@app/api/models/role';
import { BranchRole } from '@app/api/models/branch-role';
import { Branch } from '@app/api/models/branch';
import { Permission } from '@app/api/models/permission';
import { Model } from '@app/api/models/model';

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
    return objs.map(obj => {
      return new User().parse(obj);
    });
  }

  get fullName() {
    return `${this.name} ${this.last_name} ${this.last_name_2}`;
  }

  can(permission_name) {
    return this.permissions.find(
      permission => permission.name === permission_name
    );
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

  canInBranch(branch_permission_name, branch_id?: number) {
    const branches = this.getBranchesWithPermission(branch_permission_name);

    if (branch_id) {
      return !!branches.find(
        branch => branch.id === branch_id
      );
    } else {
      return !!branches.length;
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
