import { Component } from '@angular/core';
import { FacebookService, InitParams, LoginResponse, LoginStatus } from 'ngx-facebook';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  currentState: string;
  user: any;
  userFields: string[];

  constructor(
    private fb: FacebookService,
    private http: HttpClient
  ) {
    const initParams: InitParams = {
      appId: '444963099307703',
      xfbml: true,
      version: 'v2.11'
    };
    console.log(this.http);

    fb.init(initParams);
    console.log(this.fb);


  }

  fbLogin(): LoginStatus|any|void {
    this.fb.getLoginStatus()
    .then((status: LoginStatus) => {
      if (status.status !== 'connected') {
        this.fb.login({
            scope: 'public_profile,email',
            return_scopes: true
          })
          .then(loginResponse => {
            if (loginResponse.status === 'connected') {
              // ora ho l'accessToken, posso recuperare info
              this.fb.api('/me', 'get', {
                fields: [
                  'first_name', 'last_name', 'email', 'gender', 'picture'
                ]
              }).then(obj => console.log(obj));
            }
          });
      } else {
        console.log('authToken should be here', status);
      }

    }, err => {
      console.log('error', err);
    });
  }

}
