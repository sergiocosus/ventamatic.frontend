import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../user/classes/user';
import {SubscriptionManager} from '../../shared/classes/subscription-manager';
import {AuthService} from '../../auth/services/auth.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit, OnDestroy {
  public user: User;

  private sub = new SubscriptionManager();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    const subUser = this.authService.getLoggedUser().subscribe(
      user => this.user = user
    );

    this.sub.push(subUser);
  }

  ngOnDestroy() {
    this.sub.clear();
  }
}
