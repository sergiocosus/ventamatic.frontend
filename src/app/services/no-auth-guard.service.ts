import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";

@Injectable()
export class NoAuthGuardService {
  constructor(private authService:AuthService,
              private router:Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean {
    if (this.authService.isTokenValid()) {
      this.router.navigateByUrl('/');
      return false;
    } else {
      return true;
    }
  }
}
