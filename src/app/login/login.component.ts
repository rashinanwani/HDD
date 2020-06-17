// import { Component, OnInit, Inject } from '@angular/core';
// import { Router } from '@angular/router';
// import { EventEmitter } from 'protractor';
// import { stringify } from 'querystring';
// import { LoginService} from '../services/login.service';
// import { MessageService } from '../services/message.service';
// import { Message } from '../Model/Message';
// import { User } from '../Model/User';
// //import { OktaAuthService } from '../app.service';
// import {OktaAuthService} from '@okta/okta-angular';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
//   // providers: []
// })
// export class LoginComponent implements OnInit {

  // public user: User = { Username: '', password: '', AssociateID: null };
  // public loading : boolean;

  // constructor(
  //   private _service: LoginService,
  //   private _route: Router,
  //   private _MessageService: MessageService,
  // ) {
  //   // this._service.removeUser();
  // }

  // ngOnInit() {
  // }

  // validate(): boolean {
  //   if (!this.user.AssociateID)
  //     this._MessageService.openSnackBar({ message: 'Please enter UserID', Action: 'Close', Class: "error" });
  //   else if (!this.user.password)
  //     this._MessageService.openSnackBar({ message: 'Please enter Password', Action: 'Close', Class: "error" });
  //   else
  //     return true;
  // }

  // login() {
  //   this.loading = true;
  //   this._service.loginAuth({ AssociateID: this.user.AssociateID, Username: "", password: btoa(this.user.password)})
  //     .then((loginResponse: Message) => {
  //       if (loginResponse.Success) {
  //         console.log(" LoginResponse = "+ stringify(loginResponse.UserDetails)); 
  //         // this.user = loginResponse.UserDetails;
  //         //this._service.user = loginResponse.UserDetails;
  //         // this._service.loadTempData();
  //         this._route.navigate(['Dashboard']);
  //       }
  //       else {
  //         this._MessageService.openSnackBar({ message: loginResponse.Error, Action: 'Close', Class: "error" });
  //       }
  //       this.loading = false;
  //     })
  //     .catch((errorResp)=> {
  //       console.error(errorResp);
  //       this._MessageService.openSnackBar({ message: errorResp.statusText , Action: 'Close', Class: "error" });
  //       this.loading = false;
  //     });
    
  // }

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationStart} from '@angular/router';

import { OktaAuthService } from '@okta/okta-angular';
import * as OktaSignIn from '@okta/okta-signin-widget';
import { GetDataServiceService } from '../services/get-data-service.service';

@Component({
  selector: 'app-login',
  template: `
    <!-- Container to inject the Sign-In Widget -->
    <br>
    <br>
    <br>
    <div id="okta-signin-container">
    </div>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Input() usrName:string;
  @Output() usr=new EventEmitter<any>();
  signIn;
  widget = new OktaSignIn({
    baseUrl: 'https://dev-656972.okta.com',
    authParams: {
      pkce: true
    }
  });
  http: any;

  constructor(oktaAuth: OktaAuthService, router: Router,private _service: GetDataServiceService) {
    this.signIn = oktaAuth;
    const accessToken =  this.signIn.getAccessToken();
    console.log(accessToken);
    // Show the widget when prompted, otherwise remove it from the DOM.
    router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        switch(event.url) {
          case '/login':
            break;
          case '/protected':
            break;
          default:
            this.widget.remove();
            break;
        }
      }
    });
  }

  ngOnInit() {
    const accessToken =  this.signIn.getAccessToken();
    console.log(accessToken);
    console.log(accessToken._zone_symbol_state); 
    this.widget.renderEl({
      el: '#okta-signin-container'},
      (res) => {
        console.log(res);
        if (res.status === 'SUCCESS') {
          console.log(res);
          this.usrName = res.user.profile.firstName;
          console.log(res.session.token);
          // this._service.subject.next(res.user.profile.firstName);
          this.signIn.loginRedirect('/', { sessionToken: res.session.token });
          this.usr.emit(this.usrName);
          // Hide the widget
          this.widget.hide();
        }
      },
      (err) => {
        throw err;
      }
    );
    this.http.get('http://localhost:4200/api/messages', {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      }
    }).subscribe((data: any) => {
      // Use the data returned by the API
      console.log(data);

    });
  }
  //  login() {
  //   //this.signIn.loginRedirect('/profile');
  //   //this._service.subject.next(this.usrName);
  //   const accessToken = await this.signIn.getAccessToken();
  //   console.log(accessToken);
  //   const headers = new Headers({
  //     Authorization: 'Bearer ' + accessToken
  //   });
  //   // Make request
  //   this.http.get(
  //     'http://localhost:{serverPort}/api/messages',
  //     new request({ headers: headers })
  //   )
  //   .map(res => res.json())
  //   .subscribe((messages: Array<Message>) => messages.forEach(message => this.messages.push(message)));
  // }
  // }

  // async logout() {
  //   // Terminates the session with Okta and removes current tokens.
  //   await this.signIn.logout();
  //  // this.router.navigateByUrl('/');
  // }
}
