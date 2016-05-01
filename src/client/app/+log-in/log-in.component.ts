import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {RouteParams, Router} from 'angular2/router';
import {NgForm}    from 'angular2/common';

@Component({
  moduleId: __moduleName,
  selector: 'log-in',
  templateUrl: 'log-in.component.html',
  styleUrls: ['log-in.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class LogInComponent implements OnInit {

  username:string;
  password:string;

  constructor(
      private _router:Router,
      private _routeParams:RouteParams){}
  
  ngOnInit() {
    console.log("hola");
  }

  login(username:string , password:string){
    console.log(username, password);
    this._router.navigate(['HomePage']);
  }

  onSubmit() {
    this.login(this.username, this.password)

  }

}
