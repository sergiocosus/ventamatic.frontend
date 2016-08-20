import {Component, OnInit, ViewChild} from "@angular/core";

import { ROUTER_DIRECTIVES} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'app-inventario',
  templateUrl: 'inventario.component.html',
  styleUrls: ['inventario.component.css'],
  directives: [
    ROUTER_DIRECTIVES
  ]
})

export class InventarioComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }
}
