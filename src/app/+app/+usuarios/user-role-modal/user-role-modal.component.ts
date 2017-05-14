import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../../user/user.service";
import {NotifyService} from "../../../services/notify.service";
import {RoleService} from "../../+roles/services/role.service";
import {Role} from "../../+roles/classes/role";
import {User} from "../../../user/user";
import {ModalComponent} from "ng2-bs3-modal/components/modal";
import {BranchRoleService} from "../../+roles/services/branch-role.service";
import {BranchRole} from "../../+roles/classes/branch-role";
import {Branch} from "../../+sucursales/shared/branch";
import {BranchService} from "../../+sucursales/shared/branch.service";

@Component({
  selector: 'app-user-role-modal',
  templateUrl: './user-role-modal.component.html',
  styleUrls: ['./user-role-modal.component.scss']
})
export class UserRoleModalComponent implements OnInit {
  @ViewChild(ModalComponent) protected modal:ModalComponent;

  user: User;
  branches:Branch[];

  roles:Role[] = [];
  roleItems:any[] = [];
  selectedRoleItems:any[] = [];

  branchRoleItems:any[] = [];
  selectedBranchRoleItems:any[][] = [];

  messages = {
    rolesSaved: 'Los roles han sido actualizados para el usuario'
  };

  branchRoles:BranchRole[];

  constructor(protected userService:UserService,
              protected notify:NotifyService,
              protected roleService:RoleService,
              protected branchRoleService:BranchRoleService,
              protected branchService:BranchService) { }

  ngOnInit() {
    this.roleService.getAll().subscribe(
      roles => {
        this.roles = roles;
        this.roleItems = this.roles.map(
          (role:Role) => ({text:role.display_name, id:role.id})
        )
      }
    );

    this.branchService.getAll().subscribe(
      branches => this.branches = branches
    );

    this.branchRoleService.getAll().subscribe(
      branchRoles => {
        this.branchRoles = branchRoles;
        this.branchRoleItems = this.branchRoles.map(
          (branchRole:BranchRole) => ({text:branchRole.display_name, id:branchRole.id})
        )
      }
    );


  }

  open(user_id:number){
    this.userService.get(user_id).subscribe(
      user => {
        this.user = user;
        console.log(user);

        this.selectedRoleItems = user.roles.map(
          (role:Role) => ({text:role.display_name, id:role.id})
        );

        this.branches.forEach(
          branch => {
            var filteredBranchRoles = this.user.branch_roles.filter(
              branchRole => branchRole.pivot.branch_id == branch.id
            );
            this.selectedBranchRoleItems.push(
              filteredBranchRoles.map(
                (branchRole: BranchRole) => ({text: branchRole.display_name, id: branchRole.id})
              )
            );
          }
        );

        this.modal.open();
      },
      error => this.notify.serviceError(error)
    );
  }

  updateSystemRoles(){
    var roles = this.selectedRoleItems.map(
      item => item.id
    );

    this.userService.putRoles(this.user, roles).subscribe(
      roles => {
        this.user.roles = roles;
        this.notify.success(this.messages.rolesSaved);
      },
      error => this.notify.serviceError(error)
    );
  }

  updateBranchRoles(){
    var branchRoles = [];
    for (var i=0; i<this.branches.length; i++) {
      var branches = {
        branch_id : this.branches[i].id,
        branch_roles:[]
      };
      branches.branch_roles = this.selectedBranchRoleItems[i].map(
        item => item.id
      );
      branchRoles.push(branches);
    }


    this.userService.putBranchRoles(this.user, branchRoles).subscribe(
      branchRoles => {
        this.user.branch_roles = branchRoles;
        this.notify.success(this.messages.rolesSaved);
      },
      error => this.notify.serviceError(error)
    );
  }

  clear(){
    this.user = null;
    this.selectedRoleItems = [];
    this.selectedBranchRoleItems = [];
  }
}
