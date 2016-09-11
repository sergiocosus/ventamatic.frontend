import { Component, ViewChild, Output } from '@angular/core';
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {BranchService} from "../shared/branch.service";
import {Branch} from "../shared/branch";
import {CrudModalComponent} from "../../../components/crud-modal/crud-modal.component";
import {NotifyService} from "../../../services/notify.service";

@Component({
  selector: 'branch-modal',
  templateUrl: 'branch-modal.component.html',
  styleUrls: ['branch-modal.component.scss'],
})
export class BranchModalComponent extends CrudModalComponent {
  @ViewChild(ModalComponent) protected modal:ModalComponent;

  @Output() updated;

  branch: Branch;

  name = 'Sucursal';

  constructor(protected notify:NotifyService,
              protected branchService:BranchService) {
    super(notify);
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
