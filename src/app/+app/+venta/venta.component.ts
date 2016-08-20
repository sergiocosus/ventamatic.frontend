import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from "@angular/router";

import {FloatingLabelComponent} from "../../components/floating-label";
import {MainContentComponent} from "../../shared/main-content";
import {SaleService} from "./shared/sale.service";

@Component({
  moduleId: module.id,
  selector: 'app-venta',
  templateUrl: 'venta.component.html',
  styleUrls: ['venta.component.css'],
  directives: [
    FloatingLabelComponent,
    MainContentComponent,
    ROUTER_DIRECTIVES
  ],
  providers: [SaleService]
})

export class VentaComponent implements OnInit {
  ngOnInit():any {
    return undefined;
  }

}
