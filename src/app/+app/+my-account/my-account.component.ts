import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from "../../user/user";
import {SubscriptionManager} from '../../classes/subscription-manager';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit, OnDestroy {
  public user:User;

  private sub = new SubscriptionManager();

  constructor(private authService:AuthService) { }

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
