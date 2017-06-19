import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../user/classes/user';
import {SubscriptionManager} from '../../shared/classes/subscription-manager';
import {AuthService} from '../../auth/services/auth.service';
import {MdDialog} from '@angular/material';
import {PasswordDialogComponent} from '../../user/components/password-dialog/password-dialog.component';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit, OnDestroy {
  public user: User;

  private sub = new SubscriptionManager();

  constructor(private authService: AuthService,
              private dialog: MdDialog) { }

  ngOnInit() {
    const subUser = this.authService.getLoggedUser().subscribe(
      user => this.user = user
    );

    this.sub.push(subUser);
  }

  openPasswordDialog() {
    this.dialog.open(PasswordDialogComponent);
  }

  ngOnDestroy() {
    this.sub.clear();
  }
}
