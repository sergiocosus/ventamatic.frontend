import { Component, OnInit } from '@angular/core';
import {SearchBarComponent} from "../shared/search-bar/search-bar.component";

@Component({
  moduleId: module.id,
  selector: 'app-clientes',
  templateUrl: 'clientes.component.html',
  styleUrls: ['clientes.component.css'],
  directives: [SearchBarComponent]
})
export class ClientesComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
