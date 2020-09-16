import { NgModule } from '@angular/core';
import {Router,RouterModule, PreloadAllModules } from '@angular/router';
import { AppComponent } from './app.component';
import { GetDataServiceService } from './services/get-data-service.service';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from './SharedModule/shared.module';
import { OKTA_CONFIG, OktaAuthService } from '@okta/okta-angular';
import { LDAPLoginComponent } from './ldaplogin/ldaplogin.component';

const oktaConfig = {
  issuer: 'https://dev-656972.okta.com/oauth2/ausfljdssZHbEjn8H4x6',
  clientId: '0oafby98ayEhLk6284x6',
  redirectUri: 'http://localhost:4200/implicit/callback',
  pkce: true
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LDAPLoginComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'Login', pathMatch: 'full' },
      { path: 'Login', component: LoginComponent },
      { path: 'Dashboard', component: DashboardComponent },
      { path: 'LDAPLogin', component: LDAPLoginComponent },
      {
        path: 'implicit/callback',
        component: DashboardComponent
      },
  ]),
    // { preloadingStrategy: PreloadAllModules }),
  ],
  providers: [GetDataServiceService,OktaAuthService,
    { provide: OKTA_CONFIG, useValue: oktaConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
