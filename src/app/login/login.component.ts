import { Component } from '@angular/core';

import { OktaAuthService } from '@okta/okta-angular';
import * as OktaSignIn from '@okta/okta-signin-widget';

@Component({
  selector: 'app-login',
  template: `
    <!-- Container to inject the Sign-In Widget -->
    <br>
    <div id="okta-signin-container">
    </div>
  `,
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  signIn = new OktaSignIn({
    baseUrl: 'https://dev-656972.okta.com',
    logo: '/assets/img/jdlogo.png',
    authParams: {
      pkce: true
    }
  });

  constructor( private oktaAuth: OktaAuthService) {
  }

  ngOnInit() {
    this.signIn.renderEl({
      el: '#okta-signin-container'
    },
      (res) => {
        console.log(res);
        if (res.status === 'SUCCESS') {
          console.log('Success');
          this.oktaAuth.loginRedirect('/', { sessionToken: res.session.token });
        }
        else
          console.log('Authentication Failed');
      },
      (err) => {
        throw err;
      }
    );
  }
}
