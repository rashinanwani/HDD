import { Injectable} from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../Model/User';
import { Message } from '../Model/Message';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private _user: User;

    //private LDAPAuthUrl: string = environment.LDAPAuthUrl;


    constructor(private _httpClient: HttpClient) {
    }
    isloggedin(): boolean {
        return this._user.AssociateID == null;
    }

    loginAuth(User: User) {
        let headers = new HttpHeaders();
        headers.append('NoAuth', 'true');
        // return this._httpClient.post<User>(this.LDAPAuthUrl + '/getdata/login', User, { headers: headers }).toPromise();
        let data = User
        return this._httpClient.post<Message>("http://localhost:3000/login", data, { headers: headers }).toPromise();
    }

    setUser(user: User): void {
        this._user.AssociateID = user.AssociateID;
        this._user.Username = user.Username;
    }

    getUserName(): string {
        console.log("User => " + this._user.Username);
        return this._user.Username;
    }

    getAssc_Id(): number {
        return this._user.AssociateID;
    }

    removeUser(): void {
        this._user.AssociateID = null;
        this._user.Username = null;
    }



}