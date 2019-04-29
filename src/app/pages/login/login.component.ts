import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../modules/auth/services/auth.service';
import {NotifyService} from '../../shared/services/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private notify: NotifyService) {}

  ngOnInit() {
  }

  login(username: string , password: string) {
    this.authService.login(username, password)
      .subscribe(
        user  => {
          this.router.navigate(['/']);
          this.notify.info('Bienvenido', user.fullName);
        },
        error => {
          this.notify.error('Error', error);
        }
      );
  }

  onSubmit() {
    this.login(this.username, this.password);
  }

}
