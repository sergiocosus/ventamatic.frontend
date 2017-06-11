import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {User} from '../../user/classes/user';
import {SubscriptionManager} from '../../shared/classes/subscription-manager';


@Directive({
  selector: '[appUserCanInBranch]'
})
export class UserCanInBranchDirective implements OnDestroy, OnInit {
  @Input() set appUserCanInBranch(permission){
    this.permission = permission;
  };
  private permission: string;
  private user: User;
  private sub = new SubscriptionManager();

  constructor(private templateRef: TemplateRef<UserCanInBranchDirective>,
              private viewContainer: ViewContainerRef,
              private authService: AuthService) {}

  ngOnInit(): void {
    const sub = this.authService.getLoggedUser().subscribe(
      user => {
        this.user = user;
        this.checkPermission(this.permission);
      }
    );

    this.sub.push(sub);
  }

  ngOnDestroy() {
    this.sub.clear();
  }

  checkPermission(permission) {
    this.viewContainer.clear();

    if (!this.user) {
      return;
    }

    if (!permission || this.user.canInAnyBranch(permission)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
