import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {AuthService} from './modules/auth/services/auth.service';
import {CacheManagerService} from './modules/api/services/cache-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class AppComponent implements OnInit {
  public options = {
    timeOut: 5000,
    lastOnBottom: true
  };

  constructor(private router: Router,
              private authService: AuthService,
              private cacheManager: CacheManagerService) {

  }

  ngOnInit(): any {
    this.authService.updateLoggedUserObservable().subscribe();
  }
}
