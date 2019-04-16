
import {take, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable()
export class NoAuthGuardService {
  isLogged = false;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean {
    return this.authService.getLoggedUser().pipe(map(
      account => {
        console.log(account);
        if (account) {
          this.router.navigate(['/']);
          this.isLogged = true;
        } else {
          this.isLogged = false;
        }

        return !this.isLogged;
      }
    ),take(1),);
  }
}
