import {Component, OnInit, OnDestroy} from '@angular/core';
import { Router} from '@angular/router';
import {AuthService} from '../auth/services/auth.service';
import {SubscriptionManager} from '../shared/classes/subscription-manager';
import {User} from '../user/classes/user';

@Component({
  selector: 'app-app',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
})

export class CoreComponent implements OnInit, OnDestroy {
  public user: User;
  private sub = new SubscriptionManager();


  private _opened = true;

  toggleSidebar() {
    this._opened = !this._opened;
  }

  constructor(private authService: AuthService,
              private router: Router) {}

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
