import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '@app/api/models/user';
import { SubscriptionManager } from '@app/shared/classes/subscription-manager';
import { AutoUnsubscribe } from '@app/shared/decorators/auto-unsubscribe';

@Directive({
  selector: '[appUserCan]'
})
@AutoUnsubscribe()
export class UserCanDirective implements OnInit {
  @Input() set appUserCan(permission) {
    this.permission = permission;
  };

  private permission: string;
  private user: User;
  private sub = new SubscriptionManager();

  constructor(private templateRef: TemplateRef<UserCanDirective>,
              private viewContainer: ViewContainerRef,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.sub.add = this.authService.getLoggedUser().subscribe(
      user => {
        this.user = user;
        this.checkPermission(this.permission);
      }
    );
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
