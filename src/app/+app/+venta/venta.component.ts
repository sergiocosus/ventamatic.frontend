import { Component, OnInit } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from "@angular/router";

import {ProductService} from "../../shared/product/product.service";
import {FloatingLabelComponent} from "../../components/floating-label";
import {Product} from "../../shared/product/product";
import {MainContentComponent} from "../../shared/main-content";
import {NotificationsService} from "angular2-notifications/lib/notifications.service";
import {ClientService} from "../+clientes/shared/client.service";
import {Client} from "../+clientes/shared/client";
import {SaleService} from "./shared/sale.service";
import {SelectBranchComponent} from "./select-branch";
import {SaleComponent} from "./sale/sale.component";

@Component({
  moduleId: module.id,
  selector: 'app-venta',
  templateUrl: 'venta.component.html',
  styleUrls: ['venta.component.css'],
  directives: [FloatingLabelComponent,
    MainContentComponent,
    ROUTER_DIRECTIVES
  ],
  providers: [SaleService]
})
@Routes([
  {path: '', component: SelectBranchComponent},
  {path: '/:branch_id', component: SaleComponent}
])
export class VentaComponent implements OnInit {
  ngOnInit():any {
    return undefined;
  }

}
