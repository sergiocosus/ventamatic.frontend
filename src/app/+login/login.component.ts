import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router'
import { NotificationsService } from 'angular2-notifications/components'

import { AuthService } from "../services/auth.service";
@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: []
})
export class LoginComponent implements OnInit {

  username:string;
  password:string;



  constructor(
    private router:Router,
    private authService:AuthService,
    private notification:NotificationsService ){}

  ngOnInit() {
  }

  login(username:string , password:string){
    this.authService.login(username, password)
      .subscribe(
        response  => {
          this.router.navigate(['/app']);
          this.notification.info('Bienvendido',response.user.fullName);
        }
      );
  }

  onSubmit() {
    this.login(this.username, this.password)
  }

}
