import { Component, OnInit } from '@angular/core';
import {BranchService} from "../../+sucursales/shared/branch.service";
import {Branch} from "../../+sucursales/shared/branch";
import {ROUTER_DIRECTIVES} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'select-branch',
  templateUrl: 'select-branch.component.html',
  styleUrls: ['select-branch.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
  ],
  providers: [
    BranchService
  ]
})
export class SelectBranchComponent implements OnInit {
  branches:Branch[] = [];

  constructor(private branchService:BranchService) {}

  ngOnInit() {
    this.branchService.getAll().subscribe( branches => {
      this.branches = branches;
    })
  }

}
