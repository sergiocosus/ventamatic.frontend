import {Directive, OnInit, OnDestroy, TemplateRef, ViewContainerRef, Input} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {User} from '../../user/classes/user';
import {SubscriptionManager} from '../../shared/classes/subscription-manager';

@Directive({
  selector: '[appUserCan]'
})
export class UserCanDirective implements OnInit, OnDestroy {
  @Input() set appUserCan(permission){
    this.permission = permission;
  };
  private permission: string;
  private user: User;
  private sub = new SubscriptionManager();

  constructor(private templateRef: TemplateRef<UserCanDirective>,
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
    if (!permission || this.user.can(permission)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

}
