import {Component, OnInit, OnDestroy} from '@angular/core';
import { User } from "../user/user";
import { AuthService } from "../services/auth.service";
import { Router} from '@angular/router';
import {SubscriptionManager} from "../classes/subscription-manager";

@Component({
  selector: 'app-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit, OnDestroy {
  public user:User;
  private sub = new SubscriptionManager();

  constructor(private authService:AuthService,
              private router:Router) {}

  ngOnInit() {
    var subUser = this.authService.getLoggedUser().subscribe(
      user => this.user = user
    );

    this.sub.push(subUser);
  }

  ngOnDestroy(){
    this.sub.clear();
  }

}
