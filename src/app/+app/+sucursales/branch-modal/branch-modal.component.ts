import { Component, ViewChild, Output } from '@angular/core';
import {ModalComponent, MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";
import {BranchService} from "../shared/branch.service";
import {NotificationsService} from "angular2-notifications/components";
import {Branch} from "../shared/branch";
import {CrudModalComponent} from "../../../components/crud-modal/crud-modal.component";
import {FloatingLabelComponent} from "../../../components/floating-label/floating-label.component";

@Component({
  moduleId: module.id,
  selector: 'branch-modal',
  templateUrl: 'branch-modal.component.html',
  styleUrls: ['branch-modal.component.css'],
  directives: [MODAL_DIRECTIVES, FloatingLabelComponent]

})
export class BranchModalComponent extends CrudModalComponent {
  @ViewChild(ModalComponent) protected modal:ModalComponent;

  @Output() updated;

  branch: Branch;

  name = 'Sucursal';

  constructor(protected notificationService:NotificationsService,
              protected branchService:BranchService) {
    super(notificationService);
  }

  openUpdate(branch:Branch){
    this.branch = branch;
    super.openUpdate(branch);
  }

  update(){
    this.branchService.put(this.branch).subscribe( user=> {
      this.updatedSuccess(user);
    });
  }

  create() {
  }

  delete() {
  }
}
