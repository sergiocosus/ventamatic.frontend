import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { User } from '@app/api/models/user';
import { SubscriptionManager } from '@app/shared/classes/subscription-manager';
import { AutoUnsubscribe } from '@app/shared/decorators/auto-unsubscribe';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
@AutoUnsubscribe()
export class PagesComponent implements OnInit {
  public user: User;
  private sub = new SubscriptionManager();


  private _opened = true;

  toggleSidebar() {
    this._opened = !this._opened;
  }

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.sub.add = this.authService.getLoggedUser().subscribe(
      user => this.user = user
    );
  }

}
