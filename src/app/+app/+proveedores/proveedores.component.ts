import { Component, OnInit } from '@angular/core';
import {SearchBarComponent} from "../shared/search-bar/search-bar.component";

@Component({
  moduleId: module.id,
  selector: 'app-proveedores',
  templateUrl: 'proveedores.component.html',
  styleUrls: ['proveedores.component.css'],
  directives: [SearchBarComponent]
})
export class ProveedoresComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
