import { Component, OnInit } from '@angular/core';
import {MainContentComponent} from "../../shared/main-content/main-content.component";
import {SearchBarComponent} from "../shared/search-bar/search-bar.component";
import {ModalInventarioComponent} from "./modal-inventario/modal-inventario.component";

@Component({
  moduleId: module.id,
  selector: 'app-inventario',
  templateUrl: 'inventario.component.html',
  styleUrls: ['inventario.component.css'],
  directives: [SearchBarComponent,MainContentComponent,ModalInventarioComponent]
})
export class InventarioComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
