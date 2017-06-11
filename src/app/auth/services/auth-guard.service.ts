import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class AuthGuardService {
  isLogged = false;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean {
    return this.authService.getLoggedUser().map(
      account => {
        if (account) {
          this.isLogged = true;
        } else {
          this.isLogged = false;
          this.router.navigate(['/login']);
        }

        return this.isLogged;
      }
    ).take(1);
  }
}
