import {RouterModule, Routes} from '@angular/router';
import {NoAuthGuardService} from '@app/api/services/no-auth-guard.service';
import {AppComponent} from './app.component';
import {AuthGuardService} from '@app/api/services/auth-guard.service';

export const appRoutes: Routes = [
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginModule',
    canActivate : [NoAuthGuardService]
  },
  {
    path: '',
    component: AppComponent,
    canActivate : [AuthGuardService],
    loadChildren: './pages/pages.module#PagesModule',
  },
  // { path: '**', component: PageNotFoundComponent },
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);
