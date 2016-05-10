import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router'
import { AuthService } from "../services/auth.service";
@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  username:string;
  password:string;

  errorMessage: string;
  constructor(
    private _router:Router,
    private _auth:AuthService){}

  ngOnInit() {
  }

  login(username:string , password:string){
    this._auth.login(username, password)
      .subscribe(
        response  => {
          this._router.navigate(['/app'])
        },
        error =>  this.errorMessage = <any>error
      );
  }

  onSubmit() {
    this.login(this.username, this.password)
  }

}
