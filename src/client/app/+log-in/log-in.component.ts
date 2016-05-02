import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {RouteParams, Router} from 'angular2/router';
import {NgForm}    from 'angular2/common';
import {AuthService} from "../services/auth.service";

@Component({
  moduleId: __moduleName,
  selector: 'log-in',
  templateUrl: 'log-in.component.html',
  styleUrls: ['log-in.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [AuthService]
})
export class LogInComponent implements OnInit {

  username:string;
  password:string;
  token: string;
  errorMessage: string;
  constructor(
      private _router:Router,
      private _routeParams:RouteParams,
      private _auth:AuthService){}
  
  ngOnInit() {
  }

  login(username:string , password:string){
    this._auth.login(username, password)
      .subscribe(
        response  => {
          this.token = response.token;
          this._router.navigate(['HomePage'])
        },
        error =>  this.errorMessage = <any>error
      );
  }

  onSubmit() {
    this.login(this.username, this.password)

  }

}
