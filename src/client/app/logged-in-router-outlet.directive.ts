import {Directive, Attribute, ElementRef, DynamicComponentLoader, ViewContainerRef} from 'angular2/core';
import {RouterOutlet, Router, ComponentInstruction} from "angular2/router";

@Directive({
  selector: 'router-outlet'
})
export class LoggedInRouterOutlet extends RouterOutlet{
  publicRoutes: any;
  private parentRouter: Router;

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

    if (!this.publicRoutes[url] && !localStorage.getItem('jwt')) {
      this.parentRouter.navigate(['LogIn']);
    }
    if ( url == 'LogIn' && localStorage.getItem('jwt') ){
      this.parentRouter.navigate(['HomePage']);
    }
    return super.activate(instruction);
  }

}
