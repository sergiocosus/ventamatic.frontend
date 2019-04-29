import { Component, OnInit } from '@angular/core';
import { User } from '@app/api/models/user';
import { SubscriptionManager } from '@app/shared/classes/subscription-manager';
import { AuthService } from '@app/auth/services/auth.service';
import { MatDialog } from '@angular/material';
import { PasswordDialogComponent } from '@app/user/components/password-dialog/password-dialog.component';
import { AutoUnsubscribe } from '@app/shared/decorators/auto-unsubscribe';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
@AutoUnsubscribe()
export class MyAccountComponent implements OnInit {
  public user: User;

  private sub = new SubscriptionManager();

  constructor(private authService: AuthService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.sub.add = this.authService.getLoggedUser().subscribe(
      user => this.user = user
    );
  }

  openPasswordDialog() {
    this.dialog.open(PasswordDialogComponent);
  }
}
