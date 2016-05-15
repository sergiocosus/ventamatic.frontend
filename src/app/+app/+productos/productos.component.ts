import { Component, OnInit } from '@angular/core';
import {SearchBarComponent} from "../shared/search-bar/search-bar.component";

@Component({
  moduleId: module.id,
  selector: 'app-productos',
  templateUrl: 'productos.component.html',
  styleUrls: ['productos.component.css'],
  directives: [SearchBarComponent]
})
export class ProductosComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
