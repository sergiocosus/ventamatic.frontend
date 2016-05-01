import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

@Component({
  moduleId: __moduleName,
  selector: 'home-page',
  templateUrl: 'home-page.component.html',
  styleUrls: ['home-page.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class HomePageComponent implements OnInit {

  constructor() {}
  
  ngOnInit() {
  }

}
