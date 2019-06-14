import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {AuthService} from './modules/auth/services/auth.service';
import {CacheManagerService} from './modules/api/services/cache-manager.service';
import { I18nService } from '@app/shared/services/i18n.service';
import { environment } from '../environments/environment';

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
              private i18nService: I18nService,
              private cacheManager: CacheManagerService) {
    this.i18nService.init(environment.defaultLanguage, [
      'es-MX'
    ]);
  }

  ngOnInit(): any {
    this.authService.updateLoggedUserObservable().subscribe();
  }
}
