import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from 'protractor';
import { stringify } from 'querystring';
import { LoginService} from '../services/login.service';
import { MessageService } from '../services/message.service';
import { Message } from '../Model/Message';
import { User } from '../Model/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // providers: []
})
export class LoginComponent implements OnInit {

  public user: User = { Username: '', password: '', AssociateID: null };
  public loading : boolean;

  constructor(
    private _service: LoginService,
    private _route: Router,
    private _MessageService: MessageService,
  ) {
    // this._service.removeUser();
  }

  ngOnInit() {
  }

  validate(): boolean {
    if (!this.user.AssociateID)
      this._MessageService.openSnackBar({ message: 'Please enter UserID', Action: 'Close', Class: "error" });
    else if (!this.user.password)
      this._MessageService.openSnackBar({ message: 'Please enter Password', Action: 'Close', Class: "error" });
    else
      return true;
  }

  login() {
    this.loading = true;
    this._service.loginAuth({ AssociateID: this.user.AssociateID, Username: "", password: btoa(this.user.password)})
      .then((loginResponse: Message) => {
        if (loginResponse.Success) {
          console.log(" LoginResponse = "+ stringify(loginResponse.UserDetails)); 
          // this.user = loginResponse.UserDetails;
          //this._service.user = loginResponse.UserDetails;
          // this._service.loadTempData();
          this._route.navigate(['Dashboard']);
        }
        else {
          this._MessageService.openSnackBar({ message: loginResponse.Error, Action: 'Close', Class: "error" });
        }
        this.loading = false;
      })
      .catch((errorResp)=> {
        console.error(errorResp);
        this._MessageService.openSnackBar({ message: errorResp.statusText , Action: 'Close', Class: "error" });
        this.loading = false;
      });
    
  }
}

