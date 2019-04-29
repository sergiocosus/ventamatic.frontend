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
  selector: '[appUserCanInBranch]'
})
@AutoUnsubscribe()
export class UserCanInBranchDirective implements OnInit {
  private branch_id: any;

  @Input() set appUserCanInBranch(permission) {
    this.permission = permission;
  }

  @Input() set appUserCanInBranchBranchId(branch_id) {
    this.branch_id = branch_id;
  }

  private permission: string;
  private user: User;
  private sub = new SubscriptionManager();

  constructor(private templateRef: TemplateRef<UserCanInBranchDirective>,
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

    if (!permission || this.user.canInBranch(permission, this.branch_id)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
