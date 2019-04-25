import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  isLogged = false;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.authService.getLoggedUser().pipe(map(
      account => {
        if (account) {
          this.isLogged = true;
        } else {
          this.isLogged = false;
          this.router.navigate(['/login']);
        }

        return this.isLogged;
      }
    ), take(1),);
  }
}
