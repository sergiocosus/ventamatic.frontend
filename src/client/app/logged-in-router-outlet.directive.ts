import {Directive, Attribute, DynamicComponentLoader, ViewContainerRef} from 'angular2/core';
import {RouterOutlet, Router, ComponentInstruction} from "angular2/router";
import {JwtHelper} from "angular2-jwt/angular2-jwt";

@Directive({
  selector: 'router-outlet'
})
export class LoggedInRouterOutlet extends RouterOutlet{
  publicRoutes: any;
  private parentRouter: Router;

  private jwtHelper: JwtHelper = new JwtHelper();

  constructor(_elementRef: ViewContainerRef, _loader: DynamicComponentLoader,
              _parentRouter: Router, @Attribute('name') nameAttr: string) {
    super(_elementRef, _loader, _parentRouter, nameAttr);

    this.parentRouter = _parentRouter;
    // The Boolean following each route below denotes whether the route requires authentication to view
    this.publicRoutes = {
      'LogIn': true,
    };
  }

  activate(instruction: ComponentInstruction) {
    let url = instruction.routeName;

    if (!this.publicRoutes[url] && !this.isTokenValid()) {
      this.parentRouter.navigate(['LogIn']);
    }
    if ( url == 'LogIn' && this.isTokenValid()){
      this.parentRouter.navigate(['HomePage']);
    }
    return super.activate(instruction);
  }

  private isTokenValid() {
    let token = localStorage.getItem('id_token');
    if(token){
      console.log(this.jwtHelper.getTokenExpirationDate(token));

      return !this.jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }
  }

}
