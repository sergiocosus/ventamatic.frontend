import {Directive, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {User} from "../user/user";
import {SubscriptionManager} from "../classes/subscription-manager";
import {Input} from "@angular/core/src/metadata/directives";

@Directive({
  selector: '[appUserCanInBranch]'
})
export class UserCanInBranchDirective {
  @Input() set appUserCanInBranch(permission){
    this.permission = permission;
  };
  private permission:string;
  private user:User;
  private sub = new SubscriptionManager();

  constructor(private templateRef:TemplateRef<UserCanInBranchDirective>,
              private viewContainer:ViewContainerRef,
              private authService:AuthService) {}

  ngOnInit(): void {
    var sub = this.authService.getLoggedUser().subscribe(
      user => {
        this.user = user;
        this.checkPermission(this.permission);
      }
    );

    this.sub.push(sub);
  }

  ngOnDestroy(){
    this.sub.clear();
  }

  checkPermission(permission){
    this.viewContainer.clear();
    if(!permission || this.user.canInAnyBranch(permission)){
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
