import {RouterModule, Routes} from '@angular/router';
import {NoAuthGuardService} from './auth/services/no-auth-guard.service';
import {AppComponent} from './app.component';
import {AuthGuardService} from './auth/services/auth-guard.service';

export const appRoutes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/core/login/login.module#LoginModule',
    canActivate : [NoAuthGuardService]
  },
  {
    path: '',
    component: AppComponent,
    canActivate : [AuthGuardService],
    loadChildren: 'app/core/core.module#CoreModule',
  },
  // { path: '**', component: PageNotFoundComponent },
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);
