import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuardService {
  constructor(private authService:AuthService,
              private router:Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean {
    if (this.authService.isTokenValid()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
