import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

@Component({
  moduleId: __moduleName,
  selector: 'log-in',
  templateUrl: 'log-in.component.html',
  styleUrls: ['log-in.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class LogInComponent implements OnInit {

  constructor() {}
  
  ngOnInit() {
  }

}
