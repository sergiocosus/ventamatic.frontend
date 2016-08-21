import { Component, OnInit } from '@angular/core';
import {BranchService} from "../../+sucursales/shared/branch.service";
import {Branch} from "../../+sucursales/shared/branch";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {ModalInventarioComponent} from "../modal-inventario/modal-inventario.component";
import {MainContentComponent} from "../../../shared/main-content/main-content.component";

@Component({
  selector: 'select-branch',
  templateUrl: 'select-branch.component.html',
  styleUrls: ['select-branch.component.scss'],
  directives: [
    ROUTER_DIRECTIVES,
    MainContentComponent
  ],
  providers: [
    BranchService
  ]
})
export class InventorySelectBranch implements OnInit {
  branches:Branch[] = [];

  constructor(private branchService:BranchService) {}

  ngOnInit() {
    this.branchService.getAll().subscribe( branches => {
      this.branches = branches;
    })
  }

}
